// src/components/feature/dashBoard/DeleteConfirmModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Icon,
  Box,
  Badge,
  IconButton,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { FiAlertTriangle, FiX, FiUser } from "react-icons/fi";
import useAppStore from "../../../store/store";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, patient }) => {
  const { language } = useAppStore();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = {
    ar: {
      title: "تأكيد الحذف",
      subtitle: "هذا الإجراء لا يمكن التراجع عنه",
      confirmDelete: "تأكيد الحذف",
      cancel: "إلغاء",
      deleting: "جاري الحذف...",
      id: "رقم الحجز",
      phone: "الهاتف",
      warning: "سيتم حذف هذا الحجز وجميع البيانات المرتبطة به بشكل دائم",
      confirmText: "أنا متأكد من رغبتي في حذف هذا الحجز",
      close: "إغلاق",
      patientInfo: "معلومات المريض",
    },
    en: {
      title: "Confirm Delete",
      subtitle: "This action cannot be undone",
      confirmDelete: "Confirm Delete",
      cancel: "Cancel",
      deleting: "Deleting...",
      id: "ID",
      phone: "Phone",
      warning:
        "This will permanently delete this appointment and all associated data",
      confirmText: "I confirm that I want to delete this appointment",
      close: "Close",
      patientInfo: "Patient Information",
    },
  };

  const t = words[language] || words.ar;

  const handleDelete = () => {
    if (!isConfirmed) {
      return;
    }

    setIsDeleting(true);
    try {
      onConfirm();
      setIsConfirmed(false);
      onClose();
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  if (!patient) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size="md"
      closeOnOverlayClick={true}
      closeOnEsc={true}>
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent
        bg="bg-card"
        backdropFilter="blur(20px)"
        borderRadius="2xl"
        border="1px solid"
        borderColor="border-color"
        boxShadow="xl"
        p={2}
        position="relative">
        <IconButton
          aria-label={t.close}
          icon={<FiX />}
          size="sm"
          variant="ghost"
          position="absolute"
          top={3}
          sx={language === "en" ? { right: 3 } : { left: 3 }}
          onClick={handleClose}
          color="text-muted"
          _hover={{ bg: "bg-hover" }}
          zIndex={1}
        />

        <ModalHeader borderBottom="1px solid" borderColor="border-color" pb={4}>
          <Flex gap={3} align="center">
            <Box
              p={2}
              bg="red.50"
              _dark={{ bg: "red.900" }}
              borderRadius="full"
              flexShrink={0}>
              <Icon as={FiAlertTriangle} color="red.500" w={6} h={6} />
            </Box>
            <Box flex="1">
              <Text fontSize="lg" fontWeight="bold" color="text-primary">
                {t.title}
              </Text>
              <Text fontSize="sm" color="text-muted">
                {t.subtitle}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalBody py={6}>
          <VStack spacing={4} align="stretch">
            <Box
              p={4}
              borderRadius="xl"
              bg="bg-hover"
              border="1px solid"
              borderColor="border-color">
              <Text fontSize="xs" color="text-muted" fontWeight="500" mb={2}>
                {t.patientInfo}
              </Text>
              <Flex gap={3} align="center">
                <Icon as={FiUser} color="brand.500" flexShrink={0} />
                <Text fontWeight="600" color="text-primary" isTruncated>
                  {patient.name}
                </Text>
              </Flex>
              <Flex gap={4} mt={2} flexWrap="wrap">
                <Text fontSize="sm" color="text-muted">
                  {t.id}: {patient.id?.slice(0, 8)}
                </Text>
                {patient.phone && (
                  <Badge colorScheme="brand" variant="subtle">
                    {t.phone}: {patient.phone}
                  </Badge>
                )}
              </Flex>
            </Box>

            <Box
              p={3}
              borderRadius="lg"
              bg="red.50"
              _dark={{ bg: "red.900" }}
              border="1px solid"
              borderColor="red.200">
              <Text fontSize="sm" color="red.600" _dark={{ color: "red.300" }}>
                <Icon as={FiAlertTriangle} />
                {t.warning}
              </Text>
            </Box>

            <Box
              p={4}
              borderRadius="lg"
              bg="bg-hover"
              border="1px solid"
              borderColor="border-color">
              <Checkbox
                isChecked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                colorScheme="red"
                size="lg"
                spacing={3}>
                <Text fontSize="sm" color="text-muted">
                  {t.confirmText}
                </Text>
              </Checkbox>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor="border-color" pt={4}>
          <Flex gap={3}>
            <Button
              variant="outline"
              onClick={handleClose}
              isDisabled={isDeleting}
              size="md">
              {t.cancel}
            </Button>
            <Button
              sx={{
                bg: "#dc3545 !important",
                color: "white !important",
                _hover: { bg: "#c82333 !important" },
                _active: { bg: "#bd2130 !important" },
              }}
              onClick={handleDelete}
              isLoading={isDeleting}
              loadingText={t.deleting}
              isDisabled={!isConfirmed}
              size="md">
              {t.confirmDelete}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmModal;
