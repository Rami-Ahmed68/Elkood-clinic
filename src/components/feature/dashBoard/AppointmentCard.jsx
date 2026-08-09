// src/components/feature/Appointment/AppointmentCard.jsx
import React from "react";
import {
  Box,
  HStack,
  Text,
  Badge,
  Avatar,
  Divider,
  Icon,
  IconButton,
  Flex,
  Tooltip,
  Wrap,
  WrapItem,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiHash,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";
import useAppStore from "../../../store/store";

const AppointmentCard = ({
  patient,
  status,
  onMoveToCurrent,
  onDelete,
  onEdit,
  showActions = true,
}) => {
  const { language } = useAppStore();
  const isRTL = language === "ar";

  const words = {
    ar: {
      moveToCurrent: "نقل للمعالجة",
      deleteAppointment: "حذف الحجز",
      editAppointment: "تعديل الحجز",
      bloodType: "فصيلة الدم",
      appointmentId: "رقم الحجز",
      phoneLabel: "الهاتف",
      dateLabel: "التاريخ",
      status: {
        upcoming: "قادم",
        waiting: "في الانتظار",
        current: "قيد المعالجة",
      },
      appointmentTypes: {
        مسبق: "حجز مسبق",
        مباشر: "حجز مباشر",
        إسعافي: "حالة إسعافية",
      },
      tooltips: {
        appointmentId: "رقم الحجز",
        phone: "رقم الهاتف - اضغط للتواصل عبر واتساب",
        date: "تاريخ الموعد",
        bloodType: "فصيلة الدم",
        status: "الحالة",
        type: "نوع الحجز",
        delete: "حذف الحجز",
        edit: "تعديل الحجز",
      },
    },
    en: {
      moveToCurrent: "Move to Current",
      deleteAppointment: "Delete Appointment",
      editAppointment: "Edit Appointment",
      bloodType: "Blood Type",
      appointmentId: "Appointment ID",
      phoneLabel: "Phone",
      dateLabel: "Date",
      status: {
        upcoming: "Upcoming",
        waiting: "Waiting",
        current: "In Progress",
      },
      appointmentTypes: {
        مسبق: "Scheduled",
        مباشر: "Direct",
        إسعافي: "Emergency",
      },
      tooltips: {
        appointmentId: "Appointment ID",
        phone: "Phone Number - Click to contact via WhatsApp",
        date: "Appointment Date",
        bloodType: "Blood Type",
        status: "Status",
        type: "Appointment Type",
        delete: "Delete Appointment",
        edit: "Edit Appointment",
      },
    },
  };

  const t = words[language] || words.ar;

  const getStatusBg = (status) => {
    switch (status) {
      case "upcoming":
        return "blue.500";
      case "waiting":
        return "orange.500";
      case "current":
        return "green.500";
      default:
        return "gray.500";
    }
  };

  const getStatusLabel = (status) => {
    return t.status[status] || status;
  };

  const getAppointmentTypeBg = (type) => {
    switch (type) {
      case "مسبق":
        return "green.500";
      case "مباشر":
        return "blue.500";
      case "إسعافي":
        return "red.500";
      default:
        return "gray.500";
    }
  };

  const getAppointmentTypeLabel = (type) => {
    return t.appointmentTypes[type] || type;
  };

  const borderColor = useColorModeValue("border-color", "border-color");

  const editIconColor = useColorModeValue("blue.600", "blue.300");
  const editIconHoverBg = useColorModeValue("blue.50", "blue.900");

  const deleteIconColor = useColorModeValue("red.600", "red.300");
  const deleteIconHoverBg = useColorModeValue("red.50", "red.900");

  const formatPhoneForWhatsApp = (phone) => {
    // إزالة أي أحرف غير رقمية
    let cleaned = phone.replace(/[^0-9]/g, "");
    // إذا كان الرقم يبدأ بـ 0، نستبدله بـ 966 (رمز السعودية)
    if (cleaned.startsWith("0")) {
      cleaned = "966" + cleaned.substring(1);
    }
    // إذا كان الرقم لا يبدأ بـ 966، نضيفه
    if (!cleaned.startsWith("966")) {
      cleaned = "966" + cleaned;
    }
    return cleaned;
  };

  const getWhatsAppLink = (phone) => {
    const formattedPhone = formatPhoneForWhatsApp(phone);
    return `https://wa.me/${formattedPhone}`;
  };

  return (
    <Box
      bg="bg-card"
      p={3}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-1px)",
        boxShadow: "md",
        borderColor: "brand.300",
      }}
      w="100%"
      dir={isRTL ? "rtl" : "ltr"}>
      <Flex justify="space-between" align="start">
        <HStack spacing={2.5} flex="1" minW={0}>
          <Tooltip label={patient.name} placement="top" hasArrow>
            <Avatar
              size="sm"
              name={patient.name}
              bg="brand.500"
              color="white"
            />
          </Tooltip>
          <Box flex="1" minW={0}>
            <Tooltip label={patient.name} placement="top" hasArrow>
              <Text
                fontWeight="semibold"
                fontSize="sm"
                color="text-primary"
                noOfLines={1}>
                {patient.name}
              </Text>
            </Tooltip>
            <HStack spacing={1.5} flexWrap="wrap" mt={0.5}>
              <Tooltip
                label={t.tooltips.appointmentId}
                placement="top"
                hasArrow>
                <Badge
                  bg="gray.200"
                  color="gray.700"
                  fontSize="10px"
                  px={1.5}
                  py={0.5}
                  borderRadius="sm">
                  <HStack spacing={0.5}>
                    <Icon as={FiHash} boxSize={2.5} />
                    <Text fontSize="10px">{patient.id?.slice(0, 6)}</Text>
                  </HStack>
                </Badge>
              </Tooltip>

              <Tooltip label={t.tooltips.status} placement="top" hasArrow>
                <Badge
                  bg={getStatusBg(status)}
                  color="white"
                  fontSize="10px"
                  px={2}
                  py={0.5}
                  borderRadius="sm">
                  {getStatusLabel(status)}
                </Badge>
              </Tooltip>

              {patient.appointmentType && (
                <Tooltip label={t.tooltips.type} placement="top" hasArrow>
                  <Badge
                    bg={getAppointmentTypeBg(patient.appointmentType)}
                    color="white"
                    fontSize="10px"
                    px={2}
                    py={0.5}
                    borderRadius="sm">
                    {getAppointmentTypeLabel(patient.appointmentType)}
                  </Badge>
                </Tooltip>
              )}
            </HStack>
          </Box>
        </HStack>

        {showActions && (
          <HStack spacing={0.5} flexShrink={0}>
            <Tooltip label={t.tooltips.edit} placement="top" hasArrow>
              <IconButton
                aria-label={t.editAppointment}
                icon={<FiEdit size={14} />}
                size="xs"
                variant="ghost"
                color={editIconColor}
                _hover={{ bg: editIconHoverBg }}
                onClick={() => onEdit && onEdit(patient)}
              />
            </Tooltip>
            <Tooltip label={t.tooltips.delete} placement="top" hasArrow>
              <IconButton
                aria-label={t.deleteAppointment}
                icon={<FiTrash2 size={14} />}
                size="xs"
                variant="ghost"
                color={deleteIconColor}
                _hover={{ bg: deleteIconHoverBg }}
                onClick={() => onDelete(patient.id, status)}
              />
            </Tooltip>
          </HStack>
        )}
      </Flex>

      <Divider my={1.5} borderColor={borderColor} />

      <Wrap spacing={2.5} align="center">
        {patient.phone && (
          <WrapItem>
            <Tooltip label={t.tooltips.phone} placement="top" hasArrow>
              <Link
                href={getWhatsAppLink(patient.phone)}
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ textDecoration: "none" }}>
                <HStack spacing={1} cursor="pointer">
                  <Icon as={FiPhone} boxSize={3} color="whatsapp.500" />
                  <Text
                    fontSize="10px"
                    color="whatsapp.500"
                    fontWeight="medium">
                    {patient.phone}
                  </Text>
                </HStack>
              </Link>
            </Tooltip>
          </WrapItem>
        )}
        {patient.date && (
          <WrapItem>
            <Tooltip label={t.tooltips.date} placement="top" hasArrow>
              <HStack spacing={1}>
                <Icon as={FiCalendar} boxSize={3} color="text-muted" />
                <Text fontSize="10px" color="text-muted">
                  {patient.date}
                </Text>
              </HStack>
            </Tooltip>
          </WrapItem>
        )}
        {patient.bloodType && (
          <WrapItem>
            <Tooltip label={t.tooltips.bloodType} placement="top" hasArrow>
              <HStack spacing={1}>
                <Icon as={FiUser} boxSize={3} color="text-muted" />
                <Badge
                  bg="gray.100"
                  color="gray.700"
                  fontSize="10px"
                  px={1.5}
                  py={0.5}
                  borderRadius="sm">
                  {patient.bloodType}
                </Badge>
              </HStack>
            </Tooltip>
          </WrapItem>
        )}
      </Wrap>
    </Box>
  );
};

export default AppointmentCard;
