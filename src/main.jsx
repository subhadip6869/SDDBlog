import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AdminDashboard from "./routes/AdminDashboard";
import AdminLogin from "./routes/AdminLogin";
import AdminProjects from "./routes/AdminProjects";
import App from "./routes/App";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="admin-projects" element={<AdminProjects />} />
        </Routes>
    </BrowserRouter>
);
