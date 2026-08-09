import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const AboutPage = lazy(() => import("../pages/About/AboutPage"));
const DashBoardPage = lazy(() => import("../pages/Dash/DashBoardPage"));

const PageTransition = ({ children }) => {
  return (
    <Box w="100%" h="100%" pb={4} m={0} animation="fadeIn 0.4s ease-in-out">
      {children}
    </Box>
  );
};

const AppRouter = () => {
  return (
    <Suspense>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />

        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashBoardPage />
            </PageTransition>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
