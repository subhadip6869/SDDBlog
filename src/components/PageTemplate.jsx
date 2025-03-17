import React from "react";
import "../assets/main.css";
import { useCategories } from "../main";
import { CustomFooter, CustomNavbar } from "./metadata";

function PageTemplate({ children }) {
    const categories = useCategories();
    return (
        <div className="wrapper">
            {/* Navigation bar */}
            <CustomNavbar categories={categories} />

            {/* Body */}
            {children}

            {/* Footer */}
            <CustomFooter categories={categories} />
        </div>
    );
}

export default PageTemplate;
