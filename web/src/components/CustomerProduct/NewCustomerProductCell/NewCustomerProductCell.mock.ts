import { ProductsQuery } from 'types/graphql';

import { CellSuccessProps } from '@redwoodjs/web';

// Define your own mock data here:
export const standard =
  (/* vars, { ctx, req } */): CellSuccessProps<ProductsQuery> => ({
    products: [
      {
        id: 1,
        title: 'Test Product',
        config: 123,
      },
    ],
  });
