import React from "react";
import MetaTags from "react-meta-tags";

import { Container } from "reactstrap";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard</title>
        </MetaTags>
        <Container fluid>
          <h3>Welcome Admin!</h3>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
