import { Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "./components/common/layout/MainLayout";
import AppRouter from "./routes/appRouter";

function App() {
  <ChakraProvider>
    <Router>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </Router>
  </ChakraProvider>;
}

export default App;
