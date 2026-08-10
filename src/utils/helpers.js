// helpers.js
import { v4 as uuidv4 } from "uuid";

const generateId = () => {
  return uuidv4();
};

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().slice(0, 5);
  return { date, time };
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const formatTime = (time) => {
  return time.slice(0, 5);
};

const helpers = {
  generateId,
  getCurrentDateTime,
  formatDate,
  formatTime,
};

export default helpers;
