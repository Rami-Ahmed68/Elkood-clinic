import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Input,
  VStack,
  HStack,
  Icon,
  Box,
  IconButton,
  FormControl,
  FormLabel,
  Select,
  Divider,
} from "@chakra-ui/react";
import {
  FiX,
  FiPlus,
  FiUser,
  FiPhone,
  FiCalendar,
  FiDroplet,
  FiClock,
  FiWatch,
} from "react-icons/fi";
import { showToast } from "../../common/toast";
import useStore from "../../../store/store";
import helpers from "../../../utils/helpers";

const AddAppointmentModal = ({ isOpen, onClose, onAdd }) => {
  const { language } = useStore();
  const [newPatient, setNewPatient] = useState({
    name: "",
    phone: "",
    bloodType: "",
    appointmentType: "scheduled",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDateTime = helpers.getCurrentDateTime();

  const words = {
    en: {
      title: "New Appointment",
      subtitle: "Add a new patient appointment",
      add: "Add Appointment",
      cancel: "Cancel",
      close: "Close",
      patientName: "Patient Name",
      phone: "Phone Number",
      bloodType: "Blood Type",
      appointmentType: "Appointment Type",
      appointmentDate: "Appointment Date",
      appointmentTime: "Appointment Time",
      createdAt: "Created At",
      addAppointment: "Add Appointment",
      selectBloodType: "Select Blood Type",
      appointmentTypes: {
        scheduled: "Scheduled",
        direct: "Direct",
        emergency: "Emergency",
      },
      bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: "Required fields",
      fillAllFields: "Please fill in all required fields",
      success: "Appointment added successfully",
      error: "Failed to add appointment",
    },
    ar: {
      title: "حجز جديد",
      subtitle: "إضافة حجز مريض جديد",
      add: "إضافة حجز",
      cancel: "إلغاء",
      close: "إغلاق",
      patientName: "اسم المريض",
      phone: "رقم الهاتف",
      bloodType: "فصيلة الدم",
      appointmentType: "نوع الحجز",
      appointmentDate: "تاريخ الموعد",
      appointmentTime: "وقت الموعد",
      createdAt: "تاريخ الإنشاء",
      addAppointment: "إضافة حجز",
      selectBloodType: "اختر فصيلة الدم",
      appointmentTypes: {
        scheduled: "حجز مسبق",
        direct: "حجز مباشر",
        emergency: "حالة إسعافية",
      },
      bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: "حقول مطلوبة",
      fillAllFields: "يرجى ملء جميع الحقول المطلوبة",
      success: "تم إضافة الحجز بنجاح",
      error: "فشل في إضافة الحجز",
    },
  };

  const text = (key) => {
    if (typeof key === "string" && key.includes(".")) {
      const keys = key.split(".");
      let value = words[language] || words.ar;
      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          return key;
        }
      }
      return value || key;
    }
    return words[language]?.[key] || words.ar[key] || key;
  };

  const bloodTypes = text("bloodTypes") || words.ar.bloodTypes;
  const appointmentTypes =
    text("appointmentTypes") || words.ar.appointmentTypes;

  const handleSubmit = async () => {
    if (
      !newPatient.name ||
      !newPatient.phone ||
      !newPatient.appointmentDate ||
      !newPatient.appointmentTime
    ) {
      showToast.warning(text("warning") || "Warning", text("fillAllFields"));
      return;
    }

    setIsSubmitting(true);
    try {
      const createdAt = currentDateTime;
      const appointmentData = {
        ...newPatient,
        createdAt: `${createdAt.date} ${createdAt.time}`,
        createdDate: createdAt.date,
        createdTime: createdAt.time,
      };
      await onAdd(appointmentData);
      showToast.success(text("success"));
      setNewPatient({
        name: "",
        phone: "",
        bloodType: "",
        appointmentType: "scheduled",
        appointmentDate: "",
        appointmentTime: "",
      });
      onClose();
    } catch (error) {
      showToast.error(text("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNewPatient({
      name: "",
      phone: "",
      bloodType: "",
      appointmentType: "scheduled",
      appointmentDate: "",
      appointmentTime: "",
    });
    onClose();
  };

  const getAppointmentTypeLabel = (key) => {
    const types = text("appointmentTypes");
    return types?.[key] || key;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size="md"
      closeOnOverlayClick={true}
      closeOnEsc={true}>
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent
        bg="bg-card"
        backdropFilter="blur(20px)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="border-color"
        boxShadow="xl"
        p={2}
        position="relative"
        maxH="80vh"
        display="flex"
        flexDirection="column">
        <IconButton
          aria-label={text("close")}
          icon={<FiX />}
          size="sm"
          variant="ghost"
          position="absolute"
          top={3}
          right={3}
          onClick={handleClose}
          color="text-muted"
          _hover={{ bg: "bg-hover" }}
          zIndex={1}
        />

        <ModalHeader
          borderBottom="1px solid"
          borderColor="border-color"
          pb={4}
          pr={12}
          flexShrink={0}>
          <HStack spacing={3}>
            <Box
              p={2}
              bg="brand.50"
              _dark={{ bg: "brand.900" }}
              borderRadius="full">
              <Icon as={FiPlus} color="brand.500" w={6} h={6} />
            </Box>
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold" color="text-primary">
                {text("title")}
              </Text>
              <Text fontSize="sm" color="text-muted">
                {text("subtitle")}
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>

        <ModalBody
          py={6}
          overflowY="auto"
          flex="1"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "brand.200",
              borderRadius: "full",
            },
          }}>
          <VStack spacing={4} align="stretch">
            <Box
              p={3}
              borderRadius="lg"
              bg="bg-hover"
              border="1px solid"
              borderColor="border-color">
              <HStack spacing={3}>
                <Icon as={FiWatch} color="brand.500" size="16px" />
                <Box>
                  <Text fontSize="xs" color="text-muted">
                    {text("createdAt")}
                  </Text>
                  <Text fontSize="sm" fontWeight="500" color="text-primary">
                    {currentDateTime.date} {currentDateTime.time}
                  </Text>
                </Box>
              </HStack>
            </Box>

            <FormControl>
              <FormLabel fontSize="sm" color="text-muted">
                <HStack spacing={1}>
                  <Icon as={FiUser} size="12px" />
                  <Text>{text("patientName")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </HStack>
              </FormLabel>
              <Input
                placeholder={text("patientName")}
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="text-muted">
                <HStack spacing={1}>
                  <Icon as={FiPhone} size="12px" />
                  <Text>{text("phone")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </HStack>
              </FormLabel>
              <Input
                placeholder={text("phone")}
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phone: e.target.value })
                }
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="text-muted">
                <HStack spacing={1}>
                  <Icon as={FiDroplet} size="12px" />
                  <Text>{text("bloodType")}</Text>
                </HStack>
              </FormLabel>
              <Select
                placeholder={text("selectBloodType")}
                value={newPatient.bloodType}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, bloodType: e.target.value })
                }
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}>
                {Array.isArray(bloodTypes) &&
                  bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="text-muted">
                <HStack spacing={1}>
                  <Icon as={FiClock} size="12px" />
                  <Text>{text("appointmentType")}</Text>
                </HStack>
              </FormLabel>
              <Select
                value={newPatient.appointmentType}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    appointmentType: e.target.value,
                  })
                }
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}>
                {Object.keys(appointmentTypes).map((key) => (
                  <option key={key} value={key}>
                    {getAppointmentTypeLabel(key)}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="text-muted">
                <HStack spacing={1}>
                  <Icon as={FiCalendar} size="12px" />
                  <Text>{text("appointmentDate")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </HStack>
              </FormLabel>
              <Input
                type="date"
                value={newPatient.appointmentDate}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    appointmentDate: e.target.value,
                  })
                }
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="text-muted">
                <HStack spacing={1}>
                  <Icon as={FiClock} size="12px" />
                  <Text>{text("appointmentTime")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </HStack>
              </FormLabel>
              <Input
                type="time"
                value={newPatient.appointmentTime}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    appointmentTime: e.target.value,
                  })
                }
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
              />
            </FormControl>

            <Divider borderColor="border-color" />

            <Box
              p={3}
              borderRadius="lg"
              bg="error.400"
              _dark={{ bg: "error.700" }}
              border="1px solid"
              borderColor="error.200">
              <Text
                fontSize="sm"
                color="error.900"
                _dark={{ color: "error.300" }}>
                <Icon as={FiUser} mr={2} />
                {text("fillAllFields")}
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter
          borderTop="1px solid"
          borderColor="border-color"
          pt={4}
          flexShrink={0}>
          <HStack spacing={3}>
            <Button
              bg="error.600"
              _hover={{ bg: "error.500" }}
              onClick={handleClose}
              isDisabled={isSubmitting}
              size="md">
              {text("cancel")}
            </Button>
            <Button
              sx={{
                bg: "#22c55e !important",
                color: "white !important",
                _hover: {
                  bg: "#16a34a !important",
                },
                _active: {
                  bg: "#15803d !important",
                },
              }}
              leftIcon={<FiPlus />}
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText={text("add")}
              size="md">
              {text("add")}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAppointmentModal;
