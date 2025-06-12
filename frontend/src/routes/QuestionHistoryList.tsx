import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ListQuestionHistory } from "../interfaces/Question";
import PageTitle from "../components/PageTitle";
import { Col, List, Row, Skeleton, Typography } from "antd";
import { getQuestionHistoryList } from "../api-consumer/questions";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  RightOutlined,
} from "@ant-design/icons";
import { displayCreatedAt } from "../helpers/dateHelper";

const { Text } = Typography;

const QuestionHistoryList = () => {
  const [questionHistoryList, setQuestionHistoryList] = useState<
    ListQuestionHistory[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [pagingData, setPagingData] = useState({
    page: 1,
    pageSize: 20,
  });

  useEffect(() => {
    setLoading(true);
    getQuestionHistoryList(pagingData.page, pagingData.pageSize)
      .then((response) => {
        setQuestionHistoryList(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pagingData]);

  return (
    <div>
      <Row>
        <Col
          md={{ span: 16, offset: 4 }}
          xs={24}
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          <PageTitle
            title="Question History"
            subTitle="Your complete log of submitted questions and generated insights. Use this page to review past queries, refine your understanding, and avoid repeating previous work."
          />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 12, offset: 6 }} xs={24}>
          <List
            pagination={{
              position: "bottom",
              align: "end",
              onChange: (page, pageSize) => setPagingData({ page, pageSize }),
              pageSize: pagingData.pageSize,
              current: pagingData.page,
              total: 5,
            }}
            dataSource={questionHistoryList}
            renderItem={(item) => {
              let actions = [];

              if (item.succesful_response)
                actions.push(
                  <Link to={`/questions-history/${item.id}`}>
                    <RightOutlined style={{ fontSize: 26 }} />
                  </Link>
                );

              return (
                <List.Item actions={actions}>
                  <Skeleton title={false} loading={loading} active>
                    <List.Item.Meta
                      title={item.question}
                      description={
                        <>
                          {item.succesful_response > 0 && (
                            <Text type="success" strong>
                              Succesful{" "}
                              <CheckCircleTwoTone twoToneColor="#52c41a" />
                            </Text>
                          )}
                          {item.succesful_response == 0 && (
                            <Text type="danger" strong>
                              Failed{" "}
                              <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                            </Text>
                          )}{" "}
                          <br />
                          Chart Type: <strong>{item.chart_type}</strong>
                          <br /> Requested at{" "}
                          <strong>{displayCreatedAt(item.created_at)}</strong>
                        </>
                      }
                    />
                  </Skeleton>
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default QuestionHistoryList;
