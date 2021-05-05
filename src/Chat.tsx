import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Message } from "./Message";

type Props = {
  name: string;
};

export type MessageType = {
  name: string;
  text: string;
};

const socket = io("ws://localhost:8080/", {});

export const Chat: React.FC<Props> = ({ name }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [text, setText] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const message = {
      name: name,
      text: text,
    };

    console.log(message);

    socket.emit("send", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setText("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connecting...");
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      console.log("disconnect...");

      setIsConnected(false);
    });

    socket.on("broadcast", (payload: MessageType) => {
      console.log("Received: ", payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("broadcast");
    };
  }, []);

  return (
    <div>
      <div className="input">
        {!isConnected && <h2>Not connected</h2>}
        <input
          type="text"
          placeholder={"メッセージ"}
          value={text}
          onChange={handleInputChange}
        />
        <button disabled={!text} onClick={handleButtonClick}>
          送信
        </button>
      </div>
      <ul>
        {messages.map((message, key) => {
          return <Message key={key} name={message.name} text={message.text} />;
        })}
      </ul>
    </div>
  );
};
