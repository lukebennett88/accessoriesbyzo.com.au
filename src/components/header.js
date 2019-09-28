import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          facebook
        }
      }
    }
  `);
  const { facebook } = data.site.siteMetadata;
  return (
    <header className="bg-indigo-700 sticky text-indigo-100 top-0 z-10">
      <div className="flex items-center justify-between max-w-3xl mx-auto p-4 w-full">
        <h1 className="font-display text-3xl">
          <Link to="/">{siteTitle}</Link>
        </h1>
        <a href={facebook} className="text-2xl">
          <FaFacebookSquare className="fill-current" />
        </a>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
