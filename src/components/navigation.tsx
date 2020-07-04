import * as React from "react";

import classNames from "classnames";
import Link from "gatsby-link";

import Icon from "../components/icon";

const Navigation = (props: { pathname?: string }): JSX.Element => {
  return (
    <nav className="navigation">
      <section className="container">
        <Link
          to="/"
          className={classNames("navigation-title", {
            active: props.pathname === "/",
          })}
        >
          hockeybuggy.com
        </Link>

        <input type="checkbox" id="menu-toggle" />
        <label className="menu-button float-right" htmlFor="menu-toggle">
          <Icon name={Icon.Names.Bars} label="Toggle menu" />
        </label>

        <ul className="navigation-list">
          <li
            aria-current={props.pathname === "/" ? "page" : undefined}
            className="navigation-item"
          >
            <Link to="/">Home</Link>
          </li>
          <li
            aria-current={props.pathname === "/blog/" ? "page" : undefined}
            className="navigation-item"
          >
            <Link to="/blog/">Blog</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navigation;
