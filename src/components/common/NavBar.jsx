import React from "react";
import { Box, Flex, IconButton, HStack, Text } from "@chakra-ui/react";
import { FiMenu, FiMaximize2 } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import ToggleLanguageIcon from "./ToggleLanguageIcon";
import useAppStore from "../../store/store";

const Navbar = () => {
  const { toggleSidebar } = useAppStore();

  return (
    <Box
      bg="bg-navbar"
      borderBottom="1px"
      borderColor="border-color"
      px={6}
      py={1}
      pos="sticky"
      top={0}
      zIndex={100}
      transition="all 0.3s"
      boxShadow="sm">
      <Flex justify="space-between" align="center" h="56px">
        <HStack spacing={4}>
          <IconButton
            aria-label="Toggle sidebar"
            icon={<FiMenu size={20} />}
            onClick={toggleSidebar}
            variant="ghost"
            display={{ base: "flex", md: "none" }}
            size="sm"
            color="text-secondary"
            _hover={{ bg: "bg-hover" }}
          />

          <HStack spacing={2}>
            <Box
              w="32px"
              h="32px"
              bg="brand.500"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center">
              <Text color="white" fontWeight="bold" fontSize="md">
                E
              </Text>
            </Box>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.500"
              letterSpacing="tight">
              ELKOOD
            </Text>
          </HStack>
        </HStack>

        <HStack spacing={2}>
          <ThemeToggle />

          <ToggleLanguageIcon />

          <IconButton
            aria-label="Fullscreen"
            icon={<FiMaximize2 size={18} />}
            variant="ghost"
            size="sm"
            color="text-secondary"
            _hover={{ bg: "bg-hover" }}
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                }
              }
            }}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
