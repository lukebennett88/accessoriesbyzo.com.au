import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      file(relativePath: { eq: "avatar.png" }) {
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
    <article className="bg-white flex flex-wrap-reverse mt-12 px-6 py-8 rounded shadow text-2xl hover:shadow-lg">
      <div className="w-full md:w-2/3">
        <p>Hello, my name is Zoe. I run this business.</p>
        <p>
          Please join me on my journey of learning to sew by purchasing some
          scrunchies and supporting me.
        </p>
        <p>
          What is a scrunchie? A scrunchie is basically a hair band, but it's
          got fabric around it and it stretches more.
        </p>
      </div>
      <div className="max-w-xs mx-auto pb-4 md:p-4 w-full md:w-1/3">
        <Image fluid={fluid} alt="Zoe" />
      </div>
    </article>
  );
};

export default Hero;
