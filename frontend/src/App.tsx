import { useState } from "react";
import { Layout, ConfigProvider, Row, Col } from "antd";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

import Logo from "./assets/nivii_logo.webp";
import QuestionForm from "./components/QuestionForm";
import PageTitle from "./components/PageTitle";
import { postQuestions } from "./api-consumer/questions";
import type { PostQuestionResponse } from "./interfaces/Question";
import Loader from "./components/Loader";
import ChartDataMapper from "./components/ChartDataMapper";

ChartJS.register(
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const { Header, Content } = Layout;

function App() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [responseData, setResponseData] = useState<PostQuestionResponse>();

  const submitQuestion = () => {
    setLoading(true);
    postQuestions(question)
      .then((response) => {
        setResponseData(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              <PageTitle
                title="Your data speaks — just ask."
                subTitle="Make questions regarding your data and get data-oriented answers in a user friendly format"
              />
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 10, offset: 7 }}
              xs={24}
              style={{ marginTop: 30, marginBottom: 10 }}
            >
              <QuestionForm
                question={question}
                onChangeQuestion={setQuestion}
                disabled={loading}
                onSubmit={submitQuestion}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 12, offset: 6 }} xs={24}>
              {loading && <Loader />}

              {!loading && responseData && responseData.success && (
                <>
                  <div
                    style={{ marginBottom: 20, textAlign: "left" }}
                    dangerouslySetInnerHTML={{
                      __html: responseData.description!,
                    }}
                  />
                  <ChartDataMapper questionResponse={responseData} />
                </>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
