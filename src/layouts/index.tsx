import * as React from "react";

import classNames from "classnames";
import { Helmet } from "react-helmet";

import Footer from "../components/footer";
import Navigation from "../components/navigation";

interface LayoutProps extends React.HTMLAttributes<any> {
  children: React.ReactNode;
}

const InnerContainer: React.FC<LayoutProps> = (props) => (
  <main className="container">{props.children}</main>
);

export const BaseLayout: React.FC<LayoutProps> = (props) => (
  <React.Fragment>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,700%7CMerriweather:300,700%7CSource+Code+Pro:400,700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
        crossorigin="anonymous"
      />
    </Helmet>

    <div className="header">
      <Navigation />
    </div>
    <InnerContainer {...props} />
    <Footer />
  </React.Fragment>
);
