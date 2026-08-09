import {
  Box,
  VStack,
  Text,
  Icon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
  Divider,
  Avatar,
  Badge,
  IconButton,
  HStack,
  Switch,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiUserPlus,
  FiUser,
  FiClock,
  FiInfo,
  FiSettings,
  FiLogOut,
  FiMoon,
  FiSun,
  FiGlobe,
} from "react-icons/fi";
import useAppStore from "../../store/store";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    language,
    theme,
    toggleLanguage,
    toggleTheme,
    isSidebarOpen,
    closeSidebar,
    user,
  } = useAppStore();

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
    },
  };

  const menu_items = [
    { path: "/", icon: FiHome, key: "home" },
    { path: "/dashboard", icon: FiCalendar, key: "dashboard" },
    { path: "/appointments", icon: FiUsers, key: "appointments" },
    { path: "/add-appointment", icon: FiUserPlus, key: "newAppointment" },
    { path: "/patients", icon: FiUser, key: "patients" },
    { path: "/history", icon: FiClock, key: "history" },
    { path: "/about", icon: FiInfo, key: "about" },
  ];

  const SIDEBAR_BOTTOM_LINKS = [
    { path: "/profile", icon: FiUser, key: "profile" },
    { path: "/settings", icon: FiSettings, key: "settings" },
    { path: "/logout", icon: FiLogOut, key: "logout" },
  ];

  const isMobile = useBreakpointValue({ base: true, md: false });
  const t = words[language] || words.ar;

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = (path) => {
    if (path === "/logout") {
      console.log("Logout clicked");
      return;
    }
    if (isMobile) closeSidebar();
    navigate(path);
  };

  const SidebarContent = () => (
    <Box
      w="260px"
      h="100%"
      bg="bg-sidbar"
      borderLeft={!isMobile ? "1px" : "none"}
      borderColor="bodrer-color"
      py={4}
      px={3}
      overflowY="auto"
      display="flex"
      flexDirection="column">
      <VStack spacing={3} mb={6} px={2}>
        <Avatar
          size="xl"
          name={user.name}
          src={user.avatar}
          border="2px solid"
          borderColor="teal.400"
        />
        <Text fontWeight="bold" fontSize="lg" color="text-primary">
          {user.name}
        </Text>
        <Badge
          colorScheme={user.isOnline ? "green" : "gray"}
          fontSize="sm"
          px={3}
          py={1}
          borderRadius="full">
          {user.isOnline ? t.online : t.offline}
        </Badge>
      </VStack>

      <Divider mb={4} />

      <VStack align="stretch" gap={1} flex="1">
        {menu_items.map((item) => {
          const active = isActive(item.path);
          const label = t[item.key] || item.key;

          return (
            <Box
              key={item.path}
              onClick={() => handleLinkClick(item.path)}
              cursor="pointer"
              display="flex"
              alignItems="center"
              gap={3}
              px={4}
              py={3}
              borderRadius="lg"
              transition="all 0.2s"
              bg={active ? "bg-active" : "transparent"}
              fontWeight={active ? "bold" : "normal"}
              borderRight={active ? "4px solid" : "4px solid transparent"}
              borderRightColor={active ? "teal.400" : "transparent"}>
              <Icon as={item.icon} boxSize={5} />
              <Text fontSize="md">{label}</Text>
              {item.key === "appointments" && (
                <Badge ml="auto" colorScheme="red" borderRadius="full" px={2}>
                  3
                </Badge>
              )}
            </Box>
          );
        })}
      </VStack>

      <Divider my={4} />

      <VStack align="stretch" gap={1}>
        <HStack px={4} py={2} justifyContent="space-between">
          <HStack gap={3}>
            <Icon as={FiGlobe} boxSize={5} color="text-primary" />
            <Text fontSize="md" color="text-primary">
              {t.switchLanguage}
            </Text>
          </HStack>
          <IconButton
            aria-label="Toggle language"
            icon={
              <Text fontSize="sm" fontWeight="bold">
                {language === "ar" ? "EN" : "AR"}
              </Text>
            }
            onClick={toggleLanguage}
            size="sm"
            variant="ghost"
            colorScheme="teal"
          />
        </HStack>

        <HStack px={4} py={2} justifyContent="space-between">
          <HStack gap={3}>
            <Icon
              as={theme === "light" ? FiMoon : FiSun}
              boxSize={5}
              color="text-primary"
            />
            <Text fontSize="md" color="text-primary">
              {t.switchTheme}
            </Text>
          </HStack>
          <Switch
            isChecked={theme === "dark"}
            onChange={toggleTheme}
            colorScheme="teal"
            size="md"
          />
        </HStack>

        {SIDEBAR_BOTTOM_LINKS.map((item) => {
          const active = isActive(item.path);
          const label = t[item.key] || item.key;

          return (
            <Box
              key={item.path}
              onClick={() => handleLinkClick(item.path)}
              cursor="pointer"
              display="flex"
              alignItems="center"
              gap={3}
              px={4}
              py={3}
              borderRadius="lg"
              transition="all 0.2s"
              bg={active ? "bg-active" : "transparent"}
              fontWeight={active ? "bold" : "normal"}>
              <Icon as={item.icon} boxSize={5} />
              <Text fontSize="md">{label}</Text>
            </Box>
          );
        })}
      </VStack>

      <Text
        fontSize="xs"
        color="gray.400"
        textAlign="center"
        mt={4}
        pt={4}
        borderTop="1px"
        borderColor="bg-color">
        {t.version}
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
        <DrawerOverlay
          bg="blackAlpha.600"
          backdropFilter="blur(4px)"
          zIndex="overlay"
        />
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
      right={0}
      w="260px"
      h="calc(100vh - 72px)"
      bg="bg-body"
      borderLeft="1px"
      borderColor="border-color"
      zIndex={100}
      overflowY="auto"
      dir={language === "ar" ? "rtl" : "ltr"}>
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;
