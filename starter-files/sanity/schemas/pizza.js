import { IoMdPizza as icon } from 'react-icons/io';
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      price: 'price',
      media: 'image',
      topping0name: 'toppings.0.name',
      topping1name: 'toppings.1.name',
      topping2name: 'toppings.2.name',
      topping3name: 'toppings.3.name',
    },
    prepare: ({ name, price, media, ...toppings }) => {
      const toppingsArr = Object.values(toppings).filter(Boolean);
      if (toppingsArr.length >= 4) {
        toppingsArr[toppingsArr.length - 1] = `${
          toppingsArr[toppingsArr.length - 1]
        }...`;
      }
      const formatMoney = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format;
      const toppingsStr = toppingsArr.join(', ');
      return {
        media,
        title: `${name} | ${price && formatMoney(price / 100)}`,
        subtitle: toppingsStr,
      };
    },
  },
};
