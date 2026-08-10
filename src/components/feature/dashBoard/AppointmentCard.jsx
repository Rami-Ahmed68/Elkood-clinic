import React from "react";
import {
  Box,
  Text,
  Badge,
  Icon,
  IconButton,
  Flex,
  Tooltip,
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
  FiClock,
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
      createdAtLabel: "تاريخ الإنشاء",
      appointmentDateLabel: "موعد الحجز",
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
        date: "موعد الحجز",
        createdAt: "تاريخ إنشاء الحجز",
        bloodType: "فصيلة الدم",
        status: "الحالة",
        type: "نوع الحجز",
        delete: "حذف الحجز",
        edit: "تعديل الحجز",
        appointmentDateTime: "تاريخ ووقت الموعد",
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
      createdAtLabel: "Created At",
      appointmentDateLabel: "Appointment Date",
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
        createdAt: "Appointment Created At",
        bloodType: "Blood Type",
        status: "Status",
        type: "Appointment Type",
        delete: "Delete Appointment",
        edit: "Edit Appointment",
        appointmentDateTime: "Appointment Date & Time",
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
    let cleaned = phone.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "966" + cleaned.substring(1);
    }
    if (!cleaned.startsWith("966")) {
      cleaned = "966" + cleaned;
    }
    return cleaned;
  };

  const getWhatsAppLink = (phone) => {
    const formattedPhone = formatPhoneForWhatsApp(phone);
    return `https://wa.me/${formattedPhone}`;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString(language === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createdAt = patient?.createdAt || patient?.createdDate || null;
  const appointmentDate = patient?.appointmentDate || patient?.date || null;
  const appointmentTime = patient?.appointmentTime || null;

  const detailItems = [];

  if (patient.phone) {
    detailItems.push(
      <Tooltip key="phone" label={t.tooltips.phone} placement="top" hasArrow>
        <Link
          href={getWhatsAppLink(patient.phone)}
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}>
          <Flex gap={0.5} align="center">
            <Icon as={FiPhone} boxSize={2.5} color="whatsapp.500" />
            <Text fontSize="10px" color="whatsapp.500" fontWeight="medium">
              {patient.phone}
            </Text>
          </Flex>
        </Link>
      </Tooltip>,
    );
  }

  if (patient.bloodType) {
    detailItems.push(
      <Tooltip
        key="bloodType"
        label={t.tooltips.bloodType}
        placement="top"
        hasArrow>
        <Flex gap={0.5} align="center">
          <Icon as={FiUser} boxSize={2.5} color="text-muted" />
          <Badge
            bg="gray.100"
            color="gray.700"
            fontSize="10px"
            px={1}
            py={0.5}
            borderRadius="sm">
            {patient.bloodType}
          </Badge>
        </Flex>
      </Tooltip>,
    );
  }

  if (createdAt) {
    detailItems.push(
      <Tooltip
        key="createdAt"
        label={t.tooltips.createdAt}
        placement="top"
        hasArrow>
        <Flex gap={0.5} align="center">
          <Icon as={FiClock} boxSize={2.5} color="text-muted" />
          <Text fontSize="10px" color="text-muted" whiteSpace="nowrap">
            {formatDate(createdAt)} {formatTime(createdAt)}
          </Text>
        </Flex>
      </Tooltip>,
    );
  }

  if (appointmentDate || appointmentTime) {
    detailItems.push(
      <Tooltip
        key="appointment"
        label={t.tooltips.appointmentDateTime}
        placement="top"
        hasArrow>
        <Flex gap={0.5} align="center">
          <Icon as={FiCalendar} boxSize={2.5} color="brand.500" />
          <Text
            fontSize="10px"
            color="text-primary"
            fontWeight="500"
            whiteSpace="nowrap">
            {appointmentDate && formatDate(appointmentDate)}
            {appointmentTime && ` ${appointmentTime}`}
          </Text>
        </Flex>
      </Tooltip>,
    );
  }

  return (
    <Box
      bg="bg-card"
      p={2}
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
      w="100%">
      <Box pb={1.5} mb={1.5} borderBottom="1px solid" borderColor={borderColor}>
        <Flex justify="space-between" align="center" gap={2}>
          <Box flex="1" minW={0}>
            <Tooltip label={patient.name} placement="top" hasArrow>
              <Text
                fontWeight="semibold"
                fontSize="sm"
                color="text-primary"
                noOfLines={1}
                lineHeight="1.2">
                {patient.name}
              </Text>
            </Tooltip>
          </Box>

          {showActions && (
            <Flex flexShrink={0} direction={isRTL ? "row" : "row"}>
              <Tooltip label={t.tooltips.edit} placement="top" hasArrow>
                <IconButton
                  aria-label={t.editAppointment}
                  icon={<FiEdit size={12} />}
                  size="xs"
                  variant="ghost"
                  color={editIconColor}
                  _hover={{ bg: editIconHoverBg }}
                  onClick={() => onEdit && onEdit(patient)}
                  minW="22px"
                  h="22px"
                />
              </Tooltip>
              <Tooltip label={t.tooltips.delete} placement="top" hasArrow>
                <IconButton
                  aria-label={t.deleteAppointment}
                  icon={<FiTrash2 size={12} />}
                  size="xs"
                  variant="ghost"
                  color={deleteIconColor}
                  _hover={{ bg: deleteIconHoverBg }}
                  onClick={() => onDelete(patient.id, status)}
                  minW="22px"
                  h="22px"
                />
              </Tooltip>
            </Flex>
          )}
        </Flex>

        <Flex
          gap={0.5}
          flexWrap="wrap"
          mt={0.5}
          direction={isRTL ? "row-reverse" : "row"}>
          <Tooltip label={t.tooltips.appointmentId} placement="top" hasArrow>
            <Badge
              bg="gray.200"
              color="gray.700"
              fontSize="10px"
              px={1}
              py={0.5}
              borderRadius="sm">
              <Flex gap={0.5} align="center">
                <Icon as={FiHash} boxSize={2} />
                <Text fontSize="10px">{patient.id?.slice(0, 6)}</Text>
              </Flex>
            </Badge>
          </Tooltip>

          <Tooltip label={t.tooltips.status} placement="top" hasArrow>
            <Badge
              bg={getStatusBg(status)}
              color="white"
              fontSize="10px"
              px={1.5}
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
                px={1.5}
                py={0.5}
                borderRadius="sm">
                {getAppointmentTypeLabel(patient.appointmentType)}
              </Badge>
            </Tooltip>
          )}
        </Flex>
      </Box>

      <Flex
        gap={1.5}
        flexWrap="wrap"
        align="center"
        direction={isRTL ? "row-reverse" : "row"}
        justifyContent={isRTL ? "flex-end" : "flex-start"}>
        {detailItems.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default AppointmentCard;
