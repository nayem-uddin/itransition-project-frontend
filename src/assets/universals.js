import { io } from "socket.io-client";

const localhost = "http://localhost:5000";
const deployHost = "https://itransition-project-backend.onrender.com";
const url = location.hostname === "localhost" ? localhost : deployHost;

export const API_URL = `${url}`;
export const socket = io(`${url}`, {
  withCredentials: true,
});

export const delayInms = 2500;
export const initialMessage = { text: "", type: null };
export const waitRequest = { text: "Please wait", type: "request" };
socket.on("connect_error", (err) => {
  console.log(err);
});
export const notifyUpdate = () => {
  socket.emit("request-templates");
  socket.emit("request-created-templates", sessionStorage.getItem("id"));
};

export const updateMessage = (setMessage, newMessage) => {
  setMessage(newMessage);
  setTimeout(() => setMessage(initialMessage), delayInms);
};

export const toForm = (data, TemplateId, Questions) => {
  const UserId = sessionStorage.getItem("id");
  const form = {
    UserId,
    TemplateId,
  };
  const qaPairs = [];
  for (const [qIdx, answer] of Object.entries(data)) {
    const currQues = Questions[Number(qIdx)];
    const response = {
      QuestionId: currQues.id,
      answer,
      UserId,
    };
    qaPairs.push(response);
  }
  Object.assign(form, { answers: qaPairs });
  return form;
};

export const formatForm = (form, data) => {
  delete data["defaultValues"];
  let { answers } = form;
  for (const [idx, answer] of Object.entries(data)) {
    const ans = answers[Number(idx)];
    delete ans["updatedAt"];
    Object.assign(ans, { answer });
  }
  const newForm = { id: form.id, UserId: form.UserId, answers };
  return newForm;
};

export const requestForms = (templateId, userId) => {
  socket.emit("request-received-forms", templateId);
  socket.emit("request-sent-forms", userId);
};
