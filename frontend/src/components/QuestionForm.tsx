import { Button, Col, Form, Input, Row } from "antd";

interface Props {
  disabled: boolean;
  question: string;
  onChangeQuestion: (value: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
}

const QuestionForm = ({
  question,
  onChangeQuestion,
  onFocus,
  onSubmit,
  disabled,
}: Props) => {
  return (
    <Form onFinish={onSubmit}>
      <Row gutter={12}>
        <Col span={19}>
          <Form.Item>
            <Input
              required
              value={question}
              onFocus={onFocus}
              onChange={(e) => onChangeQuestion(e.currentTarget.value)}
              placeholder="Which are the top 5 most sold products for the last year?"
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{ width: "100%" }}
              type="primary"
              disabled={disabled}
            >
              Ask
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default QuestionForm;
