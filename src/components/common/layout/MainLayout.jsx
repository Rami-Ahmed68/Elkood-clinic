import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import SidBar from "../SidBar";

const MainLayout = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box>
      <NavBar onToggleSidBar={onToggle} />

      <Flex>
        <SidBar isOpen={isOpen} onClose={onClose} />

        <Box
          as="main"
          flex="1"
          py={6}
          px={{ base: 4, md: 6 }}
          ml={{ base: 0, md: "260px" }}
          transition="margin-left 0.3s ease"
          h="100vh">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default MainLayout;
