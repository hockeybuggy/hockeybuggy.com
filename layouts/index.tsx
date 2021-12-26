import * as React from "react";

import classNames from "classnames";

import Footer from "../components/footer";
import Navigation from "../components/navigation";

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
