// src/components/feature/createAppointment/CreateAppointmentSkeleton.jsx
import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Skeleton,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";

const CreateAppointmentSkeleton = () => {
  return (
    <Box w="100%" mx="auto" p={4}>
      <Box mb={6} pb={3} borderBottom="2px solid" borderColor="brand.200">
        <Flex align="center" gap={3} mb={1}>
          <Skeleton height="44px" width="44px" borderRadius="lg" />
          <Box>
            <Skeleton height="32px" width="200px" mb={2} />
            <Skeleton height="16px" width="300px" />
          </Box>
        </Flex>
        <HStack spacing={2} mt={2}>
          <Skeleton height="20px" width="100px" borderRadius="md" />
          <Skeleton height="20px" width="120px" borderRadius="md" />
          <Skeleton height="20px" width="80px" borderRadius="md" ml="auto" />
        </HStack>
      </Box>

      <Box>
        <VStack spacing={5} align="stretch">
          <Flex
            p={2.5}
            borderRadius="lg"
            border="1px solid"
            borderColor="brand.200"
            align="center"
            gap={2.5}>
            <Skeleton height="28px" width="28px" borderRadius="md" />
            <Skeleton height="16px" width="120px" />
          </Flex>

          <Divider borderColor="border-color" />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <Box>
              <Flex justify="space-between" align="center" mb={1}>
                <Skeleton height="14px" width="100px" />
                <Skeleton height="18px" width="80px" borderRadius="md" />
              </Flex>
              <Skeleton height="32px" borderRadius="md" />
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={1}>
                <Skeleton height="14px" width="100px" />
                <Skeleton height="18px" width="80px" borderRadius="md" />
              </Flex>
              <Skeleton height="32px" borderRadius="md" />
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={1}>
                <Skeleton height="14px" width="100px" />
              </Flex>
              <Skeleton height="32px" borderRadius="md" />
            </Box>

            <Box>
              <Skeleton height="14px" width="120px" mb={1} />
              <Skeleton height="32px" borderRadius="md" />
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={1}>
                <Skeleton height="14px" width="120px" />
                <Skeleton height="18px" width="100px" borderRadius="md" />
              </Flex>
              <Skeleton height="32px" borderRadius="md" />
            </Box>
          </SimpleGrid>

          <Divider borderColor="border-color" />

          <Flex
            p={2.5}
            borderRadius="lg"
            border="1px solid"
            borderColor="red.200"
            align="center"
            gap={2}>
            <Skeleton height="24px" width="24px" borderRadius="md" />
            <Skeleton height="14px" width="200px" />
          </Flex>

          <HStack spacing={2} justifyContent="flex-end" pt={1}>
            <Skeleton height="28px" width="80px" borderRadius="md" />
            <Skeleton height="28px" width="120px" borderRadius="md" />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateAppointmentSkeleton;
