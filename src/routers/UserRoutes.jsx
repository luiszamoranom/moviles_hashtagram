import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import ViewCamera from "../pages/camera/ViewCamera";
import { UploadPhoto } from "../pages/camera/UploadPhoto";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Layout />} />

      <Route path="camara" element={<ViewCamera />} />
      <Route path="upload-photo" element={<UploadPhoto />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
