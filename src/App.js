import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "./components/common/layout/MainLayout";
import AppRouter from "./routes/appRouter";
import { theme } from "./theme/theme";
import useAppStore from "./store/store";

function App() {
  const { language } = useAppStore();

  useEffect(() => {
    document.dir = language === "en" ? "ltr" : "rtl";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
