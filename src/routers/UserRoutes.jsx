import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWithNavbar from "../pages/LayoutWithNavbar"; // Asegúrate de importar tu LayoutWithNavbar
import ViewCamera from "../pages/camera/ViewCamera";
import { UploadPhoto } from "../pages/camera/UploadPhoto";
import { Search, Image } from '../pages/search';
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import Feed from "../pages/feed/Feed";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithNavbar />}>
        <Route path="home" element={<Feed />} />
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="camara" element={<ViewCamera />} />
        <Route path="upload-photo" element={<UploadPhoto />} />
        <Route path="search/image" element={<Image />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};
