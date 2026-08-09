// src/components/common/SkeletonHome.jsx
import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const SkeletonHome = () => {
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
              width={{ base: "80%", md: "70%" }}
            />
            <Skeleton
              height={{ base: "24px", md: "36px" }}
              width={{ base: "60%", md: "50%" }}
            />
            <SkeletonText noOfLines={3} spacing="3" width="100%" />
            <HStack spacing={4} pt={2} width="100%">
              <Skeleton
                height={{ base: "40px", md: "56px" }}
                width={{ base: "120px", md: "180px" }}
                borderRadius="lg"
              />
              <Skeleton
                height={{ base: "40px", md: "56px" }}
                width={{ base: "100px", md: "150px" }}
                borderRadius="lg"
              />
            </HStack>
          </VStack>

          <Skeleton
            flex="1"
            height={{ base: "150px", sm: "180px", md: "220px", lg: "280px" }}
            width="100%"
            borderRadius={{ base: "lg", md: "2xl" }}
            minW={{ base: "100%", md: "200px" }}
          />
        </Flex>
      </Box>

      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 4 }}
        spacing={{ base: 3, md: 4 }}
        mb={6}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            height={{ base: "80px", md: "120px" }}
            borderRadius="xl"
          />
        ))}
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 4, md: 6 }}
        mb={6}>
        <Skeleton height={{ base: "250px", md: "300px" }} borderRadius="xl" />
        <Skeleton height={{ base: "250px", md: "300px" }} borderRadius="xl" />
      </SimpleGrid>

      <Skeleton height={{ base: "200px", md: "250px" }} borderRadius="xl" />
    </Box>
  );
};

export default SkeletonHome;
