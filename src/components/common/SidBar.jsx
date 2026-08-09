import React from "react";
import {
  VStack,
  Icon,
  Text,
  Box,
  Flex,
  Divider,
  Badge,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiUserPlus,
  FiUser,
  FiClock,
  FiInfo,
} from "react-icons/fi";
import useAppStore from "../../store/store";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, isSidebarOpen, closeSidebar } = useAppStore();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const words = {
    ar: {
      appName: "عيادة ELKOOD",
      dashboard: "لوحة التحكم",
      appointments: "الحجوزات",
      newAppointment: "حجز جديد",
      about: "من نحن",
      home: "الرئيسية",
      patients: "المرضى",
      history: "السجل",
      profile: "الملف الشخصي",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      online: "متصل",
      offline: "غير متصل",
      version: "الإصدار 1.0.0",
      switchLanguage: "English",
      switchTheme: "الوضع المظلم",
      menu: "القائمة",
    },
    en: {
      appName: "ELKOOD Clinic",
      dashboard: "Dashboard",
      appointments: "Appointments",
      newAppointment: "New Appointment",
      about: "About Us",
      home: "Home",
      patients: "Patients",
      history: "History",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      online: "Online",
      offline: "Offline",
      version: "Version 1.0.0",
      switchLanguage: "العربية",
      switchTheme: "Dark Mode",
      menu: "Menu",
    },
  };

  const menuItems = [
    { icon: FiHome, label: "home", path: "/" },
    { icon: FiCalendar, label: "dashboard", path: "/dashboard" },
    { icon: FiUsers, label: "appointments", path: "/appointments" },
    { icon: FiUserPlus, label: "newAppointment", path: "/add-appointment" },
    { icon: FiUser, label: "patients", path: "/patients" },
    { icon: FiClock, label: "history", path: "/history" },
    { icon: FiInfo, label: "about", path: "/about" },
  ];

  const t = (key) => {
    return words[language]?.[key] || words.en[key] || key;
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    if (path === "/logout") {
      console.log("Logout clicked");
      return;
    }
    if (isMobile) closeSidebar();
    navigate(path);
  };

  const SidebarContent = () => (
    <Box
      w="100%"
      h="100%"
      px={4}
      py={4}
      bg="bg-sidbar"
      transition="all 0.3s"
      display="flex"
      flexDirection="column">
      {/* Logo Section */}
      <Flex
        align="center"
        mb={6}
        pb={4}
        borderBottom="1px"
        borderColor="border-color">
        <Box
          w="36px"
          h="36px"
          bg="brand.500"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}>
          <Text color="white" fontWeight="bold" fontSize="lg">
            E
          </Text>
        </Box>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="brand.500"
          ml={3}
          letterSpacing="tight">
          {t("appName")}
        </Text>
      </Flex>

      <Divider mb={4} borderColor="border-color" />

      {/* Menu Label */}
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color="text-muted"
        px={2}
        py={2}
        letterSpacing="wider">
        {t("menu")}
      </Text>

      {/* Main Menu */}
      <VStack spacing={1} align="stretch" flex="1">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const label = t(item.label);

          return (
            <Box
              key={item.path}
              px={3}
              py={2}
              borderRadius="md"
              cursor="pointer"
              bg={active ? "bg-active" : "transparent"}
              color={active ? "text-active" : "text-secondary"}
              _hover={{
                bg: active ? "bg-active" : "bg-hover",
              }}
              transition="all 0.2s"
              onClick={() => handleNavigation(item.path)}
              display="flex"
              alignItems="center"
              position="relative">
              <Icon
                as={item.icon}
                mr={3}
                w={4}
                h={4}
                color={active ? "brand.500" : "inherit"}
              />
              <Text fontSize="sm" fontWeight={active ? "semibold" : "medium"}>
                {label}
              </Text>
              {item.label === "appointments" && (
                <Badge ml="auto" colorScheme="red" borderRadius="full" px={2}>
                  3
                </Badge>
              )}
              {active && (
                <Box
                  position="absolute"
                  right={0}
                  w="3px"
                  h="20px"
                  bg="brand.500"
                  borderRadius="full"
                />
              )}
            </Box>
          );
        })}
      </VStack>

      <Divider my={4} borderColor="border-color" />

      <Text
        fontSize="xs"
        color="text-muted"
        textAlign="center"
        mt={4}
        pt={4}
        borderTop="1px"
        borderColor="border-color">
        {t("version")}
      </Text>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        isOpen={isSidebarOpen}
        placement="right"
        onClose={closeSidebar}
        size="xs">
        <DrawerOverlay backdropFilter="blur(8px)" zIndex="overlay" />
        <DrawerContent zIndex="modal" dir={language === "ar" ? "rtl" : "ltr"}>
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box
      position="fixed"
      top="72px"
      right={language === "ar" ? 0 : "auto"}
      left={language === "en" ? 0 : "auto"}
      w={isMobile ? "40%" : "22%"}
      h="100%"
      bg="bg-body"
      borderLeft={language === "ar" ? "1px" : "none"}
      borderRight={language === "en" ? "1px" : "none"}
      borderColor="border-color"
      zIndex={100}
      overflowY="auto"
      dir={language === "ar" ? "rtl" : "ltr"}>
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;
