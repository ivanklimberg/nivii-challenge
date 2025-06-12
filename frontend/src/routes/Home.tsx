import { Col, Row } from "antd";
import { useState } from "react";
import ChartDataMapper from "../components/ChartDataMapper";
import Loader from "../components/Loader";
import QuestionForm from "../components/QuestionForm";
import PageTitle from "../components/PageTitle";
import { postQuestions } from "../api-consumer/questions";
import type { PostQuestionResponse } from "../interfaces/Question";

const Home = () => {
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
    </div>
  );
};

export default Home;
