import { io } from "socket.io-client";

const url = "http://localhost";
// const url = "https://itransition-project-backend.onrender.com";

export const API_URL = `${url}:5000`;
export const socket = io(`${url}:4000`);

export const delayInms = 3000;
export const initialMessage = { text: "", type: null };
socket.on("connect_error", (err) => {
  console.log(err);
});
