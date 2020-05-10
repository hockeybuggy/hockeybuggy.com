import * as React from "react";

import Link from "gatsby-link";

import Icon from "../components/icon";

const Navigation = (): JSX.Element => {
  return (
    <nav className="navigation">
      <section className="container">
        <Link to="/" className="navigation-title">
          hockeybuggy.com
        </Link>

        <input type="checkbox" id="menu-toggle" />
        <label className="menu-button float-right" htmlFor="menu-toggle">
          <Icon name={Icon.Names.Bars} label="Toggle menu" />
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
