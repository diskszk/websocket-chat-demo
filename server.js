"use strict";
exports.__esModule = true;
var socket_io_1 = require("socket.io");
// import express from "express";
// import http from "http";
var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});
io.on("connection", function (socket) {
    // 接続を確認
    console.log("connect: " + socket.id);
    // socket.on("hello!", () => {
    //   console.log(`hello from ${socket.id}`);
    // });
    // クライアントから送信されてきたデータを他のクライアントにも渡す
    socket.on("send", function (payload) {
        console.log(payload);
        socket.broadcast.emit("broadcast", payload);
    });
    // 切断
    socket.on("disconnect", function () {
        console.log("disconnect: " + socket.id);
    });
    socket.on("update item", function (arg1, callback) {
        console.log(arg1);
        callback({
            status: "ok"
        });
    });
});
server.listen(8080, function () {
    console.log("listening on 8080");
});
