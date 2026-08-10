import { v4 as uuidv4 } from "uuid";

const generateId = () => uuidv4();

const getCurrentDateTime = () => {
  const now = new Date();
  return {
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5),
  };
};

const formatDate = (date) => new Date(date).toLocaleDateString();
const formatTime = (time) => time.slice(0, 5);

const STORAGE_KEY = "appointments";

const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const createAppointment = (appointmentData, createdBy = "user") => {
  const appointments = getStorageData();
  const now = new Date();

  const newAppointment = {
    id: generateId(),
    name: appointmentData.name || "",
    phone: appointmentData.phone || "",
    bloodType: appointmentData.bloodType || "",
    appointmentType: appointmentData.appointmentType || "scheduled",
    appointmentDate: appointmentData.appointmentDate || "",
    appointmentTime: appointmentData.appointmentTime || "",
    status: appointmentData.status || "upcoming",
    created_by: createdBy,
    created_at: now.toISOString(),
    created_date: now.toISOString().split("T")[0],
    created_time: now.toTimeString().slice(0, 5),
    updated_at: now.toISOString(),
  };

  appointments.unshift(newAppointment);
  setStorageData(appointments);
  return newAppointment;
};

const getAppointments = () => {
  return getStorageData();
};

const getAppointmentById = (id) => {
  const appointments = getStorageData();
  return appointments.find((app) => app.id === id) || null;
};

const updateAppointment = (id, updatedData) => {
  const appointments = getStorageData();
  const index = appointments.findIndex((app) => app.id === id);

  if (index === -1) return null;

  appointments[index] = {
    ...appointments[index],
    ...updatedData,
    updated_at: new Date().toISOString(),
  };

  setStorageData(appointments);
  return appointments[index];
};

const deleteAppointment = (id) => {
  const appointments = getStorageData();
  const filtered = appointments.filter((app) => app.id !== id);

  if (filtered.length === appointments.length) return false;

  setStorageData(filtered);
  return true;
};

const checkAppointmentByPhone = (phone) => {
  const appointments = getStorageData();
  if (!phone || !phone.trim()) return null;
  return appointments.find((app) => app.phone === phone.trim()) || null;
};

const hasAppointmentByPhone = (phone) => {
  return checkAppointmentByPhone(phone) !== null;
};

const getAppointmentsByPhone = (phone) => {
  const appointments = getStorageData();
  if (!phone || !phone.trim()) return [];
  return appointments.filter((app) => app.phone === phone.trim());
};

const filterByStatus = (status) => {
  const appointments = getStorageData();
  if (!status || status === "all") return appointments;
  return appointments.filter((app) => app.status === status);
};

const filterByType = (type) => {
  const appointments = getStorageData();
  if (!type || type === "all") return appointments;
  return appointments.filter((app) => app.appointmentType === type);
};

const filterByBloodType = (bloodType) => {
  const appointments = getStorageData();
  if (!bloodType || bloodType === "all") return appointments;
  return appointments.filter((app) => app.bloodType === bloodType);
};

const filterByName = (name) => {
  const appointments = getStorageData();
  if (!name || !name.trim()) return appointments;
  const lowerName = name.toLowerCase().trim();
  return appointments.filter((app) =>
    app.name?.toLowerCase().includes(lowerName),
  );
};

const filterByDate = (date) => {
  const appointments = getStorageData();
  if (!date) return appointments;
  return appointments.filter((app) => app.appointmentDate === date);
};

const filterByCreator = (createdBy) => {
  const appointments = getStorageData();
  if (!createdBy || createdBy === "all") return appointments;
  return appointments.filter((app) => app.created_by === createdBy);
};

const filterAppointments = (filters = {}) => {
  const { status, type, bloodType, name, date, createdBy } = filters;
  let appointments = getStorageData();

  if (status && status !== "all") {
    appointments = appointments.filter((app) => app.status === status);
  }

  if (type && type !== "all") {
    appointments = appointments.filter((app) => app.appointmentType === type);
  }

  if (bloodType && bloodType !== "all") {
    appointments = appointments.filter((app) => app.bloodType === bloodType);
  }

  if (date) {
    appointments = appointments.filter((app) => app.appointmentDate === date);
  }

  if (createdBy && createdBy !== "all") {
    appointments = appointments.filter((app) => app.created_by === createdBy);
  }

  if (name && name.trim()) {
    const lowerName = name.toLowerCase().trim();
    appointments = appointments.filter((app) =>
      app.name?.toLowerCase().includes(lowerName),
    );
  }

  return appointments;
};

const changeStatus = (id, newStatus) => {
  return updateAppointment(id, { status: newStatus });
};

const moveToCurrent = (id) => {
  const appointment = getAppointmentById(id);
  if (!appointment) return null;
  if (appointment.status !== "upcoming" && appointment.status !== "waiting") {
    return null;
  }
  return changeStatus(id, "current");
};

const getStats = () => {
  const appointments = getStorageData();

  return {
    total: appointments.length,
    upcoming: appointments.filter((app) => app.status === "upcoming").length,
    waiting: appointments.filter((app) => app.status === "waiting").length,
    current: appointments.filter((app) => app.status === "current").length,
    scheduled: appointments.filter((app) => app.appointmentType === "scheduled")
      .length,
    direct: appointments.filter((app) => app.appointmentType === "direct")
      .length,
    emergency: appointments.filter((app) => app.appointmentType === "emergency")
      .length,
    admin: appointments.filter((app) => app.created_by === "admin").length,
    user: appointments.filter((app) => app.created_by === "user").length,
  };
};

const clearAllData = () => {
  setStorageData([]);
};

const helpers = {
  generateId,
  getCurrentDateTime,
  formatDate,
  formatTime,

  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,

  checkAppointmentByPhone,
  hasAppointmentByPhone,
  getAppointmentsByPhone,

  filterByStatus,
  filterByType,
  filterByBloodType,
  filterByName,
  filterByDate,
  filterByCreator,
  filterAppointments,

  changeStatus,
  moveToCurrent,

  getStats,

  clearAllData,
  STORAGE_KEY,
};

export default helpers;
