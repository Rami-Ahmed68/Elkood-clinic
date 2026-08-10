import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Divider,
  Icon,
  useTheme,
  Badge,
  Spinner,
  Tooltip,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiClock,
  FiDroplet,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import useAppStore from "../../store/store";
import showToast from "../../components/common/toast";
import CreateAppointmentSkeleton from "../../components/feature/createAppointment/CreateAppointmentSkeleton";
import helpers from "../../utils/helpers";

const CreateAppointmentPage = () => {
  const { language } = useAppStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingDate, setIsCheckingDate] = useState(false);
  const [isPhoneChecking, setIsPhoneChecking] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [appointmentsCount, setAppointmentsCount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodType: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const lastCheckedPhone = useRef("");

  const text = useCallback(
    (key) => {
      const words = {
        ar: {
          title: "إنشاء حجز جديد",
          subtitle: "قم بإنشاء حجز جديد في العيادة",
          description: "أدخل بيانات المريض لتسجيل حجز جديد في النظام",
          create: "إنشاء حجز",
          cancel: "إلغاء",
          patientName: "اسم المريض",
          phone: "رقم الهاتف",
          bloodType: "فصيلة الدم",
          appointmentDate: "تاريخ الموعد",
          appointmentTime: "وقت الموعد",
          selectBloodType: "اختر فصيلة الدم",
          fillAllFields: "يرجى ملء جميع الحقول المطلوبة",
          success: "تم إنشاء الحجز بنجاح",
          error: "فشل في إنشاء الحجز",
          scheduled: "حجز مسبق",
          bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          creating: "جاري الإنشاء...",
          totalAppointments: "إجمالي الحجوزات",
          noAppointments: "لا توجد حجوزات",
          nameRequired: "يرجى إدخال اسم المريض",
          phoneRequired: "يرجى إدخال رقم الهاتف",
          dateRequired: "يرجى اختيار تاريخ الموعد",
          timeRequired: "يرجى اختيار وقت الموعد",
          bloodTypeRequired: "يرجى اختيار فصيلة الدم",
          checking: "جاري التحقق...",
          charCounter: "/ {max} حرف",
          charCounterTooltip: "عدد الأحرف المستخدمة من أصل {max} حرف",
          patientInfo: "معلومات المريض",
          appointmentDetails: "تفاصيل الحجز",
          required: "مطلوب",
          phoneExists: "هذا الرقم موجود مسبقاً في حجز آخر",
        },
        en: {
          title: "Create New Appointment",
          subtitle: "Create a new appointment at the clinic",
          description:
            "Enter patient details to register a new appointment in the system",
          create: "Create Appointment",
          cancel: "Cancel",
          patientName: "Patient Name",
          phone: "Phone Number",
          bloodType: "Blood Type",
          appointmentDate: "Appointment Date",
          appointmentTime: "Appointment Time",
          selectBloodType: "Select Blood Type",
          fillAllFields: "Please fill in all required fields",
          success: "Appointment created successfully",
          error: "Failed to create appointment",
          scheduled: "Scheduled",
          bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          creating: "Creating...",
          totalAppointments: "Total Appointments",
          noAppointments: "No appointments",
          nameRequired: "Please enter patient name",
          phoneRequired: "Please enter phone number",
          dateRequired: "Please select appointment date",
          timeRequired: "Please select appointment time",
          bloodTypeRequired: "Please select blood type",
          checking: "Checking...",
          charCounter: "/ {max} chars",
          charCounterTooltip: "{current} characters used out of {max}",
          patientInfo: "Patient Information",
          appointmentDetails: "Appointment Details",
          required: "Required",
          phoneExists:
            "This phone number is already used in another appointment",
        },
      };

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

  const MAX_NAME_LENGTH = 50;
  const MAX_PHONE_LENGTH = 11;

  const getPhoneErrorMessage = useCallback(() => {
    return text("phoneExists");
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkAppointmentsCount = async () => {
      if (!formData.appointmentDate) {
        setAppointmentsCount(null);
        return;
      }

      setIsCheckingDate(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const appointments = helpers.filterByDate(formData.appointmentDate);
        setAppointmentsCount(appointments.length);
      } catch (error) {
        console.error("Error checking appointments:", error);
        setAppointmentsCount(null);
      } finally {
        setIsCheckingDate(false);
      }
    };

    checkAppointmentsCount();
  }, [formData.appointmentDate]);

  useEffect(() => {
    const checkPhone = async () => {
      const phone = formData.phone || "";

      if (phone.length < 5) {
        setPhoneError("");
        setIsPhoneChecking(false);
        lastCheckedPhone.current = phone;
        return;
      }

      if (lastCheckedPhone.current === phone) {
        return;
      }

      setIsPhoneChecking(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const exists = helpers.hasAppointmentByPhone(phone);
        if (exists) {
          setPhoneError(getPhoneErrorMessage());
        } else {
          setPhoneError("");
        }
        lastCheckedPhone.current = phone;
      } catch (error) {
        console.error("Error checking phone:", error);
        setPhoneError("");
      } finally {
        setIsPhoneChecking(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      checkPhone();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [formData.phone, language, getPhoneErrorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > MAX_NAME_LENGTH) return;
    if (name === "phone" && value.length > MAX_PHONE_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete = () => {
    return (
      formData.name.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.bloodType !== "" &&
      formData.appointmentDate !== "" &&
      formData.appointmentTime !== ""
    );
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast.warning("Warning", text("nameRequired"));
      return false;
    }
    if (!formData.phone.trim()) {
      showToast.warning("Warning", text("phoneRequired"));
      return false;
    }
    if (helpers.hasAppointmentByPhone(formData.phone)) {
      showToast.warning("Warning", getPhoneErrorMessage());
      return false;
    }
    if (!formData.bloodType) {
      showToast.warning("Warning", text("bloodTypeRequired"));
      return false;
    }
    if (!formData.appointmentDate) {
      showToast.warning("Warning", text("dateRequired"));
      return false;
    }
    if (!formData.appointmentTime) {
      showToast.warning("Warning", text("timeRequired"));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const appointmentData = {
        name: formData.name,
        phone: formData.phone,
        bloodType: formData.bloodType,
        appointmentType: "scheduled",
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        status: "upcoming",
      };

      const created = helpers.createAppointment(appointmentData, "user");

      showToast.success(text("success"), `تم إنشاء حجز لـ ${created.name}`);

      setFormData({
        name: "",
        phone: "",
        bloodType: "",
        appointmentDate: "",
        appointmentTime: "",
      });
      setAppointmentsCount(null);
      lastCheckedPhone.current = "";

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      showToast.error(text("error"), "حدث خطأ أثناء إنشاء الحجز");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <CreateAppointmentSkeleton />;
  }

  const getCountBadgeProps = () => {
    if (appointmentsCount === null) {
      return { colorScheme: "gray", label: "0" };
    }
    if (appointmentsCount === 0) {
      return { colorScheme: "green", label: "0" };
    }
    if (appointmentsCount > 0) {
      return { colorScheme: "orange", label: appointmentsCount.toString() };
    }
    return { colorScheme: "gray", label: "0" };
  };

  const countBadge = getCountBadgeProps();

  const getCharCounter = (current, max) => {
    const counterText = text("charCounter").replace("{max}", max);
    return `${current} ${counterText}`;
  };

  const getTooltipLabel = (current, max) => {
    const tooltipText = text("charCounterTooltip")
      .replace("{current}", current)
      .replace("{max}", max);
    return tooltipText;
  };

  const isFormValid = isFormComplete() && !isSubmitting && !phoneError;

  return (
    <Box w="100%" mx="auto" p={4}>
      <Box mb={6} pb={3} borderBottom="2px solid" borderColor="brand.200">
        <Flex align="center" gap={3} mb={1}>
          <Box
            p={2}
            bg="brand.500"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Icon as={FiCalendar} color="white" boxSize={5} />
          </Box>
          <Box>
            <Heading
              size="lg"
              color="text-primary"
              fontWeight="bold"
              letterSpacing="tight">
              {text("title")}
            </Heading>
            <Text color="text-secondary" fontSize="sm" mt={0.5}>
              {text("description")}
            </Text>
          </Box>
        </Flex>
        <HStack spacing={2} mt={2} flexWrap="wrap">
          <Badge
            bg="brand.500"
            color="white"
            fontSize="xs"
            px={2}
            py={0.5}
            borderRadius="md">
            {text("patientInfo")}
          </Badge>
          <Badge
            bg="purple.500"
            color="white"
            fontSize="xs"
            px={2}
            py={0.5}
            borderRadius="md">
            {text("appointmentDetails")}
          </Badge>
          <Badge
            bg="red.500"
            color="white"
            fontSize="xs"
            px={2}
            py={0.5}
            borderRadius="md">
            {text("required")}
          </Badge>
        </HStack>
      </Box>

      <Box>
        <VStack spacing={5} align="stretch">
          <Flex
            p={2.5}
            borderRadius="lg"
            bg="brand.200"
            borderColor="brand.600"
            _dark={{ bg: "brand.700", borderColor: "brand.200" }}
            border="1px solid"
            align="center"
            gap={2.5}>
            <Box
              p={1.5}
              bg="brand.500"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center">
              <Icon as={FiUser} color="white" boxSize={3.5} />
            </Box>
            <Text fontSize="xs" color="text-primary" fontWeight="600">
              {text("patientInfo")}
            </Text>
          </Flex>

          <Divider borderColor="border-color" />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <FormControl>
              <Flex justify="space-between" align="center" mb={0.5}>
                <FormLabel fontSize="xs" color="text-muted" mb={0}>
                  <HStack spacing={1}>
                    <Icon as={FiUser} boxSize={2.5} color="brand.500" />
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
                <Tooltip
                  label={getTooltipLabel(formData.name.length, MAX_NAME_LENGTH)}
                  placement="top"
                  hasArrow>
                  <Badge
                    fontSize="9px"
                    px={1.5}
                    py={0.5}
                    borderRadius="md"
                    bg="green.500"
                    color="white"
                    transition="all 0.3s ease">
                    {getCharCounter(formData.name.length, MAX_NAME_LENGTH)}
                  </Badge>
                </Tooltip>
              </Flex>
              <Input
                name="name"
                placeholder={text("patientName")}
                value={formData.name}
                onChange={handleChange}
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="sm"
                h="32px"
                fontSize="xs"
                maxLength={MAX_NAME_LENGTH}
                borderRadius="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: `0 0 0 1px ${theme.colors.brand[500]}`,
                }}
                _hover={{ borderColor: "brand.300" }}
                transition="all 0.2s"
              />
            </FormControl>

            <FormControl>
              <Flex justify="space-between" align="center" mb={0.5}>
                <FormLabel fontSize="xs" color="text-muted" mb={0}>
                  <HStack spacing={1}>
                    <Icon as={FiPhone} boxSize={2.5} color="brand.500" />
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
                <HStack spacing={1}>
                  {isPhoneChecking ? (
                    <Spinner size="xs" color="brand.500" />
                  ) : (
                    <Tooltip
                      label={getTooltipLabel(
                        formData.phone.length,
                        MAX_PHONE_LENGTH,
                      )}
                      placement="top"
                      hasArrow>
                      <Badge
                        fontSize="9px"
                        px={1.5}
                        py={0.5}
                        borderRadius="md"
                        bg="green.500"
                        color="white"
                        transition="all 0.3s ease">
                        {getCharCounter(
                          formData.phone.length,
                          MAX_PHONE_LENGTH,
                        )}
                      </Badge>
                    </Tooltip>
                  )}
                </HStack>
              </Flex>
              <Input
                type="number"
                name="phone"
                placeholder={text("phone")}
                value={formData.phone}
                onChange={handleChange}
                bg="bg-input"
                border="1px solid"
                borderColor={phoneError ? "red.500" : "border-color"}
                size="sm"
                h="32px"
                fontSize="xs"
                maxLength={MAX_PHONE_LENGTH}
                borderRadius="md"
                _focus={{
                  borderColor: phoneError ? "red.500" : "brand.500",
                  boxShadow: phoneError
                    ? `0 0 0 1px ${theme.colors.red[500]}`
                    : `0 0 0 1px ${theme.colors.brand[500]}`,
                }}
                _hover={{ borderColor: phoneError ? "red.500" : "brand.300" }}
                transition="all 0.2s"
              />
              {phoneError && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  {phoneError}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Flex justify="space-between" align="center" mb={0.5}>
                <FormLabel fontSize="xs" color="text-muted" mb={0}>
                  <HStack spacing={1}>
                    <Icon as={FiDroplet} boxSize={2.5} color="brand.500" />
                    <Text>{text("bloodType")}</Text>
                    <Text
                      as="span"
                      color="red.500"
                      fontSize="md"
                      fontWeight="bold">
                      *
                    </Text>
                  </HStack>
                </FormLabel>
              </Flex>
              <Select
                name="bloodType"
                placeholder={text("selectBloodType")}
                value={formData.bloodType}
                onChange={handleChange}
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="sm"
                h="32px"
                fontSize="xs"
                borderRadius="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: `0 0 0 1px ${theme.colors.brand[500]}`,
                }}
                _hover={{ borderColor: "brand.300" }}
                transition="all 0.2s">
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Flex
                justify="space-between"
                align="center"
                mb={0.5}
                flexWrap="wrap"
                gap={1}>
                <FormLabel fontSize="xs" color="text-muted" mb={0}>
                  <HStack spacing={1}>
                    <Icon as={FiCalendar} boxSize={2.5} color="purple.500" />
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
                <HStack spacing={1}>
                  {formData.appointmentDate && (
                    <>
                      <Badge
                        colorScheme={countBadge.colorScheme}
                        fontSize="9px"
                        px={1.5}
                        py={0.5}
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        gap={1}>
                        {isCheckingDate ? (
                          <Spinner size="xs" />
                        ) : (
                          <>
                            <Icon as={FiCalendar} boxSize={2} />
                            {countBadge.label}
                          </>
                        )}
                      </Badge>

                      {!isCheckingDate && appointmentsCount === 0 && (
                        <Badge
                          fontSize="9px"
                          px={1.5}
                          py={0.5}
                          borderRadius="md"
                          bg="green.100"
                          color="green.600">
                          {text("noAppointments")}
                        </Badge>
                      )}

                      {!isCheckingDate && appointmentsCount > 0 && (
                        <Badge
                          fontSize="9px"
                          px={1.5}
                          py={0.5}
                          borderRadius="md"
                          bg="orange.100"
                          color="orange.600">
                          {text("totalAppointments")}: {appointmentsCount}
                        </Badge>
                      )}
                    </>
                  )}
                </HStack>
              </Flex>
              <Input
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleChange}
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="sm"
                h="32px"
                fontSize="xs"
                borderRadius="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: `0 0 0 1px ${theme.colors.brand[500]}`,
                }}
                _hover={{ borderColor: "brand.300" }}
                transition="all 0.2s"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" color="text-muted" mb={0.5}>
                <HStack spacing={1}>
                  <Icon as={FiClock} boxSize={2.5} color="purple.500" />
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
                name="appointmentTime"
                type="time"
                value={formData.appointmentTime}
                onChange={handleChange}
                bg="bg-input"
                border="1px solid"
                borderColor="border-color"
                size="sm"
                h="32px"
                fontSize="xs"
                borderRadius="md"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: `0 0 0 1px ${theme.colors.brand[500]}`,
                }}
                _hover={{ borderColor: "brand.300" }}
                transition="all 0.2s"
              />
            </FormControl>
          </SimpleGrid>

          <Divider borderColor="border-color" />

          <Flex
            p={2.5}
            borderRadius="lg"
            border="1px solid"
            bg="red.200"
            borderColor="red.600"
            _dark={{ bg: "red.700", borderColor: "red.200" }}
            align="center"
            gap={2}>
            <Box
              p={1}
              bg="red.500"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center">
              <Icon as={FiAlertCircle} color="white" boxSize={3} />
            </Box>
            <Text fontSize="xs" fontWeight="500" color="text-primary">
              {text("fillAllFields")}
            </Text>
          </Flex>

          <HStack spacing={2} justifyContent="flex-end" pt={1}>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              isDisabled={isSubmitting}
              size="xs"
              h="28px"
              fontSize="xs"
              borderRadius="md"
              borderColor="border-color"
              bg="red.500"
              color="white"
              _hover={{
                transform: "scale(0.95)",
              }}
              transition="all 0.2s">
              {text("cancel")}
            </Button>
            <Button
              sx={{
                bg: isFormValid ? "#22c55e !important" : "#94a3b8 !important",
                color: "white !important",
                _hover: isFormValid ? { bg: "#16a34a !important" } : {},
                cursor: isFormValid ? "pointer" : "not-allowed",
                opacity: isFormValid ? 1 : 0.7,
              }}
              leftIcon={isFormValid ? <FiCheckCircle /> : undefined}
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText={text("creating")}
              size="xs"
              h="28px"
              fontSize="xs"
              borderRadius="md"
              px={4}
              isDisabled={!isFormValid}>
              {text("create")}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateAppointmentPage;
