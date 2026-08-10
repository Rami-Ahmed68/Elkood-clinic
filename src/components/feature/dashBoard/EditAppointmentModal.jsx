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
import useAppStore from "../../../store/store";
import helpers from "../../../utils/helpers";

const EditAppointmentModal = ({ isOpen, onClose, onEdit, patient }) => {
  const { language } = useAppStore();
  const [editedPatient, setEditedPatient] = useState({
    name: "",
    phone: "",
    bloodType: "",
    appointmentType: "scheduled",
    appointmentDate: "",
    appointmentTime: "",
    status: "upcoming",
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
        status: patient.status || "upcoming",
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
      status: "Status",
      editAppointment: "Edit Appointment",
      selectBloodType: "Select Blood Type",
      appointmentTypes: {
        scheduled: "Scheduled",
        direct: "Direct",
        emergency: "Emergency",
      },
      statusOptions: {
        upcoming: "Upcoming",
        waiting: "Waiting",
        current: "In Progress",
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
      status: "الحالة",
      editAppointment: "تعديل الحجز",
      selectBloodType: "اختر فصيلة الدم",
      appointmentTypes: {
        scheduled: "حجز مسبق",
        direct: "حجز مباشر",
        emergency: "حالة إسعافية",
      },
      statusOptions: {
        upcoming: "قادم",
        waiting: "في الانتظار",
        current: "قيد المعالجة",
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
  const statusOptions = text("statusOptions") || words.ar.statusOptions;

  const hasChanges = () => {
    if (!originalPatient) return false;

    return (
      editedPatient.name !== originalPatient.name ||
      editedPatient.phone !== originalPatient.phone ||
      editedPatient.bloodType !== originalPatient.bloodType ||
      editedPatient.appointmentType !== originalPatient.appointmentType ||
      editedPatient.appointmentDate !== originalPatient.appointmentDate ||
      editedPatient.appointmentTime !== originalPatient.appointmentTime ||
      editedPatient.status !== originalPatient.status
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
      showToast.warning("Warning", text("noChanges"));
      return;
    }

    if (!isFormValid()) {
      showToast.warning("Warning", text("fillAllFields"));
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedData = {
        name: editedPatient.name,
        phone: editedPatient.phone,
        bloodType: editedPatient.bloodType,
        appointmentType: editedPatient.appointmentType,
        appointmentDate: editedPatient.appointmentDate,
        appointmentTime: editedPatient.appointmentTime,
        status: editedPatient.status,
      };

      const updated = helpers.updateAppointment(patient.id, updatedData);

      if (updated) {
        onEdit(updated);
        showToast.success(text("success"));
        onClose();
      }
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

  const getStatusLabel = (key) => {
    const statuses = text("statusOptions");
    return statuses?.[key] || key;
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
          size="xs"
          variant="ghost"
          position="absolute"
          top={2}
          sx={language === "en" ? { right: 2 } : { left: 2 }}
          onClick={handleClose}
          color="text-muted"
          _hover={{ bg: "bg-hover" }}
          zIndex={1}
          w="24px"
          h="24px"
          minW="24px"
        />

        <ModalHeader
          borderBottom="1px solid"
          borderColor="border-color"
          pb={3}
          flexShrink={0}
          pr={8}>
          <Flex gap={2.5} align="center">
            <Box
              p={1.5}
              bg="brand.50"
              _dark={{ bg: "brand.900" }}
              borderRadius="full"
              flexShrink={0}>
              <Icon as={FiEdit} color="brand.500" w={5} h={5} />
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold" color="text-primary">
                {text("title")}
              </Text>
              <Text fontSize="xs" color="text-muted">
                {text("subtitle")}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalBody
          py={4}
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
          <VStack spacing={3} align="stretch">
            <FormControl>
              <FormLabel fontSize="xs" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiUser} boxSize={2.5} color="brand.500" />
                  <Text>{text("patientName")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="sm"
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
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiPhone} boxSize={2.5} color="brand.500" />
                  <Text>{text("phone")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="sm"
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
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiDroplet} boxSize={2.5} color="brand.500" />
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
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md">
                {Array.isArray(bloodTypes) &&
                  bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiClock} boxSize={2.5} color="purple.500" />
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
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md">
                {Object.keys(appointmentTypes).map((key) => (
                  <option key={key} value={key}>
                    {getAppointmentTypeLabel(key)}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiCalendar} boxSize={2.5} color="purple.500" />
                  <Text>{text("appointmentDate")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="sm"
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
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiClock} boxSize={2.5} color="purple.500" />
                  <Text>{text("appointmentTime")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="sm"
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
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md"
              />
            </FormControl>

            {/* ✅ حقل حالة الحجز */}
            <FormControl>
              <FormLabel fontSize="xs" color="text-muted">
                <Flex gap={1} align="center">
                  <Icon as={FiEdit} boxSize={2.5} color="purple.500" />
                  <Text>{text("status")}</Text>
                </Flex>
              </FormLabel>
              <Select
                value={editedPatient.status}
                onChange={(e) =>
                  setEditedPatient({
                    ...editedPatient,
                    status: e.target.value,
                  })
                }
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md">
                {Object.keys(statusOptions).map((key) => (
                  <option key={key} value={key}>
                    {getStatusLabel(key)}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Divider borderColor="border-color" />

            <Box
              p={2.5}
              borderRadius="lg"
              bg="blue.50"
              _dark={{ bg: "blue.900" }}
              border="1px solid"
              borderColor="blue.200">
              <Text
                fontSize="xs"
                color="blue.600"
                _dark={{ color: "blue.300" }}>
                <Icon as={FiInfo} mr={2} />
                {text("fillAllFields")}
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter
          borderTop="1px solid"
          borderColor="border-color"
          pt={3}
          pb={3}
          flexShrink={0}>
          <Flex gap={2.5}>
            <Button
              variant="outline"
              onClick={handleClose}
              isDisabled={isSubmitting}
              size="xs"
              h="28px"
              fontSize="xs"
              borderRadius="md">
              {text("cancel")}
            </Button>
            <Button
              sx={{
                bg: isSaveDisabled
                  ? "#94a3b8 !important"
                  : "#22c55e !important",
                color: "white !important",
                _hover: isSaveDisabled ? {} : { bg: "#16a34a !important" },
                cursor: isSaveDisabled ? "not-allowed" : "pointer",
                opacity: isSaveDisabled ? 0.6 : 1,
              }}
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText={text("save")}
              isDisabled={isSaveDisabled}
              size="xs"
              h="28px"
              fontSize="xs"
              borderRadius="md"
              px={4}>
              {text("save")}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAppointmentModal;
