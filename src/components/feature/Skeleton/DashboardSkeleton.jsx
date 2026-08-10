// src/components/feature/Skeleton/DashboardSkeleton.jsx
import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Skeleton,
  Wrap,
} from "@chakra-ui/react";

const DashboardSkeleton = () => {
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
          <VStack spacing={1} flex={1}>
            <Skeleton height="28px" width="180px" />
            <Skeleton height="16px" width="250px" />
          </VStack>

          <Box alignSelf={{ base: "stretch", md: "center" }} display="flex">
            <Skeleton height="32px" width="140px" borderRadius="md" />
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
          <HStack spacing={1.5} flexWrap="wrap">
            <Skeleton height="20px" width="80px" borderRadius="md" />
            <Skeleton height="20px" width="80px" borderRadius="md" />
            <Skeleton height="20px" width="80px" borderRadius="md" />
            <Skeleton height="20px" width="60px" borderRadius="md" />
            <Skeleton height="20px" width="60px" borderRadius="md" />
          </HStack>

          <HStack spacing={2} flexWrap="wrap">
            <Skeleton height="28px" width="150px" borderRadius="md" />
            <Skeleton height="28px" width="120px" borderRadius="md" />
            <Skeleton height="28px" width="100px" borderRadius="md" />
            <Skeleton height="28px" width="28px" borderRadius="md" />
            <Skeleton height="28px" width="28px" borderRadius="md" />
          </HStack>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Box
            key={i}
            bg="bg-card"
            p={2}
            borderRadius="md"
            border="1px solid"
            borderColor="border-color"
            boxShadow="sm">
            <Box
              pb={1.5}
              mb={1.5}
              borderBottom="1px solid"
              borderColor="border-color">
              <Flex justify="space-between" align="center" gap={2}>
                <Box flex="1" minW={0}>
                  <Skeleton height="18px" width="120px" borderRadius="sm" />
                </Box>

                <HStack spacing={1} flexShrink={0}>
                  <Skeleton width="22px" height="22px" borderRadius="md" />
                  <Skeleton width="22px" height="22px" borderRadius="md" />
                </HStack>
              </Flex>

              <HStack spacing={0.5} mt={0.5}>
                <Skeleton height="16px" width="50px" borderRadius="sm" />
                <Skeleton height="16px" width="50px" borderRadius="sm" />
                <Skeleton height="16px" width="50px" borderRadius="sm" />
              </HStack>
            </Box>

            <Wrap spacing={1.5} align="center">
              <Skeleton height="16px" width="80px" borderRadius="sm" />
              <Skeleton height="16px" width="60px" borderRadius="sm" />
              <Skeleton height="16px" width="70px" borderRadius="sm" />
            </Wrap>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default DashboardSkeleton;
