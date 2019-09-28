module.exports = {
  siteMetadata: {
    title: `Accessories by Zó`,
    description: `Hair accessories by Zó, 10 year old based in Australia trying to learn basic business practises.`,
    author: `@AccessoriesbyZo`,
    facebook: `https://www.facebook.com/AccessoriesbyZo`,
    // instagram: `https://www.instagram.com/AccessoriesbyZo`,
    siteUrl: `https:www.accessoriesbyzo.com.au`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `accessories-by-zoe`,
        short_name: `accessories-by-zoe`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
