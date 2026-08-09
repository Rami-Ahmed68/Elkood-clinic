// src/components/feature/dashBoard/AddAppointmentModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const AddAppointmentModal = ({ isOpen, onClose, onAdd, words, language }) => {
  const [newPatient, setNewPatient] = useState({
    name: "",
    phone: "",
    bloodType: "",
    appointmentType: "مسبق",
    date: "",
  });

  const isRTL = language === "ar";
  const t = words[language] || words.ar;

  // قيم افتراضية في حال كانت undefined
  const bloodTypes = t.bloodTypes || [
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];
  const appointmentTypes = t.appointmentTypes || {
    مسبق: "حجز مسبق",
    مباشر: "حجز مباشر",
    إسعافي: "حالة إسعافية",
  };

  const handleSubmit = () => {
    if (!newPatient.name || !newPatient.phone || !newPatient.date) {
      return;
    }
    onAdd(newPatient);
    setNewPatient({
      name: "",
      phone: "",
      bloodType: "",
      appointmentType: "مسبق",
      date: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent dir={isRTL ? "rtl" : "ltr"}>
        <ModalHeader>{t.addAppointment || "إضافة حجز جديد"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>{t.patientName || "اسم المريض"}</FormLabel>
              <Input
                placeholder={t.patientName || "اسم المريض"}
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t.phone || "رقم الهاتف"}</FormLabel>
              <Input
                placeholder={t.phone || "رقم الهاتف"}
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phone: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>{t.bloodType || "فصيلة الدم"}</FormLabel>
              <Select
                placeholder={isRTL ? "اختر فصيلة الدم" : "Select Blood Type"}
                value={newPatient.bloodType}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, bloodType: e.target.value })
                }>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>{t.appointmentType || "نوع الحجز"}</FormLabel>
              <Select
                value={newPatient.appointmentType}
                onChange={(e) =>
                  setNewPatient({
                    ...newPatient,
                    appointmentType: e.target.value,
                  })
                }>
                {Object.keys(appointmentTypes).map((key) => (
                  <option key={key} value={key}>
                    {appointmentTypes[key]}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t.date || "تاريخ الحجز"}</FormLabel>
              <Input
                type="date"
                value={newPatient.date}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, date: e.target.value })
                }
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            {t.cancel || "إلغاء"}
          </Button>
          <Button
            colorScheme="brand"
            bg="brand.500"
            color="white"
            _hover={{ bg: "brand.600" }}
            onClick={handleSubmit}>
            {t.add || "إضافة"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAppointmentModal;
