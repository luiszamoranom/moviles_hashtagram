import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "../pages/auth";
import { UserRoutes } from "./UserRoutes";
import { PublicRoutes } from './PublicRoutes'

function AppRouter() {
  return (
    <Routes>
      {/* <Route path="" element={ <Vista1 /> } /> */}

      {/* Login y registro */}
      <Route path="/login" element={<PublicRoutes>  <Login /> </PublicRoutes>} />
      <Route path="/register" element={<Register />} />

      <Route path="/user/*" element={ <UserRoutes />} />

      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRouter;
