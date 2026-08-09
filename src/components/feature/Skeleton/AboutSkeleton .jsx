// src/components/feature/Skeleton/AboutSkeleton.jsx
import React from "react";
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const AboutSkeleton = () => {
  return (
    <Box w="100%" h="100%">
      <Box
        bg="bg-card"
        borderRadius={{ base: "xl", md: "2xl" }}
        overflow="hidden"
        mb={6}
        p={{ base: 4, sm: 6, md: 10, lg: 12 }}
        border="1px solid"
        borderColor="border-color">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: 4, md: 8 }}>
          <VStack
            flex="1"
            align={{ base: "center", md: "flex-start" }}
            spacing={4}
            w="100%">
            <Skeleton
              height={{ base: "30px", md: "50px" }}
              width={{ base: "60%", md: "40%" }}
            />
            <Skeleton
              height={{ base: "24px", md: "40px" }}
              width={{ base: "80%", md: "60%" }}
            />
            <SkeletonText noOfLines={4} spacing="3" width="100%" />
          </VStack>
        </Flex>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 4, md: 6 }}
        mb={6}>
        <Skeleton height={{ base: "150px", md: "180px" }} borderRadius="xl" />
        <Skeleton height={{ base: "150px", md: "180px" }} borderRadius="xl" />
      </SimpleGrid>

      <Skeleton
        height={{ base: "250px", md: "300px" }}
        borderRadius="xl"
        mb={6}
      />

      <SimpleGrid columns={{ base: 3 }} spacing={{ base: 3, md: 6 }} mb={6}>
        <Skeleton height={{ base: "100px", md: "130px" }} borderRadius="xl" />
        <Skeleton height={{ base: "100px", md: "130px" }} borderRadius="xl" />
        <Skeleton height={{ base: "100px", md: "130px" }} borderRadius="xl" />
      </SimpleGrid>

      <Skeleton height={{ base: "150px", md: "180px" }} borderRadius="xl" />
    </Box>
  );
};

export default AboutSkeleton;
