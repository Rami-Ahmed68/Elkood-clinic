import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const AboutPage = lazy(() => import("../pages/About/AboutPage"));
const DashBoardPage = lazy(() => import("../pages/Dash/DashBoardPage"));
const CreateAppointmentPage = lazy(
  () => import("../pages/CreateAppointment/CreateAppointmentPage"),
);

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        width: "100%",
        height: "100%",
        paddingBottom: "1rem",
        margin: 0,
      }}>
      {children}
    </motion.div>
  );
};

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense>
        <Routes location={location} key={location.pathname}>
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
          <Route
            path="/create"
            element={
              <PageTransition>
                <CreateAppointmentPage />
              </PageTransition>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRouter;
