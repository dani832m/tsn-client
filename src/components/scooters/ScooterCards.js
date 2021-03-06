import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import GetCategoryById from '../categories/GetCategoryById';

// Importér Reactstrap komponenter
import {
  Col,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button
} from 'reactstrap';

// Komponent der renderer alle elscooterkortene (hvert item)
function ScooterCards() {
  // Definér først query til at hente array med alle elscootere
  const GET_SCOOTERS = gql`
    {
      getScooters {
        _id
        itemNo
        name
        description
        price
        priceVAT
        categoryId
        imagePath
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SCOOTERS);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Returnér nu alle props for hvert enkel scooter i et card
  return data.getScooters.map((scooter, index) => {
    const {
      _id,
      itemNo,
      name,
      price,
      priceVAT,
      description,
      categoryId,
      imagePath
    } = scooter; // Destructuring
    return (
      <Col
        key={_id}
        className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch"
      >
        <Card className="mb-4 cardHover">
          <CardHeader className="veryLightGreenBg">{name}</CardHeader>
          <Link to={`/showScooter/${_id}`}>
            <CardImg
              width="100%"
              className="p-2"
              src={imagePath}
              alt={description}
            />
          </Link>
          <CardBody>
            <CardTitle>
              <small className="text-muted">{itemNo}</small>
            </CardTitle>
            <CardSubtitle>
              <span className="priceGlow">{price} DKK</span>
            </CardSubtitle>
            <CardSubtitle className="priceVAT mb-4">
              {priceVAT} DKK inkl. moms
            </CardSubtitle>
            <Link to={`/showScooter/${_id}`}>
              <Button className="btnStyles">Læs mere</Button>
            </Link>
          </CardBody>
          <CardFooter className="veryLightGreenBg">
            Kategori:{' '}
            <Link to="#" className="linkStyles">
              <GetCategoryById categoryId={categoryId} />
            </Link>
          </CardFooter>
        </Card>
      </Col>
    );
  });
}

export default ScooterCards;
