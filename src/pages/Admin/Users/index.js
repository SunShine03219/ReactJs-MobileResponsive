import React from "react";
import MetaTags from "react-meta-tags";
import { Table } from "antd";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { usersAction } from "../../../store/actions";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({
    users: state.Users.users,
  }));

  React.useEffect(() => {
    dispatch(usersAction.getUsers());
  }, [dispatch]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users</title>
        </MetaTags>
        <Container fluid>
          {users ? (
            <Table
              size="small"
              columns={columns}
              dataSource={users}
              rowKey="email"
              scroll={{ x: 300 }}
            />
          ) : (
            <h3>Users Page</h3>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Users;
