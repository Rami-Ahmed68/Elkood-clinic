// src/components/feature/dashBoard/DeleteConfirmModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Checkbox,
  Button,
  VStack,
  Icon,
  Box,
  HStack,
} from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  patient,
  words,
  language,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const isRTL = language === "ar";
  const t = words[language] || words.ar;

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm();
      setIsConfirmed(false);
    }
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={{ base: "full", md: "md" }}>
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent dir={isRTL ? "rtl" : "ltr"}>
        <ModalHeader color="red.500">
          <HStack spacing={2}>
            <Icon as={FiAlertTriangle} boxSize={5} />
            <Text>{isRTL ? "تأكيد الحذف" : "Confirm Delete"}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box
              p={4}
              bg="red.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="red.200">
              <Text color="red.700" fontWeight="medium" textAlign="center">
                {isRTL
                  ? `هل أنت متأكد من حذف حجز ${patient?.name}؟`
                  : `Are you sure you want to delete appointment for ${patient?.name}?`}
              </Text>
              {patient?.id && (
                <Text color="red.500" fontSize="sm" textAlign="center" mt={1}>
                  {isRTL
                    ? `رقم الحجز: ${patient.id.slice(0, 8)}`
                    : `ID: ${patient.id.slice(0, 8)}`}
                </Text>
              )}
            </Box>

            <Checkbox
              isChecked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              colorScheme="red"
              size="lg">
              <Text fontSize="sm" color="text-muted">
                {isRTL
                  ? "أنا متأكد من رغبتي في حذف هذا الحجز"
                  : "I confirm that I want to delete this appointment"}
              </Text>
            </Checkbox>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={handleClose} mr={3}>
            {t.cancel}
          </Button>
          <Button
            colorScheme="red"
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            onClick={handleConfirm}
            isDisabled={!isConfirmed}>
            {isRTL ? "تأكيد الحذف" : "Confirm Delete"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmModal;
