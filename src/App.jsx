import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import Homepage from "./pages/Homepage";
import UserPortal from "./pages/UserPortal";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Topbar from "./components/topbars/Topbar";
import AdminPortal from "./pages/AdminPortal";
import ViewFullTemplate from "./components/gallery/ViewFullTemplate";
import EditTemplate from "./components/template showcase/EditTemplate";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user-portal" element={<UserPortal />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/view-template" element={<ViewFullTemplate />} />
        <Route path="/edit-template" element={<EditTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
