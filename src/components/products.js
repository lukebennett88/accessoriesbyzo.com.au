import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import Product from './product';

const Products = () => {
  const data = useStaticQuery(graphql`
    {
      allStripeSku(
        filter: { active: { eq: true } }
        sort: { order: ASC, fields: price }
      ) {
        edges {
          node {
            active
            attributes {
              name
            }
            currency
            id
            localFiles {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            price
          }
        }
      }
    }
  `);
  return (
    <section>
      <h1 className="font-bold mt-12 text-3xl">Products</h1>
      <div className="flex flex-wrap -mx-4">
        {data.allStripeSku.edges.map(product => (
          <Product key={product.node.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
