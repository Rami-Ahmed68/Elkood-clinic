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
import { FiHome, FiCalendar, FiUsers, FiInfo } from "react-icons/fi";
import useAppStore from "../../store/store";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, isSidebarOpen, closeSidebar } = useAppStore();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isRTL = language === "ar";

  const words = {
    ar: {
      appName: "عيادة ELKOOD",
      menu: "القائمة",
      home: "الرئيسية",
      dashboard: "لوحة التحكم",
      create: "الحجوزات",
      newAppointment: "إنشاء حجز",
      about: "من نحن",
      version: "الإصدار 1.0.0",
    },
    en: {
      appName: "ELKOOD Clinic",
      menu: "Menu",
      home: "Home",
      dashboard: "Dashboard",
      create: "Create Appointments",
      newAppointment: "New Appointment",
      about: "About Us",
      version: "Version 1.0.0",
    },
  };

  const t = (key) => words[language]?.[key] || words.ar[key] || key;

  const menuItems = [
    { icon: FiHome, label: "home", path: "/" },
    { icon: FiCalendar, label: "dashboard", path: "/dashboard" },
    { icon: FiUsers, label: "create", path: "/create" },
    { icon: FiInfo, label: "about", path: "/about" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
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
      flexDirection="column"
      dir={isRTL ? "rtl" : "ltr"}>
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
          ml={isRTL ? 0 : 3}
          mr={isRTL ? 3 : 0}
          letterSpacing="tight">
          {t("appName")}
        </Text>
      </Flex>

      <Divider mb={4} borderColor="border-color" />

      <Text
        fontSize="xs"
        fontWeight="semibold"
        color="text-muted"
        px={2}
        py={2}
        letterSpacing="wider">
        {t("menu")}
      </Text>

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
                mr={isRTL ? 0 : 3}
                ml={isRTL ? 3 : 0}
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
                  right={isRTL ? "auto" : 0}
                  left={isRTL ? 0 : "auto"}
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
        placement={isRTL ? "right" : "left"}
        onClose={closeSidebar}
        size="xs">
        <DrawerOverlay backdropFilter="blur(8px)" zIndex="overlay" />
        <DrawerContent zIndex="modal">
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
      right={isRTL ? 0 : "auto"}
      left={isRTL ? "auto" : 0}
      w="22%"
      h="100%"
      bg="bg-body"
      borderLeft={isRTL ? "1px" : "none"}
      borderRight={isRTL ? "none" : "1px"}
      borderColor="border-color"
      zIndex={100}
      overflowY="auto">
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;
