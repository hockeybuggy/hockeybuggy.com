import React, { useEffect } from "react";
import { BaseLayout } from "../layouts";

import { track } from "../services/tracking";

const NotFoundPage = (): React.ReactElement => {
  useEffect(() => {
    track("404", { props: { path: document.location.pathname } });
  }, []);

  return (
    <BaseLayout>
      <h1>PAGE NOT FOUND</h1>
      <p>You just landed on a page that does not exist... </p>
      <p>Sorry about that.</p>
    </BaseLayout>
  );
};

export default NotFoundPage;
