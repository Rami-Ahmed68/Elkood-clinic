import React, { useState } from "react";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  SimpleGrid,
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
import helpers from "../../utils/helpers";
import AppointmentCard from "../../components/feature/dashBoard/AppointmentCard";
import DashboardSkeleton from "../../components/feature/Skeleton/DashboardSkeleton";
import AddAppointmentModal from "../../components/feature/dashBoard/AddAppointmentModal";
import EditAppointmentModal from "../../components/feature/dashBoard/EditAppointmentModal";
import DeleteConfirmModal from "../../components/feature/dashBoard/DeleteConfirmModal";
import showToast from "../../components/common/toast";

const DashBoardPage = () => {
  const { language } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState("all");
  const [tempTypeFilter, setTempTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedEditPatient, setSelectedEditPatient] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [patients, setPatients] = useState({
    upcoming: [
      {
        id: helpers.generateId(),
        name: "أحمد محمد",
        phone: "0555123456",
        bloodType: "O+",
        appointmentType: "مسبق",
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
          .toISOString()
          .split("T")[0],
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
          .toTimeString()
          .slice(0, 5),
        appointmentDate: "2026-08-10",
        appointmentTime: "10:30",
        status: "upcoming",
      },
      {
        id: helpers.generateId(),
        name: "سارة علي",
        phone: "0555789012",
        bloodType: "A-",
        appointmentType: "مباشر",
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 12)
          .toISOString()
          .split("T")[0],
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 12)
          .toTimeString()
          .slice(0, 5),
        appointmentDate: "2026-08-10",
        appointmentTime: "14:00",
        status: "upcoming",
      },
      {
        id: helpers.generateId(),
        name: "خالد عبدالله",
        phone: "0555345678",
        bloodType: "B+",
        appointmentType: "مسبق",
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 5)
          .toISOString()
          .split("T")[0],
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 5)
          .toTimeString()
          .slice(0, 5),
        appointmentDate: "2026-08-11",
        appointmentTime: "09:00",
        status: "upcoming",
      },
    ],
    waiting: [
      {
        id: helpers.generateId(),
        name: "نورة سعد",
        phone: "0555901234",
        bloodType: "AB+",
        appointmentType: "إسعافي",
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 3)
          .toISOString()
          .split("T")[0],
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 3)
          .toTimeString()
          .slice(0, 5),
        appointmentDate: "2026-08-09",
        appointmentTime: "11:30",
        status: "waiting",
      },
      {
        id: helpers.generateId(),
        name: "فاطمة حسن",
        phone: "0555456789",
        bloodType: "A+",
        appointmentType: "مباشر",
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24)
          .toISOString()
          .split("T")[0],
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 24)
          .toTimeString()
          .slice(0, 5),
        appointmentDate: "2026-08-09",
        appointmentTime: "15:45",
        status: "waiting",
      },
    ],
    current: [
      {
        id: helpers.generateId(),
        name: "محمد إبراهيم",
        phone: "0555567890",
        bloodType: "A+",
        appointmentType: "مسبق",
        createdDate: new Date(Date.now() - 1000 * 60 * 30)
          .toISOString()
          .split("T")[0],
        createdTime: new Date(Date.now() - 1000 * 60 * 30)
          .toTimeString()
          .slice(0, 5),
        appointmentDate: "2026-08-09",
        appointmentTime: "16:00",
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
      editSuccess: "تم التعديل",
      editSuccessDesc: (name) => `تم تعديل حجز ${name}`,
      filterApplied: "تم تطبيق الفلتر",
      filterAppliedDesc: "تم تطبيق الفلتر والبحث بنجاح",
      refreshSuccess: "تم التحديث",
      refreshSuccessDesc: "تم تحديث البيانات بنجاح",
      filterCleared: "تم مسح الفلتر",
      filterClearedDesc: "تم مسح جميع الفلاتر",
      moveSuccess: "تم النقل",
      moveSuccessDesc: (name) => `تم نقل ${name} إلى قيد المعالجة`,
      deleteSuccess: "تم الحذف",
      deleteSuccessDesc: (name) => `تم حذف حجز ${name}`,
      addSuccess: "تم الإضافة",
      addSuccessDesc: (name) => `تم إضافة ${name}`,
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
      editSuccess: "Updated",
      editSuccessDesc: (name) => `Updated appointment for ${name}`,
      filterApplied: "Filter Applied",
      filterAppliedDesc: "Filter and search applied successfully",
      refreshSuccess: "Refreshed",
      refreshSuccessDesc: "Data refreshed successfully",
      filterCleared: "Filter Cleared",
      filterClearedDesc: "All filters cleared",
      moveSuccess: "Moved",
      moveSuccessDesc: (name) => `Moved ${name} to current`,
      deleteSuccess: "Deleted",
      deleteSuccessDesc: (name) => `Deleted appointment for ${name}`,
      addSuccess: "Added",
      addSuccessDesc: (name) => `Added ${name}`,
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
    showToast.success(t.filterApplied, t.filterAppliedDesc);
  };

  const getStatusCount = (status) => {
    return patients[status]?.length || 0;
  };

  const getEmergencyCount = () => {
    return getAllPatients().filter((p) => p.appointmentType === "إسعافي")
      .length;
  };

  const handleRefresh = () => {
    showToast.success(t.refreshSuccess, t.refreshSuccessDesc);
  };

  const handleClearFilter = () => {
    setTempStatusFilter("all");
    setTempTypeFilter("all");
    setTempSearchTerm("");
    setSelectedStatusFilter("all");
    setSelectedTypeFilter("all");
    setSearchTerm("");
    showToast.info(t.filterCleared, t.filterClearedDesc);
  };

  const handleMoveToCurrent = (patientId) => {
    const patient = patients.waiting.find((p) => p.id === patientId);
    if (patient) {
      setPatients((prev) => ({
        ...prev,
        waiting: prev.waiting.filter((p) => p.id !== patientId),
        current: [...prev.current, { ...patient, status: "current" }],
      }));
      showToast.success(t.moveSuccess, t.moveSuccessDesc(patient.name));
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
      showToast.error(
        t.deleteSuccess,
        t.deleteSuccessDesc(selectedPatient.name),
      );
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
      setSelectedStatus("");
    }
  };

  const handleAddPatient = (newPatient) => {
    const now = new Date();
    const patient = {
      id: helpers.generateId(),
      ...newPatient,
      createdAt: now.toISOString(),
      createdDate: now.toISOString().split("T")[0],
      createdTime: now.toTimeString().slice(0, 5),
      status: "upcoming",
    };

    setPatients((prev) => ({
      ...prev,
      upcoming: [patient, ...prev.upcoming],
    }));

    showToast.success(t.addSuccess, t.addSuccessDesc(patient.name));
  };

  // ===== دوال التعديل =====
  const handleEditClick = (patient) => {
    setSelectedEditPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleEditPatient = (updatedPatient) => {
    // تحديث المريض في القائمة
    setPatients((prev) => {
      const newPatients = { ...prev };
      // البحث عن المريض في جميع القوائم
      for (const status of ["upcoming", "waiting", "current"]) {
        const index = newPatients[status].findIndex(
          (p) => p.id === selectedEditPatient.id,
        );
        if (index !== -1) {
          newPatients[status][index] = {
            ...newPatients[status][index],
            ...updatedPatient,
          };
          break;
        }
      }
      return newPatients;
    });

    showToast.success(t.editSuccess, t.editSuccessDesc(updatedPatient.name));
    setIsEditModalOpen(false);
    setSelectedEditPatient(null);
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
    <Box w="100%" h="100%">
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
          gap={{ base: 3, md: 6 }}
          w="100%">
          <VStack textAlign={"start"} spacing={0} flex={1}>
            <Text fontSize="xl" fontWeight="bold" color="text-primary" w="100%">
              {t.title}
            </Text>
            <Text fontSize="sm" color="text-muted" w="100%">
              {t.subtitle}
            </Text>
          </VStack>

          <Box
            alignSelf={{ base: "stretch", md: "center" }}
            display="flex"
            justifyContent={isRTL ? "flex-start" : "flex-end"}>
            <Tooltip
              label={t.addTooltip}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
              <Button
                leftIcon={isRTL ? undefined : <FiPlus />}
                rightIcon={isRTL ? <FiPlus /> : undefined}
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
                minW={{ base: "100%", md: "140px" }}
                whiteSpace="nowrap">
                {t.addAppointment}
              </Button>
            </Tooltip>
          </Box>
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
          <HStack
            spacing={1.5}
            flexWrap="wrap"
            direction={isRTL ? "row-reverse" : "row"}>
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

          <HStack
            spacing={2}
            flexWrap="wrap"
            direction={isRTL ? "row-reverse" : "row"}>
            <Tooltip
              label={t.searchTooltip}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
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
                  textAlign={isRTL ? "right" : "left"}
                />
              </InputGroup>
            </Tooltip>

            <Tooltip
              label={t.filterByStatus}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
              <Select
                size="xs"
                w={{ base: "100px", md: "130px" }}
                value={tempStatusFilter}
                onChange={(e) => setTempStatusFilter(e.target.value)}
                borderRadius="md"
                textAlign={isRTL ? "right" : "left"}>
                {statusFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Tooltip>

            <Tooltip
              label={t.filterByType}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
              <Select
                size="xs"
                w={{ base: "100px", md: "130px" }}
                value={tempTypeFilter}
                onChange={(e) => setTempTypeFilter(e.target.value)}
                borderRadius="md"
                textAlign={isRTL ? "right" : "left"}>
                {typeFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Tooltip>

            <Tooltip
              label={t.applyTooltip}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
              <Button
                size="xs"
                leftIcon={isRTL ? undefined : <FiFilter />}
                rightIcon={isRTL ? <FiFilter /> : undefined}
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
                onClick={handleApplyFilters}>
                {t.applyFilter}
              </Button>
            </Tooltip>

            {isFilterActive && (
              <Tooltip
                label={t.clearTooltip}
                placement={isRTL ? "bottom-start" : "bottom"}
                hasArrow>
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

            <Tooltip
              label={t.refreshTooltip}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
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

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={2}
        direction={isRTL ? "rtl" : "ltr"}>
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <AppointmentCard
              key={patient.id}
              patient={patient}
              status={patient.status}
              onMoveToCurrent={handleMoveToCurrent}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
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

      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEditPatient(null);
        }}
        onEdit={handleEditPatient}
        patient={selectedEditPatient}
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
