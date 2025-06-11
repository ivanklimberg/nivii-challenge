import React from "react";
import { ConfigProvider, Layout } from "antd";
import { Outlet } from "react-router";
import Logo from "../assets/nivii_logo.webp";

const { Header, Content } = Layout;

const MainLayout = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00AA64",
      },
      components: {
        Layout: {
          headerBg: "#FFFFFF",
        },
      },
    }}
  >
    <Layout>
      <Header
        style={{
          borderBottom: "solid 0.5px #D3D3D3",
          paddingBottom: 12,
          paddingTop: 12,
        }}
      >
        <img src={Logo} style={{ height: "100%" }} />
      </Header>
      <Content style={{ textAlign: "center", padding: 10 }}>
        <Outlet />
      </Content>
    </Layout>
  </ConfigProvider>
);

export default MainLayout;
