import React from "react";
import { NavLink } from "react-router";
import "../../assets/footer.css";

function CustomFooter({ categories = [] }) {
    return (
        <div className="container-fluid-lg text-center p-3 mt-3 text-white footer">
            <p className="fs-5">Thanks for visiting here! :)</p>
            <div className="links">
                <div className="row justify-content-start gx-4 gy-3">
                    <div className="col text-start">
                        <div className="fw-bolder text-uppercase list-heading">
                            Links
                        </div>
                        <div className="fs-6">
                            <NavLink to="/" className="text-white">
                                Home
                            </NavLink>
                        </div>
                        <div className="fs-6">
                            <NavLink to="/resume" className="text-white">
                                Resume
                            </NavLink>
                        </div>
                    </div>
                    <div className="col text-start">
                        <div className="fw-bolder text-uppercase list-heading">
                            Projects
                        </div>
                        {categories.map((cat) => (
                            <div key={cat["$id"]} className="fs-6">
                                <NavLink
                                    to={"/works/" + cat["$id"]}
                                    className="text-white"
                                >
                                    {cat.category_name}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-start contact">
                        <div className="fw-bolder text-uppercase list-heading">
                            Contact
                        </div>
                        <div className="fs-6">
                            <i className="bi bi-telegram"></i>{" "}
                            <NavLink
                                to="https://telegram.me/subhadip6869"
                                target="_blank"
                                className="text-white"
                            >
                                subhadip6869
                            </NavLink>
                        </div>
                        <div className="fs-6">
                            <i className="bi bi-envelope-fill"></i>{" "}
                            <NavLink
                                to="mailto:subhadip.dutta@yahoo.com"
                                className="text-white"
                            >
                                subhadip.dutta@yahoo.com
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomFooter;
