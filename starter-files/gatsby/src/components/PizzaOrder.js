import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemsStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import { formatMoney } from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, i) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${i}-${singleOrder.id}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                className="remove"
                type="button"
                title={`Remove ${singleOrder.size} ${singleOrder.name} from Order`}
                onClick={() => removeFromOrder(i)}
              >
                X
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
