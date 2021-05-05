import React, { useState } from "react";
import "./App.css";
import { Chat } from "./Chat";

function App() {
  const name = "user_name_1";

  return (
    <div className="App">
      <Chat name={name} />
    </div>
  );
}

export default App;
