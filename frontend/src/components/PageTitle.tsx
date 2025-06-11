import { Typography } from "antd";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

interface Props {
  title: string;
  subTitle?: string;
}

const { Title, Text } = Typography;

const PageTitle = ({ title, subTitle }: Props) => {
  return (
    <>
      <Title level={1}>
        <Typewriter
          words={[title]}
          loop={1}
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </Title>
      {subTitle !== undefined && <Text type="secondary">{subTitle}</Text>}
    </>
  );
};

export default PageTitle;
