// src/components/feature/Appointment/AppointmentCard.jsx
import React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  Avatar,
  Divider,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiMoreVertical,
  FiUserCheck,
  FiTrash2,
  FiUser,
  FiPhone,
  FiCalendar,
} from "react-icons/fi";
import useAppStore from "../../../store/store";

const AppointmentCard = ({
  patient,
  status,
  onMoveToCurrent,
  onDelete,
  showActions = true,
}) => {
  const { language } = useAppStore();
  const isRTL = language === "ar";

  const words = {
    ar: {
      moveToCurrent: "نقل للمعالجة",
      deleteAppointment: "حذف الحجز",
      bloodType: "فصيلة الدم",
      status: {
        upcoming: "قادم",
        waiting: "في الانتظار",
        current: "قيد المعالجة",
      },
    },
    en: {
      moveToCurrent: "Move to Current",
      deleteAppointment: "Delete Appointment",
      bloodType: "Blood Type",
      status: {
        upcoming: "Upcoming",
        waiting: "Waiting",
        current: "In Progress",
      },
    },
  };

  const t = words[language] || words.ar;

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "blue";
      case "waiting":
        return "yellow";
      case "current":
        return "green";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status) => {
    return t.status[status] || status;
  };

  const getAppointmentTypeColor = (type) => {
    switch (type) {
      case "مسبق":
        return "green";
      case "مباشر":
        return "blue";
      case "إسعافي":
        return "red";
      default:
        return "gray";
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "md",
        borderColor: "brand.200",
      }}
      w="100%"
      dir={isRTL ? "rtl" : "ltr"}>
      <Flex justify="space-between" align="start">
        <HStack spacing={3} flex="1">
          <Avatar size="md" name={patient.name} bg="brand.500" color="white" />
          <Box flex="1">
            <Text fontWeight="bold" color="text-primary">
              {patient.name}
            </Text>
            <HStack spacing={2} flexWrap="wrap">
              <Badge colorScheme={getStatusColor(status)}>
                {getStatusLabel(status)}
              </Badge>
              {patient.appointmentType && (
                <Badge
                  colorScheme={getAppointmentTypeColor(
                    patient.appointmentType,
                  )}>
                  {patient.appointmentType}
                </Badge>
              )}
            </HStack>
          </Box>
        </HStack>

        {showActions && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMoreVertical />}
              variant="ghost"
              size="sm"
              aria-label="Actions"
            />
            <MenuList dir={isRTL ? "rtl" : "ltr"}>
              {status === "waiting" && (
                <MenuItem
                  icon={<FiUserCheck />}
                  onClick={() => onMoveToCurrent(patient.id)}>
                  {t.moveToCurrent}
                </MenuItem>
              )}
              <MenuItem
                icon={<FiTrash2 />}
                onClick={() => onDelete(patient.id, status)}
                color="red.500">
                {t.deleteAppointment}
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <Divider my={2} borderColor={borderColor} />

      <VStack align="stretch" spacing={1}>
        {patient.phone && (
          <HStack spacing={2}>
            <Icon as={FiPhone} boxSize={4} color="text-muted" />
            <Text fontSize="sm" color="text-muted">
              {patient.phone}
            </Text>
          </HStack>
        )}
        {patient.date && (
          <HStack spacing={2}>
            <Icon as={FiCalendar} boxSize={4} color="text-muted" />
            <Text fontSize="sm" color="text-muted">
              {patient.date}
            </Text>
          </HStack>
        )}
        {patient.bloodType && (
          <HStack spacing={2}>
            <Icon as={FiUser} boxSize={4} color="text-muted" />
            <Text fontSize="sm" color="text-muted">
              {t.bloodType}: <Badge>{patient.bloodType}</Badge>
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default AppointmentCard;
