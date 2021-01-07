import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active {
      background: var(--yellow);
    }
  }
`;

function pizzasByToppingCount(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, { id, name }) => {
      const existingTopping = acc[id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[id] = {
          count: 1,
          id,
          name,
        };
      }
      return acc;
    }, {});

  // sort based on counts
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

export default function ToppingsFilter({ activeTopping }) {
  const { pizzas } = useStaticQuery(graphql`
    query ToppingsQuery {
      pizzas: allSanityPizza {
        nodes {
          price
          name
          id
          toppings {
            name
            vegetarian
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = pizzasByToppingCount(pizzas.nodes);
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/topping/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
