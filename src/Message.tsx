import React from "react";

type Props = {
  name: string;
  text: string;
};

export const Message: React.FC<Props> = ({ name, text }) => {
  return (
    <li>
      <span>
        <p>
          {name}: {text}
        </p>
      </span>
    </li>
  );
};
