import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "../pages/auth";
import { UserRoutes } from "./UserRoutes";

function AppRouter() {
  return (
    <Routes>
      {/* <Route path="" element={ <Vista1 /> } /> */}

      {/* Login y registro */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/user/*" element={<UserRoutes />} />
      {/* <Route path="/vista2" element={ <Vista2 /> } /> */}

      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRouter;
