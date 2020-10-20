import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: var(--black);
  }
`;

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <h2>We have ${beers.nodes.length} Beers Available. Dine in Only</h2>
      <BeerGridStyles>
        {beers.nodes.map(({ id, name, price, image, rating }) => {
          const ratings = Math.round(rating.average);
          return (
            <SingleBeerStyles key={id}>
              {image && <img src={image} alt={name} />}
              <h3>{name}</h3>
              {price}
              <p title={`${ratings} out of 5 starts`}>
                {`⭐️`.repeat(ratings)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐️`.repeat(5 - ratings)}
                </span>
                <span>({rating.reviews}) Reviews</span>
              </p>
            </SingleBeerStyles>
          );
        })}
        <p>Beers page</p>
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query getAllBeers {
    beers: allBeer {
      nodes {
        id
        name
        image
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
