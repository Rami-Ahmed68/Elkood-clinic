import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      arial-label="TogleToggle Theme"
      icon={colorMode === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      color="text-secondary"
      _hover={{ bg: "bg-hover" }}
    />
  );
};

export default ToggleTheme;
