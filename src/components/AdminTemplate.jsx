import React from "react";
import "../assets/admin_login.css";
import "../assets/main.css";
import { useCategories } from "../main";
import { AdminNavbar, CustomFooter } from "./metadata";

function AdminTemplate({ children }) {
    const categories = useCategories();
    return (
        <div className="wrapper">
            {/* Navigation bar */}
            <AdminNavbar />

            {/* Body */}
            {children}

            {/* Footer */}
            <CustomFooter categories={categories} />
        </div>
    );
}

export default AdminTemplate;
