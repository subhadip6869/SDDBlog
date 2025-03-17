import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./routes/App";
import Resume from "./routes/Resume";
import Works from "./routes/Works";
import {
    AdminDashboard,
    AdminEducation,
    AdminInterests,
    AdminLogin,
    AdminProjects,
    AdminSkills,
} from "./routes/admin";

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
                <Route path="educations" element={<AdminEducation />} />
                <Route path="interests" element={<AdminInterests />} />
            </Route>
            <Route path="works">
                <Route path=":category" element={<Works />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
