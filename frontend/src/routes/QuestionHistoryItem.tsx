import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import type { QuestionHistory } from "../interfaces/Question";
import PageTitle from "../components/PageTitle";
import { Link, useParams } from "react-router";
import Loader from "../components/Loader";
import { displayCreatedAt } from "../helpers/dateHelper";
import ChartDataMapper from "../components/ChartDataMapper";
import { getQuestionHistoryById } from "../api-consumer/questions";

const QuestionHistoryItem = () => {
  const params = useParams();
  const [questionHistoryItem, setQuestionHistoryItem] =
    useState<QuestionHistory>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getQuestionHistoryById(Number(params.id))
      .then((response) => {
        if (response.success) {
          setQuestionHistoryItem(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (
    (!questionHistoryItem || !questionHistoryItem.succesful_response) &&
    !loading
  )
    return (
      <div style={{ textAlign: "center" }}>
        <Row>
          <Col md={{ span: 16, offset: 4 }} xs={24}>
            <div>
              <PageTitle
                title="Question not found"
                subTitle="Sorry! The question you requested couldn't be found"
              />
            </div>
            <div>
              <Link to="/questions-history">Go Back</Link>
            </div>
          </Col>
        </Row>
      </div>
    );

  return (
    <div>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Loader showText />
        </div>
      )}
      {!loading && (
        <>
          <Row>
            <Col md={{ span: 16, offset: 4 }} xs={24}>
              <Link to="/questions-history">Go Back</Link>
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 16, offset: 4 }}
              xs={24}
              style={{ textAlign: "center", marginBottom: 30 }}
            >
              <PageTitle
                title={questionHistoryItem!.question}
                subTitle={`Requested at ${displayCreatedAt(
                  questionHistoryItem!.created_at
                )!}`}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 12, offset: 6 }} xs={24}>
              <div
                style={{ marginBottom: 20, textAlign: "left" }}
                dangerouslySetInnerHTML={{
                  __html: questionHistoryItem!.description!,
                }}
              />
              <ChartDataMapper
                questionResponse={{
                  data: JSON.parse(questionHistoryItem!.json_response!),
                  display_type: questionHistoryItem!.chart_type!,
                  description: questionHistoryItem!.description!,
                  success: true,
                  config: JSON.parse(questionHistoryItem!.chart_config!),
                }}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default QuestionHistoryItem;
