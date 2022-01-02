import * as React from "react";
import Link from "next/link";

import Icon from "../components/icon";

interface Props {
  showRSSLink?: boolean;
}

const Footer = (props: Props): JSX.Element => {
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
          {props.showRSSLink && (
            <Link href="/blog/index.xml">
              <a aria-label="blog atom feed">
                <Icon name={Icon.Names.RSS} label="RSS feed icon" />
              </a>
            </Link>
          )}
          <span>©2022</span>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
