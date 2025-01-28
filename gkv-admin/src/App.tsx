import React from "react";
import { ConfigProvider } from "antd";
import logo from "./logo.svg";
import "./App.css";
import Routers from "./routers/Routers";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#1570EF",
        },
        components: {},
      }}
    >
      <Routers />
    </ConfigProvider>
  );
}

export default App;
