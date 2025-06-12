import { Typography } from "antd";
import { Typewriter } from "react-simple-typewriter";

interface Props {
  title: string;
  subTitle?: string;
  typewriteEffect?: boolean;
}

const { Title, Text } = Typography;

const PageTitle = ({ title, subTitle, typewriteEffect = false }: Props) => {
  return (
    <>
      <Title level={1}>
        {typewriteEffect && (
          <Typewriter
            words={[title]}
            loop={1}
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        )}
        {!typewriteEffect && <>{title}</>}
      </Title>
      {subTitle !== undefined && <Text type="secondary">{subTitle}</Text>}
    </>
  );
};

export default PageTitle;
