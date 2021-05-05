import { Server } from "socket.io";

// import express from "express";
// import http from "http";
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  // 接続を確認
  console.log(`connect: ${socket.id}`);

  // socket.on("hello!", () => {
  //   console.log(`hello from ${socket.id}`);
  // });

  // クライアントから送信されてきたデータを他のクライアントにも渡す
  socket.on("send", (payload) => {
    console.log(payload);
    socket.broadcast.emit("broadcast", payload);
  });

  // 切断
  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on("update item", (arg1, callback) => {
    console.log(arg1);
    callback({
      status: "ok",
    });
  });
});

server.listen(8080, () => {
  console.log("listening on 8080");
});
