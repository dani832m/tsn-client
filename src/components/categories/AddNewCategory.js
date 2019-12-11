import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';

// Importér Reactstrap komponenter
import { Form, InputGroup, FormGroup, Input, Button, Alert } from 'reactstrap';

function AddNewCategory() {
  client.cache.reset();

  const [name, setName] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  const ADD_CATEGORY = gql`
    mutation addCategory($name: String!) {
      addCategory(name: $name) {
        name
      }
    }
  `;

  // Anvend mutation
  const [addCategory] = useMutation(ADD_CATEGORY);

  // Håndtér indsendelse af kategoriens oplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et navn på kategorien!');
    } else {
      addCategory({
        variables: {
          name: name
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
      // Clear feltet, så der kan indtastes nye oplysninger
      setName('');
    }
  };

  return (
    <React.Fragment>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="name"
              id="categoryName"
              minLength="1"
              maxLength="50"
              value={name}
              placeholder="Navn..."
              onChange={event => setName(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis kategorien oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Kategorien blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles">
          Tilføj kategori
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default AddNewCategory;
