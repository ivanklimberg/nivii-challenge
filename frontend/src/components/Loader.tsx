import React from "react";
import { Spin, Typography } from "antd";
import { Typewriter } from "react-simple-typewriter";

const { Text } = Typography;

const Loader = () => {
  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <Text type="secondary">
        <Typewriter
          words={[
            "Waking up the analytics hamster...",
            "Dusting off the database...",
            "Bribing the AI with more RAM...",
            "Casting spells on your data...",
            "Crunching the numbers...",
            "Sending bits through the tubes...",
            "Aligning data chakras...",
          ]}
          loop={0}
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={25}
          delaySpeed={1200}
        />
      </Text>
      <br />
      <br />
      <Spin />
    </div>
  );
};

export default Loader;
