import * as React from "react";

import Icon from "../components/icon";

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <section className="container">
        <div id="footer--first-line">
          <p>I go by both Doug or Douglas. He/Him</p>
        </div>
        <div id="footer--second-line">
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            aria-label="Creative commons licence"
          >
            <Icon
              name={Icon.Names.CreativeCommons}
              label="Creative Commons icon"
            />
          </a>
          <a href="/blog/index.xml" aria-label="blog atom feed">
            <Icon name={Icon.Names.RSS} label="RSS feed icon" />
          </a>
          <span>©2020</span>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
