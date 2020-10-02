import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
      There are {pizzas.length} Pizzas!!
    </>
  );
}

export const query = graphql`
  query PizzaQuery($topping: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $topping } } } }
    ) {
      nodes {
        name
        price
        id
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        toppings {
          vegetarian
          name
        }
        slug {
          current
        }
      }
    }
  }
`;
