// src/components/common/layout/MainLayout.jsx
import {
  Box,
  Flex,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "../NavBar";
import SidBar from "../SidBar";
import useAppStore from "../../../store/store";

const MainLayout = ({ children }) => {
  const { language } = useAppStore();
  const isRTL = language === "ar";
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" minH="100vh">
      <NavBar />

      <Grid
        flex="1"
        templateColumns={isMobile ? "1fr" : "22% 1fr"}
        minH="calc(100vh - 72px)"
        bg="bg-body">
        {!isMobile && (
          <GridItem
            as="aside"
            position="sticky"
            top="72px"
            h="calc(100vh - 72px)"
            bg="bg-sidebar"
            borderRight={!isRTL ? "1px solid" : "none"}
            borderLeft={isRTL ? "1px solid" : "none"}
            borderColor="border-color"
            overflowY="auto"
            minW="200px"
            maxW="280px">
            <SidBar />
          </GridItem>
        )}

        {isMobile && <SidBar />}

        <GridItem
          as="main"
          p={{ base: 2, md: 4 }}
          bg="bg-body"
          overflowY="auto"
          overflowX="hidden"
          minH="calc(100vh - 72px)">
          <Box maxW="100%" overflowX="hidden">
            {children}
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default MainLayout;
