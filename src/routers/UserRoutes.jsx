import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import ViewCamera from "../pages/camera/ViewCamera";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Layout />} />

      <Route path="camara" element={<ViewCamera />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
