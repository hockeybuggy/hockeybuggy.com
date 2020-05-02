import * as React from "react";

const Footer = (props: {}): JSX.Element => {
  return (
    <section className="container">
      <p>I go by both Doug or Douglas. He/Him</p>
      <a href="/LICENSE" aria-label="licence">
        <i className="fab fa-creative-commons"></i>
      </a>
      •
      <a href="/blog/index.xml" aria-label="atom feed">
        <i className="fas fa-rss"></i>
      </a>
      • © 2020
    </section>
  );
};

export default Footer;
