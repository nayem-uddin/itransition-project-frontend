import { io } from "socket.io-client";

// const url = "http://localhost:5000";
const url = "https://itransition-project-backend.onrender.com";

export const API_URL = `${url}`;
export const socket = io(`${url}`, {
  withCredentials: true,
});

export const delayInms = 3000;
export const initialMessage = { text: "", type: null };
export const waitRequest = { text: "Please wait", type: "request" };
socket.on("connect_error", (err) => {
  console.log(err);
});
