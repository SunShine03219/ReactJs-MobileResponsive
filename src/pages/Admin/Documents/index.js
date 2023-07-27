import React from "react";
import MetaTags from "react-meta-tags";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { docsAction } from "../../../store/actions";

const Documents = () => {
  const dispatch = useDispatch();
  const { docs } = useSelector((state) => ({
    docs: state.Docs.docs,
  }));

  React.useEffect(() => {
    dispatch(docsAction.getDocs());
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Documents</title>
        </MetaTags>
        <Container fluid>
          {docs ? (
            <Table
              size="small"
              columns={columns}
              dataSource={docs}
              rowKey="id"
              scroll={{ x: 300 }}
            />
          ) : (
            <h3>Documents Page</h3>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Documents;
