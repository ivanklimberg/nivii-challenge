import { Col, Row, Typography } from "antd";
import { useState } from "react";
import ChartDataMapper from "../components/ChartDataMapper";
import Loader from "../components/Loader";
import QuestionForm from "../components/QuestionForm";
import PageTitle from "../components/PageTitle";
import { postQuestions } from "../api-consumer/questions";
import type { PostQuestionResponse } from "../interfaces/Question";

const { Text } = Typography;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [errorText, setErrorText] = useState("");
  const [responseData, setResponseData] = useState<PostQuestionResponse>();

  const submitQuestion = () => {
    setLoading(true);
    postQuestions(question)
      .then((response) => {
        setResponseData(response);
      })
      .catch(() => {
        setErrorText(
          "Sorry! This is embarrasing. The server is not working properly, please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Row>
        <Col span={24}>
          <PageTitle
            typewriteEffect
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
            onChangeQuestion={(value) => {
              setErrorText("");
              setQuestion(value);
            }}
            onFocus={() => setErrorText("")}
            disabled={loading}
            onSubmit={submitQuestion}
          />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 12, offset: 6 }} xs={24}>
          {loading && <Loader />}
          {errorText !== "" && (
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
              <Text type="danger">{errorText}</Text>
            </div>
          )}

          {Boolean(!loading && responseData && !responseData.success) && (
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
              <Text type="danger">
                Sorry! This is embarrasing. We couldn't understand what you were
                asking.
              </Text>{" "}
              <br />
              <Text strong>Please try with a different wording</Text>
            </div>
          )}

          {Boolean(
            !loading &&
              responseData &&
              responseData.data &&
              responseData.data.length === 0
          ) && (
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
              <Text strong>
                Seems like your question did not output any results.
              </Text>{" "}
              <br />
              <Text>Please try with another question.</Text>
            </div>
          )}

          {Boolean(
            !loading &&
              responseData &&
              responseData.success &&
              responseData.data &&
              responseData.data.length
          ) && (
            <>
              <div
                style={{ marginBottom: 20, textAlign: "left" }}
                dangerouslySetInnerHTML={{
                  __html: responseData!.description!,
                }}
              />
              <ChartDataMapper questionResponse={responseData!} />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
