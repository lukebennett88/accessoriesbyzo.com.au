import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          STRIPE_PUBLISHABLE_KEY
        }
      }
    }
  `);
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys
  let stripe;
  useEffect(() => {
    stripe = window.Stripe(data.site.siteMetadata.STRIPE_PUBLISHABLE_KEY);
  }, [data.site.siteMetadata.STRIPE_PUBLISHABLE_KEY]);

  const redirectToCheckout = () => {
    stripe
      .redirectToCheckout({
        items: [{ sku: product.node.id, quantity: 1 }],

        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: process.env.production
          ? 'https://www.accessoriesbyzo.com.au/success'
          : 'http://localhost:8000/success',
        cancelUrl: process.env.production
          ? 'https://www.accessoriesbyzo.com.au'
          : 'http://localhost:8000',
      })
      .then(function(result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          const displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
  };
  return (
    <article className="flex mt-8 px-4 w-full sm:w-1/2 md:w-1/3">
      <div className="bg-white overflow-hidden rounded shadow w-full hover:shadow-xl">
        <Image fluid={product.node.localFiles[0].childImageSharp.fluid} />
        <div className="px-6 py-4">
          <h2 className="font-bold text-lg truncate">
            {product.node.attributes.name}
          </h2>
          <p>${(product.node.price / 100).toFixed(2)}</p>
          <p>No shipping options. Local pickup from Wauchope only.</p>
          <p>
            <button
              onClick={() => redirectToCheckout()}
              type="button"
              className="bg-indigo-700 font-medium inline-block px-6 py-2 rounded shadow text-xs text-white tracking-wider uppercase hover:bg-indigo-600 hover:shadow-lg"
            >
              Buy now
            </button>
          </p>
        </div>
      </div>
    </article>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
