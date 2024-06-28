import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import ViewCamera from "../pages/camera/ViewCamera";
import { UploadPhoto } from "../pages/camera/UploadPhoto";
import { Search } from '../pages/search/Search';
import Profile from "../pages/profile/Profile";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Layout />} />

      <Route path="camara" element={<ViewCamera />} />
      <Route path="upload-photo" element={<UploadPhoto />} />

      <Route path="search" element={<Search />} />
      <Route path="profile" element={<Profile />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
