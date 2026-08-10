// src/components/feature/dashBoard/EditAppointmentModal.jsx
import React, { useState, useEffect } from "react";
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
  Icon,
  Box,
  IconButton,
  FormControl,
  FormLabel,
  Select,
  Divider,
  Flex,
} from "@chakra-ui/react";
import {
  FiX,
  FiUser,
  FiPhone,
  FiCalendar,
  FiDroplet,
  FiClock,
  FiEdit,
  FiInfo,
} from "react-icons/fi";
import { showToast } from "../../common/toast";
import useStore from "../../../store/store";

const EditAppointmentModal = ({ isOpen, onClose, onEdit, patient }) => {
  const { language } = useStore();
  const [editedPatient, setEditedPatient] = useState({
    name: "",
    phone: "",
    bloodType: "",
    appointmentType: "scheduled",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [originalPatient, setOriginalPatient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (patient) {
      const data = {
        name: patient.name || "",
        phone: patient.phone || "",
        bloodType: patient.bloodType || "",
        appointmentType: patient.appointmentType || "scheduled",
        appointmentDate: patient.appointmentDate || patient.date || "",
        appointmentTime: patient.appointmentTime || "",
      };
      setEditedPatient(data);
      setOriginalPatient(data);
    }
  }, [patient]);

  const words = {
    en: {
      title: "Edit Appointment",
      subtitle: "Update patient appointment information",
      save: "Save Changes",
      cancel: "Cancel",
      close: "Close",
      patientName: "Patient Name",
      phone: "Phone Number",
      bloodType: "Blood Type",
      appointmentType: "Appointment Type",
      appointmentDate: "Appointment Date",
      appointmentTime: "Appointment Time",
      editAppointment: "Edit Appointment",
      selectBloodType: "Select Blood Type",
      appointmentTypes: {
        scheduled: "Scheduled",
        direct: "Direct",
        emergency: "Emergency",
      },
      bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: "Required fields",
      fillAllFields: "Please fill in all required fields",
      success: "Appointment updated successfully",
      error: "Failed to update appointment",
      noChanges: "No changes to save",
    },
    ar: {
      title: "تعديل الحجز",
      subtitle: "تحديث معلومات حجز المريض",
      save: "حفظ التغييرات",
      cancel: "إلغاء",
      close: "إغلاق",
      patientName: "اسم المريض",
      phone: "رقم الهاتف",
      bloodType: "فصيلة الدم",
      appointmentType: "نوع الحجز",
      appointmentDate: "تاريخ الموعد",
      appointmentTime: "وقت الموعد",
      editAppointment: "تعديل الحجز",
      selectBloodType: "اختر فصيلة الدم",
      appointmentTypes: {
        scheduled: "حجز مسبق",
        direct: "حجز مباشر",
        emergency: "حالة إسعافية",
      },
      bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: "حقول مطلوبة",
      fillAllFields: "يرجى ملء جميع الحقول المطلوبة",
      success: "تم تحديث الحجز بنجاح",
      error: "فشل في تحديث الحجز",
      noChanges: "لا توجد تغييرات للحفظ",
    },
  };

  const text = (key) => {
    return words[language]?.[key] || words.ar[key] || key;
  };

  const bloodTypes = text("bloodTypes") || words.ar.bloodTypes;
  const appointmentTypes =
    text("appointmentTypes") || words.ar.appointmentTypes;

  const hasChanges = () => {
    if (!originalPatient) return false;

    return (
      editedPatient.name !== originalPatient.name ||
      editedPatient.phone !== originalPatient.phone ||
      editedPatient.bloodType !== originalPatient.bloodType ||
      editedPatient.appointmentType !== originalPatient.appointmentType ||
      editedPatient.appointmentDate !== originalPatient.appointmentDate ||
      editedPatient.appointmentTime !== originalPatient.appointmentTime
    );
  };

  const isFormValid = () => {
    return (
      editedPatient.name.trim() !== "" &&
      editedPatient.phone.trim() !== "" &&
      editedPatient.appointmentDate.trim() !== "" &&
      editedPatient.appointmentTime.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    if (!hasChanges()) {
      showToast.warning(text("warning") || "Warning", text("noChanges"));
      return;
    }

    if (!isFormValid()) {
      showToast.warning(text("warning") || "Warning", text("fillAllFields"));
      return;
    }

    setIsSubmitting(true);
    try {
      await onEdit(editedPatient);
      showToast.success(text("success"));
      onClose();
    } catch (error) {
      showToast.error(text("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (originalPatient) {
      setEditedPatient(originalPatient);
    }
    onClose();
  };

  const getAppointmentTypeLabel = (key) => {
    const types = text("appointmentTypes");
    return types?.[key] || key;
  };

  const isSaveDisabled = !hasChanges() || !isFormValid() || isSubmitting;

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
          sx={language === "en" ? { right: 3 } : { left: 3 }}
          onClick={handleClose}
          color="text-muted"
          _hover={{ bg: "bg-hover" }}
          zIndex={1}
        />

        <ModalHeader
          borderBottom="1px solid"
          borderColor="border-color"
          pb={4}
          flexShrink={0}>
          <Flex gap={3} align="center">
            <Box
              p={2}
              bg="brand.50"
              _dark={{ bg: "brand.900" }}
              borderRadius="full"
              flexShrink={0}>
              <Icon as={FiEdit} color="brand.500" w={6} h={6} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color="text-primary">
                {text("title")}
              </Text>
              <Text fontSize="sm" color="text-muted">
                {text("subtitle")}
              </Text>
            </Box>
          </Flex>
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
            <FormControl>
              <FormLabel fontSize="sm" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiUser} boxSize={3} />
                  <Text>{text("patientName")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </Flex>
              </FormLabel>
              <Input
                placeholder={text("patientName")}
                value={editedPatient.name}
                onChange={(e) =>
                  setEditedPatient({ ...editedPatient, name: e.target.value })
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
                <Flex gap={1} align="center">
                  <Icon as={FiPhone} boxSize={3} />
                  <Text>{text("phone")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </Flex>
              </FormLabel>
              <Input
                placeholder={text("phone")}
                value={editedPatient.phone}
                onChange={(e) =>
                  setEditedPatient({ ...editedPatient, phone: e.target.value })
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
                <Flex gap={1} align="center">
                  <Icon as={FiDroplet} boxSize={3} />
                  <Text>{text("bloodType")}</Text>
                </Flex>
              </FormLabel>
              <Select
                placeholder={text("selectBloodType")}
                value={editedPatient.bloodType}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    bloodType: e.target.value,
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
                <Flex gap={1} align="center">
                  <Icon as={FiClock} boxSize={3} />
                  <Text>{text("appointmentType")}</Text>
                </Flex>
              </FormLabel>
              <Select
                value={editedPatient.appointmentType}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
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
                <Flex gap={1} align="center">
                  <Icon as={FiCalendar} boxSize={3} />
                  <Text>{text("appointmentDate")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </Flex>
              </FormLabel>
              <Input
                type="date"
                value={editedPatient.appointmentDate}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
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
                <Flex gap={1} align="center">
                  <Icon as={FiClock} boxSize={3} />
                  <Text>{text("appointmentTime")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="md"
                    fontWeight="bold">
                    *
                  </Text>
                </Flex>
              </FormLabel>
              <Input
                type="time"
                value={editedPatient.appointmentTime}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
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
              bg="error.50"
              _dark={{ bg: "error.900" }}
              border="1px solid"
              borderColor="error.200">
              <Text
                fontSize="sm"
                color="error.600"
                _dark={{ color: "error.300" }}>
                <Icon as={FiInfo} />
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
          <Flex gap={3}>
            <Button
              variant="outline"
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
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText={text("save")}
              isDisabled={isSaveDisabled}
              size="md">
              {text("save")}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAppointmentModal;
