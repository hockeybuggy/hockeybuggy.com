import * as React from "react";
import { BaseLayout } from "../layouts";

const NotFoundPage: React.FC = () => (
  <BaseLayout>
    <h1>PAGE NOT FOUND</h1>
    <p>You just landed on a page that does not exist... </p>
    <p>Sorry about that.</p>
  </BaseLayout>
);

export default NotFoundPage;
