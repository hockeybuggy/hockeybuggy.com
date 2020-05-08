import * as React from "react";

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <section className="container">
        <p>I go by both Doug or Douglas. He/Him</p>
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          aria-label="licence"
        >
          <i className="fab fa-creative-commons"></i>
        </a>
        •
        <a href="/blog/index.xml" aria-label="atom feed">
          <i className="fas fa-rss"></i>
        </a>
        • © 2020
      </section>
    </footer>
  );
};

export default Footer;
