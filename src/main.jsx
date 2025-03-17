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

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "./helpers/api";

// using a global context for categories to be accessible from anywhere
const _CategoryContext = createContext();
export const useCategories = () => useContext(_CategoryContext);

function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <_CategoryContext.Provider value={categories}>
            {children}
        </_CategoryContext.Provider>
    );
}

// render the app using CategoryProvider with global access for category
createRoot(document.getElementById("root")).render(
    <CategoryProvider>
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
    </CategoryProvider>
);
