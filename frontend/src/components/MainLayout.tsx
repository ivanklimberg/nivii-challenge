import { ConfigProvider, Layout } from "antd";
import { Outlet } from "react-router";
import MainHeader from "./MainHeader";

const { Content, Footer } = Layout;

const MainLayout = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00AA64",
        colorLink: "#00AA64",
      },
      components: {
        Layout: {
          headerBg: "#FFFFFF",
        },
      },
    }}
  >
    <Layout>
      <MainHeader />
      <Content style={{ padding: 10, paddingTop: 20, paddingBottom: 20 }}>
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          borderTop: "solid 0.5px #D3D3D3",
        }}
      >
        Nivii Challenge ©{new Date().getFullYear()} - Made by humans for humans
      </Footer>
    </Layout>
  </ConfigProvider>
);

export default MainLayout;
