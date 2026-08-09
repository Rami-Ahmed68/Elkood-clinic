// src/pages/Home/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Flex,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import {
  FiCalendar,
  FiUser,
  FiClock,
  FiAward,
  FiHeart,
  FiStar,
  FiBriefcase,
} from "react-icons/fi";
import useAppStore from "../../store/store";
import SkeletonHome from "../../components/feature/Skeleton/SkeletonHome";
import dentalImage from "../../assets/dentaltreatments-e1701176730581.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useAppStore();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isLoading, setIsLoading] = React.useState(true);
  const isRTL = language === "ar";

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const words = {
    ar: {
      clinicName: "عيادة ELKOOD",
      title: "مرحباً بكم في عيادة ELKOOD",
      subtitle: "رعاية صحية متكاملة بأيدي أمهر الأطباء",
      description:
        "نقدم في عيادة ELKOOD أفضل الخدمات الطبية في بيئة مريحة ومتطورة. فريقنا الطبي المتخصص جاهز لتقديم الرعاية الصحية المناسبة لك ولعائلتك.",
      bookAppointment: "احجز موعد الآن",
      aboutUs: "من نحن",
      ourServices: "خدماتنا",
      services: {
        general: "استشارات عامة",
        dental: "طب الأسنان",
        pediatrics: "طب الأطفال",
        cardiology: "أمراض القلب",
      },
      whyUs: "لماذا تختارنا؟",
      features: {
        experience: "خبرة طويلة",
        modern: "أجهزة حديثة",
        care: "رعاية متكاملة",
        comfort: "بيئة مريحة",
      },
      stats: {
        patients: "مرضى سعداء",
        doctors: "أطباء متخصصون",
        years: "سنوات من الخبرة",
        awards: "جوائز طبية",
      },
      workingHours: "أوقات العمل",
      day: "اليوم",
      days: {
        sat: "السبت",
        sun: "الأحد",
        mon: "الإثنين",
        tue: "الثلاثاء",
        wed: "الأربعاء",
        thu: "الخميس",
        fri: "الجمعة",
      },
      time: "٩:٠٠ ص - ١٠:٠٠ م",
      timeFri: "مغلق",
    },
    en: {
      clinicName: "ELKOOD Clinic",
      title: "Welcome to ELKOOD Clinic",
      subtitle: "Comprehensive healthcare with the most skilled doctors",
      description:
        "At ELKOOD Clinic, we provide the best medical services in a comfortable and advanced environment. Our specialized medical team is ready to provide the right healthcare for you and your family.",
      bookAppointment: "Book Appointment Now",
      aboutUs: "About Us",
      ourServices: "Our Services",
      services: {
        general: "General Consultations",
        dental: "Dentistry",
        pediatrics: "Pediatrics",
        cardiology: "Cardiology",
      },
      whyUs: "Why Choose Us?",
      features: {
        experience: "Long Experience",
        modern: "Modern Equipment",
        care: "Integrated Care",
        comfort: "Comfortable Environment",
      },
      stats: {
        patients: "Happy Patients",
        doctors: "Specialist Doctors",
        years: "Years of Experience",
        awards: "Medical Awards",
      },
      workingHours: "Working Hours",
      day: "Day",
      days: {
        sat: "Saturday",
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
      },
      time: "9:00 AM - 10:00 PM",
      timeFri: "Closed",
    },
  };

  const t = words[language] || words.ar;

  const services = [
    { icon: FiUser, label: t.services.general },
    { icon: FiHeart, label: t.services.dental },
    { icon: FiStar, label: t.services.pediatrics },
    { icon: FiAward, label: t.services.cardiology },
  ];

  const features = [
    { icon: FiAward, label: t.features.experience },
    { icon: FiClock, label: t.features.modern },
    { icon: FiHeart, label: t.features.care },
    { icon: FiBriefcase, label: t.features.comfort },
  ];

  const stats = [
    { value: "5000+", label: t.stats.patients },
    { value: "15+", label: t.stats.doctors },
    { value: "10+", label: t.stats.years },
    { value: "25+", label: t.stats.awards },
  ];

  const workingDays = [
    { day: t.days.sat, time: t.time },
    { day: t.days.sun, time: t.time },
    { day: t.days.mon, time: t.time },
    { day: t.days.tue, time: t.time },
    { day: t.days.wed, time: t.time },
    { day: t.days.thu, time: t.time },
    { day: t.days.fri, time: t.timeFri, isClosed: true },
  ];

  if (isLoading) return <SkeletonHome />;

  return (
    <Box w="100%" h="100%">
      <Box
        bg="bg-card"
        borderRadius={{ base: "xl", md: "2xl" }}
        overflow="hidden"
        boxShadow="shadow-sm"
        mb={6}
        border="1px solid"
        borderColor="border-color">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          p={{ base: 4, sm: 6, md: 10, lg: 12 }}
          gap={{ base: 4, md: 8 }}>
          <VStack
            flex="1"
            align={{ base: "center", md: "flex-start" }}
            spacing={{ base: 3, md: 4 }}
            textAlign={{ base: "center", md: "left" }}>
            <Text
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="brand.500"
              lineHeight="1.2">
              {t.clinicName}
            </Text>
            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="text-primary"
              lineHeight="1.2">
              {t.title}
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="text-secondary"
              fontWeight="medium">
              {t.subtitle}
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="text-muted"
              lineHeight="1.8"
              maxW="600px">
              {t.description}
            </Text>

            <HStack
              spacing={{ base: 3, md: 4 }}
              pt={2}
              flexWrap="wrap"
              justify={{ base: "center", md: "flex-start" }}>
              <Button
                size={{ base: "md", md: "lg" }}
                bg="brand.500"
                color="white"
                _hover={{ bg: "brand.600", transform: "translateY(-2px)" }}
                _active={{ bg: "brand.700" }}
                transition="all 0.2s"
                boxShadow="shadow-md"
                leftIcon={<FiCalendar />}
                onClick={() => navigate("/add-appointment")}
                fontSize={{ base: "sm", md: "md" }}>
                {t.bookAppointment}
              </Button>
              <Button
                size={{ base: "md", md: "lg" }}
                variant="outline"
                borderColor="brand.500"
                color="brand.500"
                _hover={{ bg: "bg-hover" }}
                onClick={() => navigate("/about")}
                fontSize={{ base: "sm", md: "md" }}>
                {t.aboutUs}
              </Button>
            </HStack>
          </VStack>

          <Box
            flex="1"
            w="100%"
            h={{ base: "150px", sm: "180px", md: "220px", lg: "280px" }}
            borderRadius={{ base: "lg", md: "2xl" }}
            overflow="hidden"
            minW={{ base: "100%", md: "200px" }}
            position="relative">
            <Image
              src={dentalImage}
              alt="Dental Clinic"
              w="100%"
              h="100%"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/400x300/0088cc/ffffff?text=ELKOOD+Clinic"
            />
          </Box>
        </Flex>
      </Box>

      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 4 }}
        spacing={{ base: 3, md: 4 }}
        mb={6}>
        {stats.map((stat, index) => (
          <Box
            key={index}
            bg="bg-card"
            p={{ base: 4, md: 6 }}
            borderRadius="xl"
            textAlign="center"
            boxShadow="shadow-sm"
            border="1px solid"
            borderColor="border-color"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "shadow-md",
              borderColor: "brand.500",
            }}>
            <Text
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontWeight="bold"
              color="brand.500">
              {stat.value}
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }} color="text-muted">
              {stat.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 4, md: 6 }}
        mb={6}>
        <Box
          bg="bg-card"
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="border-color">
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="text-primary"
            mb={4}>
            {t.ourServices}
          </Text>
          <VStack align="stretch" spacing={{ base: 2, md: 3 }}>
            {services.map((service, index) => (
              <HStack
                key={index}
                p={{ base: 2, md: 3 }}
                bg="bg-hover"
                borderRadius="lg"
                spacing={{ base: 2, md: 3 }}
                transition="all 0.2s"
                _hover={{ bg: "bg-active", transform: "translateX(4px)" }}>
                <Icon
                  as={service.icon}
                  boxSize={{ base: 4, md: 5 }}
                  color="brand.500"
                />
                <Text color="text-primary" fontSize={{ base: "sm", md: "md" }}>
                  {service.label}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box
          bg="bg-card"
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
          border="1px solid"
          borderColor="border-color">
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="text-primary"
            mb={4}>
            {t.whyUs}
          </Text>
          <VStack align="stretch" spacing={{ base: 2, md: 3 }}>
            {features.map((feature, index) => (
              <HStack
                key={index}
                p={{ base: 2, md: 3 }}
                bg="bg-hover"
                borderRadius="lg"
                spacing={{ base: 2, md: 3 }}
                transition="all 0.2s"
                _hover={{ bg: "bg-active", transform: "translateX(4px)" }}>
                <Icon
                  as={feature.icon}
                  boxSize={{ base: 4, md: 5 }}
                  color="brand.500"
                />
                <Text color="text-primary" fontSize={{ base: "sm", md: "md" }}>
                  {feature.label}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      <Box
        bg="bg-card"
        p={{ base: 4, md: 6 }}
        borderRadius="xl"
        border="1px solid"
        borderColor="border-color"
        mb={6}
        boxShadow="shadow-sm">
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="text-primary"
          mb={4}
          textAlign="center">
          {t.workingHours}
        </Text>

        <TableContainer
          borderRadius="lg"
          border="1px solid"
          borderColor="border-color"
          overflow="hidden">
          <Table variant="striped" size={isMobile ? "sm" : "md"}>
            <Thead bg="bg-hover">
              <Tr>
                <Th
                  color="text-primary"
                  borderColor="border-color"
                  textAlign="start"
                  fontSize="sm"
                  fontWeight="bold"
                  py={3}>
                  {t.day}
                </Th>
                <Th
                  color="text-primary"
                  borderColor="border-color"
                  textAlign={isRTL ? "right" : "center"}
                  fontSize="sm"
                  fontWeight="bold"
                  py={3}>
                  {t.workingHours}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {workingDays.map((item, index) => (
                <Tr
                  key={index}
                  _hover={{ bg: "bg-hover" }}
                  transition="background 0.2s">
                  <Td
                    fontWeight={item.isClosed ? "bold" : "medium"}
                    color={item.isClosed ? "error.500" : "text-primary"}
                    borderColor="border-color"
                    textAlign="start"
                    py={3}>
                    {item.day}
                    {item.isClosed && (
                      <Text
                        as="span"
                        ml={2}
                        fontSize="xs"
                        color="error.500"
                        fontWeight="bold">
                        ✕
                      </Text>
                    )}
                  </Td>
                  <Td
                    textAlign={isRTL ? "right" : "center"}
                    color={item.isClosed ? "error.500" : "text-secondary"}
                    borderColor="border-color"
                    py={3}
                    fontWeight={item.isClosed ? "bold" : "normal"}>
                    {item.time}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HomePage;
