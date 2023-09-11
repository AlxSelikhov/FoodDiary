import React from "react";
import { Layout, Row, Col, Typography, Menu } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent: React.FC = () => {
  return (
    <Footer style={{ background: "#f0f2f5" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Text strong>Food diary</Text>
          <br />
          <Text>
            г. Москва, Росиия
            <br />
            <MailOutlined /> fooddiary@example.com
            <br />
            <PhoneOutlined /> +7(999)-888-88-88
          </Text>
        </Col>
        <Col>
          <Text strong>Мы в соцсетях:</Text>
          <br />
          <a
            href="https://www.instagram.com/alxbisanpy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined
              style={{ fontSize: "24px", marginRight: "8px" }}
            />
          </a>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Text>
            &copy; {new Date().getFullYear()} Food diary. Все права защищены.
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
