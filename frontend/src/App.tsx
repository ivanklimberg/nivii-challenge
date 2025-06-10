import { useState } from "react";
import {
  Layout,
  ConfigProvider,
  Row,
  Col,
  Form,
  Typography,
  Input,
  Button,
} from "antd";

import Logo from "./assets/nivii_logo.webp";
import QuestionForm from "./components/QuestionForm";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  return (
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
          <Row>
            <Col span={24}>
              {/*  CREAR ANIMACION PARA EL TITULO COMO TIPEANDO */}
              <Title level={1}>Your data speaks — just ask.</Title>
              <Text type="secondary">
                Make questions regarding your data and get the results in a user
                friendly format
              </Text>
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 10, offset: 7 }}
              xs={24}
              style={{ marginTop: 30, marginBottom: 30 }}
            >
              <QuestionForm
                question={question}
                onChangeQuestion={setQuestion}
                disabled={loading}
                onSubmit={() => {}}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
