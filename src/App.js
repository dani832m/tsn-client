import React from 'react';
import './App.css';

// Importér komponenter til routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importér Apollo Client og Apollo Provider
import client from './config/apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

// Importér egne komponenter uden auth-beskyttelse
import Header from './components/header/Header';
import Textarea from './components/textarea/Textarea';
import LoginForm from './components/loginForm/LoginForm';
import NotFound from './components/notFound/NotFound';

// Importér egne komponenter med auth-beskyttelse
import AdminNav from './components/adminNav/AdminNav';
import Welcome from './components/welcome/Welcome';
import EditTextarea from './components/editTextarea/EditTextarea';

// App komponentet indeholder den samlede app, der renderes i index.js
function App() {
  // Definér angivelsen af Auth route
  const Auth = ({ render: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          window.location.replace('/login')
        )
      }
    />
  );

  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <Switch>
          {/* Routes til offentligt tilgængeligt indhold */}
          <Route path="/" exact component={Textarea} />
          <Route path="/login" exact component={LoginForm} />
          {/* Routes til adgangsbeskyttet indhold */}
          <Auth
            path="/welcome"
            render={() => (
              <React.Fragment>
                <AdminNav />
                <Container className="contentWrapper">
                  <Welcome />
                </Container>
              </React.Fragment>
            )}
          />
          <Auth
            path="/editTextarea"
            render={() => (
              <React.Fragment>
                <AdminNav />
                <Container className="contentWrapper">
                  <EditTextarea />
                </Container>
              </React.Fragment>
            )}
          />
          {/* Route til alle ugyldige stier */}
          <Route exact component={NotFound} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
