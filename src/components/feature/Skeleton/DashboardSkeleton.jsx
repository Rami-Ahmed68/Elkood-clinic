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
          gap={4}>
          <VStack align="flex-start" spacing={1}>
            <Skeleton height="28px" width="180px" />
            <Skeleton height="16px" width="250px" />
          </VStack>

          <Skeleton
            height="32px"
            width="130px"
            borderRadius="md"
            alignSelf={{ base: "stretch", md: "flex-end" }}
          />
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
            p={3}
            borderRadius="md"
            border="1px solid"
            borderColor="border-color"
            boxShadow="sm">
            <Flex justify="space-between" align="start">
              <HStack spacing={2.5} flex="1" minW={0}>
                <Skeleton
                  width="32px"
                  height="32px"
                  borderRadius="full"
                  flexShrink={0}
                />
                <Box flex="1" minW={0}>
                  <Skeleton height="16px" width="120px" mb={1.5} />
                  <HStack spacing={1.5}>
                    <Skeleton height="16px" width="50px" borderRadius="sm" />
                    <Skeleton height="16px" width="50px" borderRadius="sm" />
                    <Skeleton height="16px" width="50px" borderRadius="sm" />
                  </HStack>
                </Box>
              </HStack>
              <HStack spacing={0.5} flexShrink={0}>
                <Skeleton width="24px" height="24px" borderRadius="md" />
                <Skeleton width="24px" height="24px" borderRadius="md" />
              </HStack>
            </Flex>

            <Skeleton height="1px" width="100%" my={1.5} />

            <Wrap spacing={2} align="center">
              <Skeleton height="14px" width="80px" borderRadius="sm" />
              <Skeleton height="14px" width="80px" borderRadius="sm" />
              <Skeleton height="14px" width="60px" borderRadius="sm" />
            </Wrap>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default DashboardSkeleton;
