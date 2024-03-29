// Load the environment variables.
const defaultTheme = require('tailwindcss/defaultTheme');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Accessories by Zó`,
    description: `Hair accessories by Zó, 10 year old based in Australia trying to learn basic business practises.`,
    author: `@AccessoriesbyZo`,
    facebook: `https://www.facebook.com/AccessoriesbyZo`,
    // instagram: `https://www.instagram.com/AccessoriesbyZo`,
    siteUrl: `https:www.accessoriesbyzo.com.au`,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    SUCCESS_URL: process.env.SUCCESS_URL,
    CANCEL_URL: process.env.CANCEL_URL,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-stripe`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-149349361-1`,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `accessories-by-zoe`,
        short_name: `accessories-by-zoe`,
        start_url: `/`,
        background_color: defaultTheme.colors.indigo[600],
        theme_color: defaultTheme.colors.indigo[600],
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/tailwind.css`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: [`Sku`],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
