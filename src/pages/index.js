import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Products from '../components/products';

const IndexPage = () => (
  <Layout>
    <SEO title="Handmade Accessories by Zoe Swan" />
    <Hero />
    <Products />
  </Layout>
);

export default IndexPage;
