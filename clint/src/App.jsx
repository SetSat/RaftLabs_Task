import React from "react";
import TaskList from "./components/TaskList";
import { Layout } from "antd";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ color: "#fff", textAlign: "center", fontSize: "24px" }}>
        Task Manager
      </Header>
      <Content style={{ padding: "20px" }}>
        <TaskList />
      </Content>
    </Layout>
  );
}

export default App;
