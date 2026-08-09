import React, { useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { FiGlobe } from "react-icons/fi";
import useAppStore from "../../store/store";

const ToggleLanguageIcon = () => {
  const { language, toggleLanguage } = useAppStore();

  useEffect(() => {
    const savedLang = localStorage.getItem("app-language");

    document.dir = savedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLang;
    if (savedLang) {
    }
  }, []);

  return (
    <IconButton
      arial-lable="Toggle Language"
      icon={<FiGlobe size={18} />}
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      title={language === "en" ? "Switch to Arabic" : "Switch to English"}
    />
  );
};

export default ToggleLanguageIcon;
