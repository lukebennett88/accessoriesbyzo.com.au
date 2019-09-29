import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "404.png" }) {
        childImageSharp {
          fluid(maxWidth: 512, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  const { fluid } = data.file.childImageSharp;
  return (
    <Layout>
      <SEO title="404: Not found" />
      <article className="bg-white flex flex-wrap items-center mt-12 px-6 py-12 rounded text-2xl">
        <div className="max-w-xs mx-auto pb-4 md:p-4 w-full md:w-1/3">
          <Image fluid={fluid} alt="Zoe" />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="font-bold text-4xl">Page Not Found</h1>
          <div className="mt-2">
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            <p className="mt-6">
              <Link to="/" className="button">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default NotFoundPage;
