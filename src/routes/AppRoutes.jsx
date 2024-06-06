import { Route, Routes } from "react-router-dom";
import Vista2 from "../Vista2";
import Vista1 from "../Vista1";

function AppRoutes() {
    return (
      <Routes>
        <Route path="" element={<Vista1/>}/>
        <Route path="/vista1" element={<Vista1/>}/>
        <Route path="/vista2" element={<Vista2/>}/>
      </Routes>
    );
  }
  
  export default AppRoutes;