import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AdminDashboard from "./routes/AdminDashboard";
import AdminLogin from "./routes/AdminLogin";
import AdminProjects from "./routes/AdminProjects";
import AdminSkills from "./routes/AdminSkills";
import App from "./routes/App";
import Resume from "./routes/Resume";
import Works from "./routes/Works";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="resume" element={<Resume />} />
            <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="login" element={<AdminLogin />} />
            </Route>
            <Route path="admin-edit">
                <Route path="projects" element={<AdminProjects />} />
                <Route path="skills" element={<AdminSkills />} />
            </Route>
            <Route path="works">
                <Route path=":category" element={<Works />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
