import React, { lazy, Subspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const HomePage = lazy(() => import("../pages/Home/HomePage"));

const PageTransition = ({ children }) => {
  return (
    <Box w="100%" h="100%" pb={4} m={0} animation="fadeIn 0.4s ease-in-out">
      {children}
    </Box>
  );
};

const AppRouter = () => {
  return (
    <Subspense>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
      </Routes>
    </Subspense>
  );
};

export default AppRouter;
