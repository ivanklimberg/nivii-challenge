import { Layout, Menu } from "antd";
import { Link } from "react-router";
import Logo from "../assets/nivii_logo.webp";
import type { MenuItemType } from "antd/es/menu/interface";

const { Header } = Layout;

const menuItems: MenuItemType[] = [
  {
    key: 0,
    label: <Link to="/">Ask Question</Link>,
    type: "item",
  },
  {
    key: 1,
    label: <Link to="/questions-history">History</Link>,
    type: "item",
  },
];

const MainHeader = () => {
  return (
    <Header
      className="custom-menu"
      style={{
        borderBottom: "solid 0.5px #D3D3D3",
        paddingBottom: 12,
        paddingTop: 12,
        display: "flex",
      }}
    >
      <Link to="/">
        <img src={Logo} style={{ height: "100%" }} />
      </Link>
      <Menu
        className="desktop-menu"
        theme="light"
        mode="horizontal"
        items={menuItems}
        style={{
          flex: 1,
          minWidth: 0,
          alignItems: "flex-end",
          flexDirection: "row-reverse",
          borderBottom: "none",
        }}
      />
    </Header>
  );
};

export default MainHeader;
