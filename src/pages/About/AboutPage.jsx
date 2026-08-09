// src/pages/About/AboutPage.jsx
import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FiAward,
  FiHeart,
  FiUsers,
  FiBriefcase,
  FiStar,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import useAppStore from "../../store/store";
import AboutSkeleton from "../../components/feature/Skeleton/AboutSkeleton ";

const AboutPage = () => {
  const { language } = useAppStore();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const words = {
    ar: {
      title: "من نحن",
      subtitle: "عيادة ELKOOD للرعاية الصحية المتكاملة",
      description1:
        "تأسست عيادة ELKOOD لتقديم أفضل الخدمات الطبية في بيئة مريحة ومتطورة. نحن نؤمن بأن الصحة هي أغلى ما يملكه الإنسان، ونسعى جاهدين لتوفير رعاية صحية متميزة لكل فرد في المجتمع.",
      description2:
        "يضم فريقنا الطبي نخبة من الأطباء المتخصصين في مختلف المجالات، مع أحدث التقنيات والأجهزة الطبية لضمان تقديم خدمات طبية دقيقة وفعالة.",
      ourMission: "رسالتنا",
      missionText:
        "تقديم رعاية صحية شاملة ومتكاملة تركز على المريض، باستخدام أحدث التقنيات الطبية، مع فريق طبي متخصص يضع صحة المرضى وسلامتهم على رأس أولوياته.",
      ourVision: "رؤيتنا",
      visionText:
        "أن نكون الخيار الأول للرعاية الصحية في المنطقة، من خلال التميز في الخدمات الطبية والابتكار المستمر في مجال الرعاية الصحية.",
      ourValues: "قيمنا",
      values: {
        quality: "الجودة",
        qualityText: "نلتزم بأعلى معايير الجودة في جميع خدماتنا",
        care: "الرعاية",
        careText: "نقدم رعاية صحية إنسانية تراعي احتياجات كل مريض",
        trust: "الثقة",
        trustText: "نبني علاقة ثقة مع مرضانا من خلال الشفافية والصدق",
        innovation: "الابتكار",
        innovationText: "نتبنى أحدث التقنيات الطبية لتحسين نتائج العلاج",
      },
      ourTeam: "فريقنا الطبي",
      team: {
        doctors: "أطباء متخصصون",
        nurses: "ممرضات",
        staff: "كادر إداري",
      },
      contact: "تواصل معنا",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
    },
    en: {
      title: "About Us",
      subtitle: "ELKOOD Integrated Healthcare Clinic",
      description1:
        "ELKOOD Clinic was established to provide the best medical services in a comfortable and advanced environment. We believe that health is the most valuable thing a person owns, and we strive to provide exceptional healthcare for every individual in the community.",
      description2:
        "Our medical team consists of leading specialists in various fields, equipped with the latest medical technologies and equipment to ensure accurate and effective medical services.",
      ourMission: "Our Mission",
      missionText:
        "To provide comprehensive and integrated patient-centered healthcare using the latest medical technologies, with a specialized medical team that prioritizes patient health and safety.",
      ourVision: "Our Vision",
      visionText:
        "To be the first choice for healthcare in the region, through excellence in medical services and continuous innovation in healthcare.",
      ourValues: "Our Values",
      values: {
        quality: "Quality",
        qualityText:
          "We adhere to the highest quality standards in all our services",
        care: "Care",
        careText:
          "We provide human-centered healthcare that addresses each patient's needs",
        trust: "Trust",
        trustText:
          "We build relationships of trust with our patients through transparency and honesty",
        innovation: "Innovation",
        innovationText:
          "We adopt the latest medical technologies to improve treatment outcomes",
      },
      ourTeam: "Our Medical Team",
      team: {
        doctors: "Specialist Doctors",
        nurses: "Nurses",
        staff: "Administrative Staff",
      },
      contact: "Contact Us",
      address: "Address",
      phone: "Phone",
      email: "Email",
    },
  };

  const t = words[language] || words.ar;
  const isRTL = language === "ar";

  const values = [
    { icon: FiAward, label: t.values.quality, text: t.values.qualityText },
    { icon: FiHeart, label: t.values.care, text: t.values.careText },
    { icon: FiUsers, label: t.values.trust, text: t.values.trustText },
    { icon: FiStar, label: t.values.innovation, text: t.values.innovationText },
  ];

  const teamStats = [
    { value: "15+", label: t.team.doctors, icon: FiUser },
    { value: "30+", label: t.team.nurses, icon: FiHeart },
    { value: "10+", label: t.team.staff, icon: FiBriefcase },
  ];

  if (isLoading) {
    return <AboutSkeleton />;
  }

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
          direction={{ base: "column", md: isRTL ? "row-reverse" : "row" }}
          align="center"
          p={{ base: 4, sm: 6, md: 10, lg: 12 }}
          gap={{ base: 4, md: 8 }}>
          <VStack
            flex="1"
            align={{ base: "center", md: isRTL ? "flex-end" : "flex-start" }}
            spacing={{ base: 3, md: 4 }}>
            <Text
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="brand.500"
              lineHeight="1.2">
              {t.title}
            </Text>
            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="text-primary"
              lineHeight="1.2">
              {t.subtitle}
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="text-muted"
              lineHeight="1.8"
              w="100%">
              {t.description1}
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="text-muted"
              lineHeight="1.8"
              w="100%">
              {t.description2}
            </Text>
          </VStack>
        </Flex>
      </Box>

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
            color="brand.500"
            mb={3}>
            {t.ourMission}
          </Text>
          <Text color="text-muted" lineHeight="1.8">
            {t.missionText}
          </Text>
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
            color="brand.500"
            mb={3}>
            {t.ourVision}
          </Text>
          <Text color="text-muted" lineHeight="1.8">
            {t.visionText}
          </Text>
        </Box>
      </SimpleGrid>

      <Box
        bg="bg-card"
        p={{ base: 4, md: 6 }}
        borderRadius="xl"
        border="1px solid"
        borderColor="border-color"
        mb={6}>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="text-primary"
          mb={6}>
          {t.ourValues}
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 4, md: 6 }}>
          {values.map((item, index) => (
            <Box
              key={index}
              p={{ base: 4, md: 5 }}
              bg="bg-hover"
              borderRadius="lg"
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "shadow-md",
                borderColor: "brand.500",
              }}
              border="1px solid"
              borderColor="transparent">
              <HStack spacing={3} mb={2}>
                <Icon as={item.icon} boxSize={5} color="brand.500" />
                <Text fontWeight="bold" color="text-primary">
                  {item.label}
                </Text>
              </HStack>
              <Text fontSize="sm" color="text-muted" lineHeight="1.6">
                {item.text}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <SimpleGrid columns={{ base: 3 }} spacing={{ base: 3, md: 6 }} mb={6}>
        {teamStats.map((stat, index) => (
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
            <Icon
              as={stat.icon}
              boxSize={{ base: 6, md: 8 }}
              color="brand.500"
              mb={2}
            />
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
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

      <Box
        bg="bg-card"
        p={{ base: 4, md: 6 }}
        borderRadius="xl"
        border="1px solid"
        borderColor="border-color"
        boxShadow="shadow-sm">
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="text-primary"
          textAlign="center"
          mb={4}>
          {t.contact}
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Box textAlign="center">
            <Icon as={FiMapPin} boxSize={5} color="brand.500" mb={2} />
            <Text fontWeight="semibold" color="text-primary">
              {t.address}
            </Text>
            <Text color="text-muted" fontSize="sm">
              {language === "ar"
                ? "شارع العيادات، المدينة الطبية"
                : "Clinics Street, Medical City"}
            </Text>
          </Box>
          <Box textAlign="center">
            <Icon as={FiPhone} boxSize={5} color="brand.500" mb={2} />
            <Text fontWeight="semibold" color="text-primary">
              {t.phone}
            </Text>
            <Text color="text-muted" fontSize="sm">
              +966 12 345 6789
            </Text>
          </Box>
          <Box textAlign="center">
            <Icon as={FiMail} boxSize={5} color="brand.500" mb={2} />
            <Text fontWeight="semibold" color="text-primary">
              {t.email}
            </Text>
            <Text color="text-muted" fontSize="sm">
              info@elkood.com
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AboutPage;
