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
  const form = {
    TemplateId,
    UserId: sessionStorage.getItem("id"),
  };
  const qaPairs = [];
  for (const [qIdx, answer] of Object.entries(data)) {
    const currQues = Questions[Number(qIdx)];
    const response = {
      qTitle: currQues.title,
      qDescription: currQues.description,
      qType: currQues.type,
      qShowOnPreview: currQues.showOnPreview || false,
      answer,
    };
    const currQuesType = currQues.type;
    if (currQuesType === "integer") {
      Object.assign(response, { qMax: currQues.max, qMin: currQues.min });
    } else if (currQuesType !== "string") {
      Object.assign(response, { qOptions: currQues.options });
    }
    qaPairs.push(response);
  }
  Object.assign(form, { response: qaPairs });
  return form;
};

export const formatForm = (form, data) => {
  let response = form.response;
  for (const [idx, answer] of Object.entries(data)) {
    response[idx] = { ...response[idx], answer };
  }
  const newForm = { id: form.id, UserId: form.UserId, response };
  return newForm;
};

export const requestForms = (templateId, userId) => {
  socket.emit("request-received-forms", templateId);
  socket.emit("request-sent-forms", userId);
};
