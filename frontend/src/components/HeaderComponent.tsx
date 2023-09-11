import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  ScheduleOutlined,
  BarChartOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "./style/HeaderComponentStyle.css";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  return (
    <Header className="header">
      <div className="logo">
      </div>
      <Menu theme="dark" mode="horizontal" className="menu">
        <Menu.Item key="diary" icon={<ScheduleOutlined />}>
          <Link to="/diary">Дневник</Link>
        </Menu.Item>
        <Menu.Item key="report" icon={<BarChartOutlined />}>
          <Link to="/report">Отчет</Link>
        </Menu.Item>
      </Menu>
      <div className="login">
        <Button type="primary" icon={<LoginOutlined />} size="large">
          <Link to="/login">Вход</Link>
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
