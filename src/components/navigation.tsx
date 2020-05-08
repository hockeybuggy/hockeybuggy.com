import * as React from "react";

import Link from "gatsby-link";

const Navigation = (): JSX.Element => {
  return (
    <nav className="navigation">
      <section className="container">
        <Link to="/" className="navigation-title">
          hockeybuggy.com
        </Link>

        <input type="checkbox" id="menu-toggle" />
        <label className="menu-button float-right" htmlFor="menu-toggle">
          <i className="fas fa-bars"></i>
        </label>

        <ul className="navigation-list">
          <li className="navigation-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navigation-item">
            <Link to="/blog/">Blog</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navigation;
