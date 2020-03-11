import React from "react";

import Part from "./Part"

const Content = (props) => {
  return (
    <div>
        <Part {...props.part1} />
        <Part {...props.part2} />
        <Part {...props.part3} />
    </div>
  );
};

export default Content;
