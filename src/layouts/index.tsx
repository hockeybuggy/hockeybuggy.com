import * as React from "react";

import classNames from "classnames";
import { Helmet } from "react-helmet";

import Footer from "../components/footer";
import Navigation from "../components/navigation";

import "../styles/main.scss";

interface LayoutProps extends React.HTMLAttributes<any> {
  className?: string;
  pathname?: string;
  children: React.ReactNode;
}

const InnerContainer: React.FC<LayoutProps> = (props) => (
  <section className={classNames("container", props.className)}>
    {props.children}
  </section>
);

export const BaseLayout: React.FC<LayoutProps> = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Lato:wght@400;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/static/img/favicon.ico" />
      </Helmet>

      <main className="wrapper">
        <div className="header">
          <Navigation pathname={props.pathname} />
        </div>
        <div className="content">
          <InnerContainer {...props} />
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
};

export const CenteredLayout: React.FC<LayoutProps> = (props) => (
  <BaseLayout className="centered" {...props}>
    {props.children}
  </BaseLayout>
);
