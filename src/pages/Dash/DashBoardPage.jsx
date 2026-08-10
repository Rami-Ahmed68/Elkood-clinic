import React, { useState, useEffect } from "react";
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
  Spinner,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
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
  const [patients, setPatients] = useState({
    upcoming: [],
    waiting: [],
    current: [],
  });

  const withLoading = async (callback, setLoading, duration = 800) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, duration));
    try {
      await callback();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const allAppointments = helpers.getAppointments();

      setPatients({
        upcoming: allAppointments.filter((p) => p.status === "upcoming"),
        waiting: allAppointments.filter((p) => p.status === "waiting"),
        current: allAppointments.filter((p) => p.status === "current"),
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

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

  const text = (key) => {
    return words[language]?.[key] || words.ar[key] || key;
  };

  const isRTL = language === "ar";

  const statusFilterOptions = [
    { value: "all", label: text("all") },
    { value: "upcoming", label: text("upcoming") },
    { value: "waiting", label: text("waiting") },
    { value: "current", label: text("current") },
  ];

  const typeFilterOptions = [
    { value: "all", label: text("all") },
    { value: "scheduled", label: text("scheduled") },
    { value: "direct", label: text("direct") },
    { value: "emergency", label: text("emergency") },
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

  const handleApplyFilters = async () => {
    await withLoading(
      async () => {
        const filtered = helpers.filterAppointments({
          status: tempStatusFilter === "all" ? undefined : tempStatusFilter,
          type: tempTypeFilter === "all" ? undefined : tempTypeFilter,
          name: tempSearchTerm || undefined,
        });

        setSearchTerm(tempSearchTerm);
        setSelectedStatusFilter(tempStatusFilter);
        setSelectedTypeFilter(tempTypeFilter);

        setPatients({
          upcoming: filtered.filter((p) => p.status === "upcoming"),
          waiting: filtered.filter((p) => p.status === "waiting"),
          current: filtered.filter((p) => p.status === "current"),
        });

        showToast.success(text("filterApplied"), text("filterAppliedDesc"));
      },
      setIsFiltering,
      600,
    );
  };

  const getStatusCount = (status) => {
    return patients[status]?.length || 0;
  };

  const getEmergencyCount = () => {
    return getAllPatients().filter((p) => p.appointmentType === "emergency")
      .length;
  };

  const handleRefresh = async () => {
    setPatients({
      upcoming: [],
      waiting: [],
      current: [],
    });
    await withLoading(
      async () => {
        const allAppointments = helpers.getAppointments();
        setPatients({
          upcoming: allAppointments.filter((p) => p.status === "upcoming"),
          waiting: allAppointments.filter((p) => p.status === "waiting"),
          current: allAppointments.filter((p) => p.status === "current"),
        });
        showToast.success(text("refreshSuccess"), text("refreshSuccessDesc"));
      },
      setIsRefreshing,
      700,
    );
  };

  const handleClearFilter = async () => {
    await withLoading(
      async () => {
        setTempStatusFilter("all");
        setTempTypeFilter("all");
        setTempSearchTerm("");
        setSelectedStatusFilter("all");
        setSelectedTypeFilter("all");
        setSearchTerm("");

        const allAppointments = helpers.getAppointments();
        setPatients({
          upcoming: allAppointments.filter((p) => p.status === "upcoming"),
          waiting: allAppointments.filter((p) => p.status === "waiting"),
          current: allAppointments.filter((p) => p.status === "current"),
        });

        showToast.info(text("filterCleared"), text("filterClearedDesc"));
      },
      setIsClearing,
      500,
    );
  };

  const handleMoveToCurrent = (patientId) => {
    const updated = helpers.moveToCurrent(patientId);

    if (updated) {
      const allAppointments = helpers.getAppointments();
      setPatients({
        upcoming: allAppointments.filter((p) => p.status === "upcoming"),
        waiting: allAppointments.filter((p) => p.status === "waiting"),
        current: allAppointments.filter((p) => p.status === "current"),
      });
      showToast.success(
        text("moveSuccess"),
        text("moveSuccessDesc")(updated.name),
      );
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
      const deleted = helpers.deleteAppointment(selectedPatient.id);

      if (deleted) {
        const allAppointments = helpers.getAppointments();
        setPatients({
          upcoming: allAppointments.filter((p) => p.status === "upcoming"),
          waiting: allAppointments.filter((p) => p.status === "waiting"),
          current: allAppointments.filter((p) => p.status === "current"),
        });

        showToast.error(
          text("deleteSuccess"),
          text("deleteSuccessDesc")(selectedPatient.name),
        );
      }

      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
      setSelectedStatus("");
    }
  };

  const handleAddPatient = (newPatient) => {
    const appointmentData = {
      name: newPatient.name,
      phone: newPatient.phone,
      bloodType: newPatient.bloodType,
      appointmentType: newPatient.appointmentType,
      appointmentDate: newPatient.appointmentDate,
      appointmentTime: newPatient.appointmentTime,
      status: "upcoming",
    };

    const created = helpers.createAppointment(appointmentData, "admin");

    setPatients((prev) => ({
      ...prev,
      upcoming: [created, ...prev.upcoming],
    }));

    showToast.success(text("addSuccess"), text("addSuccessDesc")(created.name));
  };

  const handleEditClick = (patient) => {
    setSelectedEditPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleEditPatient = (updatedPatient) => {
    const updated = helpers.updateAppointment(
      selectedEditPatient.id,
      updatedPatient,
    );

    if (updated) {
      const allAppointments = helpers.getAppointments();
      setPatients({
        upcoming: allAppointments.filter((p) => p.status === "upcoming"),
        waiting: allAppointments.filter((p) => p.status === "waiting"),
        current: allAppointments.filter((p) => p.status === "current"),
      });

      showToast.success(
        text("editSuccess"),
        text("editSuccessDesc")(updated.name),
      );
      setIsEditModalOpen(false);
      setSelectedEditPatient(null);
    }
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
              {text("title")}
            </Text>
            <Text fontSize="sm" color="text-muted" w="100%">
              {text("subtitle")}
            </Text>
          </VStack>

          <Box
            alignSelf={{ base: "stretch", md: "center" }}
            display="flex"
            justifyContent={isRTL ? "flex-start" : "flex-end"}>
            <Tooltip
              label={text("addTooltip")}
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
                {text("addAppointment")}
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
              {text("upcoming")}: {getStatusCount("upcoming")}
            </Badge>
            <Badge
              bg="orange.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {text("waiting")}: {getStatusCount("waiting")}
            </Badge>
            <Badge
              bg="green.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {text("current")}: {getStatusCount("current")}
            </Badge>
            <Badge
              bg="red.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {text("emergency")}: {getEmergencyCount()}
            </Badge>
            <Badge
              bg="purple.600"
              color="white"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="md"
              boxShadow="sm">
              {text("total")}: {totalCount}
            </Badge>
          </HStack>

          <HStack
            spacing={2}
            flexWrap="wrap"
            direction={isRTL ? "row-reverse" : "row"}>
            <Tooltip
              label={text("searchTooltip")}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
              <InputGroup size="xs" w={{ base: "120px", md: "160px" }}>
                <InputLeftElement pointerEvents="none">
                  <FiSearch size={14} />
                </InputLeftElement>
                <Input
                  placeholder={text("searchPlaceholder")}
                  value={tempSearchTerm}
                  onChange={(e) => setTempSearchTerm(e.target.value)}
                  borderRadius="md"
                  pl={7}
                  textAlign={isRTL ? "right" : "left"}
                />
              </InputGroup>
            </Tooltip>

            <Tooltip
              label={text("filterByStatus")}
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
              label={text("filterByType")}
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
              label={text("applyTooltip")}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
              <Button
                size="xs"
                leftIcon={isRTL ? undefined : <FiFilter />}
                rightIcon={isRTL ? <FiFilter /> : undefined}
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600" }}
                onClick={handleApplyFilters}
                isLoading={isFiltering}
                loadingText="..."
                minW="70px"
                isDisabled={isFiltering}>
                {text("applyFilter")}
              </Button>
            </Tooltip>

            {isFilterActive && (
              <Tooltip
                label={text("clearTooltip")}
                placement={isRTL ? "bottom-start" : "bottom"}
                hasArrow>
                <IconButton
                  aria-label={text("clearFilter")}
                  icon={isClearing ? <Spinner size="xs" /> : <FiX />}
                  size="xs"
                  bg="#f500009f"
                  _dark={{ bg: "#f500009f" }}
                  transition={"0.5s"}
                  _hover={{
                    bg: "red",
                    _dark: { bg: "red" },
                  }}
                  onClick={handleClearFilter}
                  isDisabled={isClearing}
                />
              </Tooltip>
            )}

            <Tooltip
              label={text("refreshTooltip")}
              placement={isRTL ? "bottom-start" : "bottom"}
              hasArrow>
              <IconButton
                aria-label={text("refresh")}
                icon={isRefreshing ? <Spinner size="xs" /> : <FiRefreshCw />}
                size="xs"
                bg="green.500"
                color="white"
                _hover={{ bg: "green.600" }}
                onClick={handleRefresh}
                isDisabled={isRefreshing}
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
              isAdmin={true}
              onMoveToCurrent={handleMoveToCurrent}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
              showActions={true}
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
              {text("noPatients")}
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
