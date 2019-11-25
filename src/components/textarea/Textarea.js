import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Textarea.css';

// Importér Reactstrap komponenter
import { Container, Row, Col } from 'reactstrap';

// Textarea komponent
function Textarea() {
  // Definér mutation til at hente textarea
  const GET_TEXTAREA_BY_ID = gql`
    {
      getTextareaById(_id: "5dcbd28e8d50cf53c4f97a58") {
        _id
        text
      }
    }
  `;

  // Anvend mutation
  const { loading, error, data } = useQuery(GET_TEXTAREA_BY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  return (
    <Container className="contentWrapper">
      <Row>
        <Col>
          <h3 className="mb-2">Top Scooter Nordic</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <pre className="frontpageText">
            {data.getTextareaById.text.replace(/<br\s*\/?>/gi, '\r\n')}
          </pre>
        </Col>
      </Row>
    </Container>
  );
}

export default Textarea;
