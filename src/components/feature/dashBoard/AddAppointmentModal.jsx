// src/components/feature/dashBoard/AddAppointmentModal.jsx
import React, { useState, useEffect, useCallback } from "react";
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
  Flex,
  Badge,
  Spinner,
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
  FiCheckCircle,
} from "react-icons/fi";
import { showToast } from "../../common/toast";
import useAppStore from "../../../store/store";
import helpers from "../../../utils/helpers";

const AddAppointmentModal = ({ isOpen, onClose, onAdd }) => {
  const { language } = useAppStore();
  const [newPatient, setNewPatient] = useState({
    name: "",
    phone: "",
    bloodType: "",
    appointmentType: "scheduled",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [isCheckingDate, setIsCheckingDate] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [appointmentsCount, setAppointmentsCount] = useState(null);
  const [dateError, setDateError] = useState("");

  const currentDateTime = helpers.getCurrentDateTime();

  const MAX_NAME_LENGTH = 50;
  const MAX_PHONE_LENGTH = 20;

  const text = useCallback(
    (key) => {
      const words = {
        en: {
          title: "New Appointment",
          subtitle: "Add a new patient appointment (Admin)",
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
          adminOnly: "Admin Only",
          charCounter: "{current}/{max} chars",
          phoneExists:
            "This phone number is already used in another appointment",
          checking: "Checking...",
          totalAppointments: "Total appointments on this date: {count}",
          noAppointments: "No appointments on this date",
          warning: "Warning",
        },
        ar: {
          title: "حجز جديد",
          subtitle: "إضافة حجز مريض جديد (لأدمن)",
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
          adminOnly: "لأدمن فقط",
          charCounter: "{current}/{max} حرف",
          phoneExists: "هذا الرقم موجود مسبقاً في حجز آخر",
          checking: "جاري التحقق...",
          totalAppointments: "إجمالي الحجوزات في هذا التاريخ: {count}",
          noAppointments: "لا توجد حجوزات في هذا التاريخ",
          warning: "تحذير",
        },
      };

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
    },
    [language],
  );

  const bloodTypes = text("bloodTypes") || [
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];
  const appointmentTypes = text("appointmentTypes") || {
    scheduled: "Scheduled",
    direct: "Direct",
    emergency: "Emergency",
  };

  useEffect(() => {
    const checkPhone = async () => {
      const phone = newPatient.phone || "";
      if (phone.length < 5) {
        setPhoneError("");
        setIsCheckingPhone(false);
        return;
      }

      setIsCheckingPhone(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const exists = helpers.hasAppointmentByPhone(phone);
        if (exists) {
          setPhoneError(text("phoneExists"));
        } else {
          setPhoneError("");
        }
      } catch (error) {
        console.error("Error checking phone:", error);
        setPhoneError("");
      } finally {
        setIsCheckingPhone(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      checkPhone();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [newPatient.phone, language, text]);

  useEffect(() => {
    const checkDate = async () => {
      if (!newPatient.appointmentDate) {
        setAppointmentsCount(null);
        setDateError("");
        setIsCheckingDate(false);
        return;
      }

      setIsCheckingDate(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const appointments = helpers.filterByDate(newPatient.appointmentDate);
        setAppointmentsCount(appointments.length);
        if (appointments.length >= 10) {
          setDateError("Maximum appointments reached for this date");
        } else {
          setDateError("");
        }
      } catch (error) {
        console.error("Error checking date:", error);
        setAppointmentsCount(null);
      } finally {
        setIsCheckingDate(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      checkDate();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [newPatient.appointmentDate]);

  const getCharCounter = (current, max) => {
    const counterText = text("charCounter")
      .replace("{current}", current)
      .replace("{max}", max);
    return counterText;
  };

  const isFormValid = () => {
    return (
      newPatient.name.trim() !== "" &&
      newPatient.phone.trim() !== "" &&
      newPatient.bloodType !== "" &&
      newPatient.appointmentDate !== "" &&
      newPatient.appointmentTime !== "" &&
      !phoneError &&
      !dateError
    );
  };

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

    if (phoneError) {
      showToast.warning(text("warning") || "Warning", text("phoneExists"));
      return;
    }

    if (dateError) {
      showToast.warning(text("warning") || "Warning", dateError);
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd(newPatient);

      showToast.success(text("success"));

      setNewPatient({
        name: "",
        phone: "",
        bloodType: "",
        appointmentType: "scheduled",
        appointmentDate: "",
        appointmentTime: "",
      });
      setPhoneError("");
      setAppointmentsCount(null);
      setDateError("");
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
    setPhoneError("");
    setAppointmentsCount(null);
    setDateError("");
    onClose();
  };

  const getAppointmentTypeLabel = (key) => {
    const types = text("appointmentTypes");
    return types?.[key] || key;
  };

  const isFormValidCheck = isFormValid() && !isSubmitting;

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
          pr={8}
          flexShrink={0}>
          <Flex gap={2.5} align="center">
            <Box
              p={1.5}
              bg="brand.50"
              _dark={{ bg: "brand.900" }}
              borderRadius="md"
              flexShrink={0}>
              <Icon as={FiPlus} color="brand.500" w={5} h={5} />
            </Box>
            <Box>
              <HStack spacing={2}>
                <Text fontSize="md" fontWeight="bold" color="text-primary">
                  {text("title")}
                </Text>
                <Badge
                  fontSize="9px"
                  px={2}
                  py={0.5}
                  borderRadius="md"
                  bg="purple.500"
                  color="white"
                  _dark={{ bg: "purple.600", color: "white" }}>
                  {text("adminOnly")}
                </Badge>
              </HStack>
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
            <Box
              p={2.5}
              borderRadius="lg"
              bg="bg-hover"
              border="1px solid"
              borderColor="border-color">
              <Flex gap={2.5} align="center">
                <Icon as={FiWatch} color="brand.500" boxSize={3.5} />
                <Box>
                  <Text fontSize="xs" color="text-muted">
                    {text("createdAt")}
                  </Text>
                  <Text fontSize="xs" fontWeight="500" color="text-primary">
                    {currentDateTime.date} {currentDateTime.time}
                  </Text>
                </Box>
              </Flex>
            </Box>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted" mb={1}>
                <Flex align="center" justify="space-between" width="100%">
                  <Flex align="center" gap={1}>
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
                  <Badge
                    fontSize="9px"
                    px={1.5}
                    py={0.5}
                    borderRadius="md"
                    bg="green.100"
                    color="green.700"
                    _dark={{ bg: "green.900", color: "green.300" }}>
                    {getCharCounter(newPatient.name.length, MAX_NAME_LENGTH)}
                  </Badge>
                </Flex>
              </FormLabel>
              <Input
                placeholder={text("patientName")}
                value={newPatient.name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= MAX_NAME_LENGTH) {
                    setNewPatient({ ...newPatient, name: value });
                  }
                }}
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="sm"
                h="32px"
                fontSize="xs"
                maxLength={MAX_NAME_LENGTH}
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted" mb={1}>
                <Flex align="center" justify="space-between" width="100%">
                  <Flex align="center" gap={1}>
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
                  <HStack align="center" spacing={1}>
                    {isCheckingPhone && <Spinner size="xs" color="brand.500" />}
                    <Badge
                      fontSize="9px"
                      px={1.5}
                      py={0.5}
                      borderRadius="md"
                      bg="green.100"
                      color="green.700"
                      _dark={{ bg: "green.900", color: "green.300" }}>
                      {getCharCounter(
                        newPatient.phone.length,
                        MAX_PHONE_LENGTH,
                      )}
                    </Badge>
                  </HStack>
                </Flex>
              </FormLabel>
              <Input
                type="number"
                placeholder={text("phone")}
                value={newPatient.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= MAX_PHONE_LENGTH) {
                    setNewPatient({ ...newPatient, phone: value });
                  }
                }}
                bg="bg-input"
                border="1px solid"
                borderColor={phoneError ? "red.500" : "border-color"}
                size="sm"
                h="32px"
                fontSize="xs"
                maxLength={MAX_PHONE_LENGTH}
                _focus={{
                  borderColor: phoneError ? "red.500" : "brand.500",
                  boxShadow: phoneError
                    ? `0 0 0 1px red.500`
                    : `0 0 0 1px brand.500`,
                }}
                borderRadius="md"
              />
              {phoneError && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  {phoneError}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted" mb={1}>
                <Flex align="center" gap={1}>
                  <Icon as={FiDroplet} boxSize={2.5} color="brand.500" />
                  <Text>{text("bloodType")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="sm"
                    fontWeight="bold">
                    *
                  </Text>
                </Flex>
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
              <FormLabel fontSize="xs" color="text-muted" mb={1}>
                <Flex align="center" gap={1}>
                  <Icon as={FiClock} boxSize={2.5} color="purple.500" />
                  <Text>{text("appointmentType")}</Text>
                  <Text
                    as="span"
                    color="red.500"
                    fontSize="sm"
                    fontWeight="bold">
                    *
                  </Text>
                </Flex>
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
              <FormLabel fontSize="xs" color="text-muted" mb={1}>
                <Flex align="center" justify="space-between" width="100%">
                  <Flex align="center" gap={1}>
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
                  <HStack align="center" spacing={1}>
                    {isCheckingDate && <Spinner size="xs" color="brand.500" />}
                    {appointmentsCount !== null && !isCheckingDate && (
                      <Badge
                        fontSize="9px"
                        px={1.5}
                        py={0.5}
                        borderRadius="md"
                        bg={appointmentsCount > 0 ? "orange.100" : "green.100"}
                        color={
                          appointmentsCount > 0 ? "orange.700" : "green.700"
                        }
                        _dark={{
                          bg:
                            appointmentsCount > 0 ? "orange.900" : "green.900",
                          color:
                            appointmentsCount > 0 ? "orange.300" : "green.300",
                        }}>
                        {appointmentsCount > 0
                          ? text("totalAppointments").replace(
                              "{count}",
                              appointmentsCount,
                            )
                          : text("noAppointments")}
                      </Badge>
                    )}
                  </HStack>
                </Flex>
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
                size="sm"
                h="32px"
                fontSize="xs"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px brand.500",
                }}
                borderRadius="md"
              />
              {dateError && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  {dateError}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted" mb={1}>
                <Flex align="center" gap={1}>
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
                <Icon as={FiCheckCircle} mr={2} />
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
              borderRadius="md"
              borderColor="border-color"
              _hover={{ bg: "bg-hover" }}>
              {text("cancel")}
            </Button>
            <Button
              sx={{
                bg: isFormValidCheck
                  ? "#22c55e !important"
                  : "#94a3b8 !important",
                color: "white !important",
                _hover: isFormValidCheck ? { bg: "#16a34a !important" } : {},
                cursor: isFormValidCheck ? "pointer" : "not-allowed",
                opacity: isFormValidCheck ? 1 : 0.7,
              }}
              leftIcon={<FiPlus size="12px" />}
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText={text("add")}
              size="xs"
              h="28px"
              fontSize="xs"
              borderRadius="md"
              px={4}
              isDisabled={!isFormValidCheck}>
              {text("add")}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAppointmentModal;
