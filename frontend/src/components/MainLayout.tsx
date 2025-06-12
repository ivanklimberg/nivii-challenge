import { ConfigProvider, Layout } from "antd";
import { Link, Outlet } from "react-router";
import Logo from "../assets/nivii_logo.webp";

const { Header, Content, Footer } = Layout;

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
      <Header
        style={{
          borderBottom: "solid 0.5px #D3D3D3",
          paddingBottom: 12,
          paddingTop: 12,
        }}
      >
        <Link to="/">
          <img src={Logo} style={{ height: "100%" }} />
        </Link>
      </Header>
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
