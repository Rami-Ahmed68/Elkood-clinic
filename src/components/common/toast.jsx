// src/components/common/toast.js
import { createStandaloneToast } from "@chakra-ui/react";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

const { ToastContainer, toast } = createStandaloneToast();

export const showToast = {
  success: (title, description = "", duration = 4000) => {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: duration,
      isClosable: true,
      position: "top-right",
      icon: FiCheckCircle,
    });
  },

  error: (title, description = "", duration = 5000) => {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: duration,
      isClosable: true,
      position: "top-right",
      icon: FiXCircle,
    });
  },

  warning: (title, description = "", duration = 4000) => {
    toast({
      title: title,
      description: description,
      status: "warning",
      duration: duration,
      isClosable: true,
      position: "top-right",
      icon: FiAlertTriangle,
    });
  },

  info: (title, description = "", duration = 4000) => {
    toast({
      title: title,
      description: description,
      status: "info",
      duration: duration,
      isClosable: true,
      position: "top-right",
      icon: FiInfo,
    });
  },

  custom: (options = {}) => {
    toast({
      title: options.title || "",
      description: options.description || "",
      status: options.status || "info",
      duration: options.duration || 4000,
      isClosable: options.isClosable !== false,
      position: options.position || "top-right",
      icon: options.icon || FiInfo,
    });
  },
};

export const ToastProvider = () => {
  return <ToastContainer />;
};

export default showToast;
