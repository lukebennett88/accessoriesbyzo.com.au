import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const SuccessPage = () => {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "success.png" }) {
        childImageSharp {
          fluid(maxWidth: 320, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  const { fluid } = data.file.childImageSharp;
  return (
    <Layout>
      <SEO title="Success" />
      <article className="bg-white flex flex-wrap items-center mt-12 px-6 py-8 rounded-lg shadow text-2xl hover:shadow-lg">
        <div className="max-w-xs mx-auto pb-4 md:p-4 w-full md:w-1/3">
          <Image fluid={fluid} alt="Zoe" />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="font-bold text-4xl">Order complete</h1>
          <div className="mt-2">
            <p>Thank you for your order.</p>
            <p>
              You will receive an email when your order is ready to collect.
            </p>
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

export default SuccessPage;
