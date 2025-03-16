import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AdminDashboard from "./routes/AdminDashboard";
import AdminLogin from "./routes/AdminLogin";
import AdminProjects from "./routes/AdminProjects";
import App from "./routes/App";
import Works from "./routes/Works";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="login" element={<AdminLogin />} />
                <Route path="projects" element={<AdminProjects />} />
            </Route>
            <Route path="works">
                <Route path=":category" element={<Works />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
