// src/pages/Dash/DashBoardPage.jsx
import React, { useState } from "react";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  SimpleGrid,
  useToast,
  Badge,
  Select,
  IconButton,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { FiPlus, FiRefreshCw, FiSearch, FiX, FiFilter } from "react-icons/fi";
import useAppStore from "../../store/store";
import generateId from "../../utils/helpers";
import AppointmentCard from "../../components/feature/dashBoard/AppointmentCard";
import DashboardSkeleton from "../../components/feature/Skeleton/DashboardSkeleton";
import AddAppointmentModal from "../../components/feature/dashBoard/AddAppointmentModal";
import DeleteConfirmModal from "../../components/feature/dashBoard/DeleteConfirmModal";

const DashBoardPage = () => {
  const { language } = useAppStore();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState("all");
  const [tempTypeFilter, setTempTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [patients, setPatients] = useState({
    upcoming: [
      {
        id: generateId(),
        name: "أحمد محمد",
        phone: "0555123456",
        bloodType: "O+",
        appointmentType: "مسبق",
        date: "2026-08-10",
        status: "upcoming",
      },
      {
        id: generateId(),
        name: "سارة علي",
        phone: "0555789012",
        bloodType: "A-",
        appointmentType: "مباشر",
        date: "2026-08-10",
        status: "upcoming",
      },
      {
        id: generateId(),
        name: "خالد عبدالله",
        phone: "0555345678",
        bloodType: "B+",
        appointmentType: "مسبق",
        date: "2026-08-11",
        status: "upcoming",
      },
    ],
    waiting: [
      {
        id: generateId(),
        name: "نورة سعد",
        phone: "0555901234",
        bloodType: "AB+",
        appointmentType: "إسعافي",
        date: "2026-08-09",
        status: "waiting",
      },
      {
        id: generateId(),
        name: "فاطمة حسن",
        phone: "0555456789",
        bloodType: "A+",
        appointmentType: "مباشر",
        date: "2026-08-09",
        status: "waiting",
      },
    ],
    current: [
      {
        id: generateId(),
        name: "محمد إبراهيم",
        phone: "0555567890",
        bloodType: "A+",
        appointmentType: "مسبق",
        date: "2026-08-09",
        status: "current",
      },
    ],
  });

  const words = {
    ar: {
      title: "لوحة التحكم",
      subtitle: "إدارة الحجوزات والمرضى",
      upcoming: "القادمون",
      waiting: "في الانتظار",
      current: "قيد المعالجة",
      all: "الجميع",
      emergency: "حالة إسعافية",
      addAppointment: "حجز جديد",
      refresh: "تحديث البيانات",
      noPatients: "لا يوجد مرضى",
      total: "الإجمالي",
      searchPlaceholder: "ابحث باسم المريض...",
      clearFilter: "مسح الفلتر",
      filterByStatus: "تصفية حسب الحالة",
      filterByType: "تصفية حسب النوع",
      applyFilter: "تطبيق الفلتر",
      scheduled: "مسبق",
      direct: "مباشر",
      applyTooltip: "تطبيق الفلتر والبحث",
      clearTooltip: "مسح جميع الفلاتر",
      refreshTooltip: "تحديث البيانات",
      addTooltip: "إضافة حجز جديد",
      searchTooltip: "البحث باسم المريض",
    },
    en: {
      title: "Dashboard",
      subtitle: "Manage Appointments and Patients",
      upcoming: "Upcoming",
      waiting: "Waiting",
      current: "In Progress",
      all: "All",
      emergency: "Emergency",
      addAppointment: "New Appointment",
      refresh: "Refresh Data",
      noPatients: "No patients found",
      total: "Total",
      searchPlaceholder: "Search by patient name...",
      clearFilter: "Clear Filter",
      filterByStatus: "Filter by Status",
      filterByType: "Filter by Type",
      applyFilter: "Apply Filter",
      scheduled: "Scheduled",
      direct: "Direct",
      applyTooltip: "Apply filter and search",
      clearTooltip: "Clear all filters",
      refreshTooltip: "Refresh data",
      addTooltip: "Add new appointment",
      searchTooltip: "Search by patient name",
    },
  };

  const t = words[language] || words.ar;
  const isRTL = language === "ar";

  const statusFilterOptions = [
    { value: "all", label: t.all },
    { value: "upcoming", label: t.upcoming },
    { value: "waiting", label: t.waiting },
    { value: "current", label: t.current },
  ];

  const typeFilterOptions = [
    { value: "all", label: t.all },
    { value: "مسبق", label: t.scheduled },
    { value: "مباشر", label: t.direct },
    { value: "إسعافي", label: t.emergency },
  ];

  const getAllPatients = () => {
    return [...patients.upcoming, ...patients.waiting, ...patients.current];
  };

  const getFilteredPatients = () => {
    let allPatients = getAllPatients();

    if (selectedStatusFilter !== "all") {
      allPatients = allPatients.filter(
        (p) => p.status === selectedStatusFilter,
      );
    }

    if (selectedTypeFilter !== "all") {
      allPatients = allPatients.filter(
        (p) => p.appointmentType === selectedTypeFilter,
      );
    }

    if (searchTerm.trim()) {
      allPatients = allPatients.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
      );
    }

    return allPatients;
  };

  const handleApplyFilters = () => {
    setSearchTerm(tempSearchTerm);
    setSelectedStatusFilter(tempStatusFilter);
    setSelectedTypeFilter(tempTypeFilter);
    toast({
      title: "تم تطبيق الفلتر",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };

  const getStatusCount = (status) => {
    return patients[status]?.length || 0;
  };

  const getEmergencyCount = () => {
    return getAllPatients().filter((p) => p.appointmentType === "إسعافي")
      .length;
  };

  const handleRefresh = () => {
    toast({
      title: "تم التحديث",
      description: "تم تحديث البيانات بنجاح",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleClearFilter = () => {
    setTempStatusFilter("all");
    setTempTypeFilter("all");
    setTempSearchTerm("");
    setSelectedStatusFilter("all");
    setSelectedTypeFilter("all");
    setSearchTerm("");
    toast({
      title: "تم مسح الفلتر",
      status: "info",
      duration: 1500,
      isClosable: true,
    });
  };

  const handleMoveToCurrent = (patientId) => {
    const patient = patients.waiting.find((p) => p.id === patientId);
    if (patient) {
      setPatients((prev) => ({
        ...prev,
        waiting: prev.waiting.filter((p) => p.id !== patientId),
        current: [...prev.current, { ...patient, status: "current" }],
      }));
      toast({
        title: "تم النقل",
        description: `تم نقل ${patient.name} إلى قيد المعالجة`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = (patientId, status) => {
    const patient = patients[status]?.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setSelectedStatus(status);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedPatient && selectedStatus) {
      setPatients((prev) => ({
        ...prev,
        [selectedStatus]: prev[selectedStatus].filter(
          (p) => p.id !== selectedPatient.id,
        ),
      }));
      toast({
        title: "تم الحذف",
        description: `تم حذف حجز ${selectedPatient.name}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
      setSelectedStatus("");
    }
  };

  const handleAddPatient = (newPatient) => {
    const patient = {
      id: generateId(),
      ...newPatient,
      status: "upcoming",
    };

    setPatients((prev) => ({
      ...prev,
      upcoming: [patient, ...prev.upcoming],
    }));

    toast({
      title: "تم الإضافة",
      description: `تم إضافة ${patient.name}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const filteredPatients = getFilteredPatients();
  const totalCount = getAllPatients().length;
  const isFilterActive =
    selectedStatusFilter !== "all" ||
    selectedTypeFilter !== "all" ||
    searchTerm.trim() !== "";

  return (
    <Box w="100%" h="100%" dir={isRTL ? "rtl" : "ltr"}>
      <Box
        bg="bg-card"
        p={4}
        borderRadius="lg"
        border="1px solid"
        borderColor="border-color"
        mb={6}
        boxShadow="sm">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          gap={4}>
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="xl" fontWeight="bold" color="text-primary">
              {t.title}
            </Text>
            <Text fontSize="sm" color="text-muted">
              {t.subtitle}
            </Text>
          </VStack>

          <Tooltip label={t.addTooltip} placement="bottom" hasArrow>
            <Button
              leftIcon={<FiPlus />}
              bg="brand.500"
              color="white"
              _hover={{ bg: "brand.600" }}
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              alignSelf={{ base: "stretch", md: "flex-end" }}>
              {t.addAppointment}
            </Button>
          </Tooltip>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          gap={3}
          mt={4}
          pt={4}
          borderTop="1px solid"
          borderColor="border-color"
          flexWrap="wrap">
          <HStack spacing={1.5} flexWrap="wrap">
            <Badge
              bg="blue.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {t.upcoming}: {getStatusCount("upcoming")}
            </Badge>
            <Badge
              bg="orange.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {t.waiting}: {getStatusCount("waiting")}
            </Badge>
            <Badge
              bg="green.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {t.current}: {getStatusCount("current")}
            </Badge>
            <Badge
              bg="red.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {t.emergency}: {getEmergencyCount()}
            </Badge>
            <Badge
              bg="purple.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {t.total}: {totalCount}
            </Badge>
          </HStack>

          <HStack spacing={2} flexWrap="wrap">
            <Tooltip label={t.searchTooltip} placement="bottom" hasArrow>
              <InputGroup size="xs" w={{ base: "120px", md: "160px" }}>
                <InputLeftElement pointerEvents="none">
                  <FiSearch size={14} />
                </InputLeftElement>
                <Input
                  placeholder={t.searchPlaceholder}
                  value={tempSearchTerm}
                  onChange={(e) => setTempSearchTerm(e.target.value)}
                  borderRadius="md"
                  pl={7}
                />
              </InputGroup>
            </Tooltip>

            <Tooltip label={t.filterByStatus} placement="bottom" hasArrow>
              <Select
                size="xs"
                w={{ base: "100px", md: "130px" }}
                value={tempStatusFilter}
                onChange={(e) => setTempStatusFilter(e.target.value)}
                borderRadius="md">
                {statusFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Tooltip>

            <Tooltip label={t.filterByType} placement="bottom" hasArrow>
              <Select
                size="xs"
                w={{ base: "100px", md: "130px" }}
                value={tempTypeFilter}
                onChange={(e) => setTempTypeFilter(e.target.value)}
                borderRadius="md">
                {typeFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Tooltip>

            <Tooltip label={t.applyTooltip} placement="bottom" hasArrow>
              <Button
                size="xs"
                leftIcon={<FiFilter />}
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
                onClick={handleApplyFilters}>
                {t.applyFilter}
              </Button>
            </Tooltip>

            {isFilterActive && (
              <Tooltip label={t.clearTooltip} placement="bottom" hasArrow>
                <IconButton
                  aria-label={t.clearFilter}
                  icon={<FiX />}
                  size="xs"
                  bg="#f500009f"
                  _dark={{ bg: "#f500009f" }}
                  transition={"0.5s"}
                  _hover={{
                    bg: "red",
                    _dark: { bg: "red" },
                  }}
                  onClick={handleClearFilter}
                />
              </Tooltip>
            )}

            <Tooltip label={t.refreshTooltip} placement="bottom" hasArrow>
              <IconButton
                aria-label={t.refresh}
                icon={<FiRefreshCw />}
                size="xs"
                bg="green.500"
                color="white"
                _hover={{ bg: "green.600" }}
                onClick={handleRefresh}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <AppointmentCard
              key={patient.id}
              patient={patient}
              status={patient.status}
              onMoveToCurrent={handleMoveToCurrent}
              onDelete={handleDeleteClick}
              showActions={patient.status !== "current"}
            />
          ))
        ) : (
          <Box
            gridColumn="1 / -1"
            textAlign="center"
            py={12}
            bg="bg-card"
            borderRadius="xl"
            border="1px solid"
            borderColor="border-color">
            <Text color="text-muted" fontSize="lg">
              {t.noPatients}
            </Text>
          </Box>
        )}
      </SimpleGrid>

      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPatient}
        words={words}
        language={language}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPatient(null);
          setSelectedStatus("");
        }}
        onConfirm={handleConfirmDelete}
        patient={selectedPatient}
        words={words}
        language={language}
      />
    </Box>
  );
};

export default DashBoardPage;
