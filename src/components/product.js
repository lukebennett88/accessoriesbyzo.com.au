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
          SUCCESS_URL
          CANCEL_URL
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
        successUrl: data.site.siteMetadata.SUCCESS_URL,
        cancelUrl: data.site.siteMetadata.CANCEL_URL,
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
    <article className="flex mt-4 px-4 w-full sm:w-1/2 md:w-1/3">
      <div className="bg-white overflow-hidden rounded-lg shadow w-full hover:shadow-xl">
        <Image fluid={product.node.localFiles[0].childImageSharp.fluid} />
        <div className="px-6 py-4">
          <h2 className="font-bold text-lg truncate">
            {product.node.attributes.name}
          </h2>
          <p className="mt-2">
            No shipping options. Local pickup from Wauchope only.
          </p>
          <div className="flex items-center justify-between mt-6">
            <p className="font-bold text-3xl">
              ${(product.node.price / 100).toFixed(2)}ea
            </p>
            <p>
              <button
                onClick={() => redirectToCheckout()}
                type="button"
                className="button"
              >
                Buy now
              </button>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
