// // Third party
// import asyncHandler from "express-async-handler";
// import debug from "debug";
// import * as express from "express";
// // Models
// import ChatMessage from "../models/post.js";
// import ChatRoom from "../models/chatRoom.js";

// const logger = debug("chat-app:chatController");

// export const getChatRooms = asyncHandler(async (req, res, next) => {
//   const chatRoomList = await ChatRoom.find({
//     members: { $in: [req.params.userId] },
//   })
//     .populate("members", "-password")
//     .exec();

//   res.json(chatRoomList);
// });

// export const createChatRoom = asyncHandler(async (req, res, next) => {
//   const newChatRoom = await ChatRoom.create({
//     members: [req.body.senderId, req.body.receiverId],
//   });

//   const populatedChatRoom = await newChatRoom.populate("members", "-password");

//   res.status(201).json(populatedChatRoom);
// });

// export const getChatMessages = asyncHandler(async (req, res, next) => {
//   const chatRoomMessages = await ChatMessage.find({
//     chatRoomId: req.params.roomId,
//   })
//     .sort({ created: 1 })
//     .exec();

//   res.json(chatRoomMessages);
// });

// export const createChatMessage = asyncHandler(async (req, res, next) => {
//   const newChatMessage = await ChatMessage.create(req.body);

//   res.status(201).json(newChatMessage);
// });
