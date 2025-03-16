const baseAPI = "http://localhost:3000/api";

// projects
const getCategories = async () => {
    const res = await fetch(`${baseAPI}/projects/categories`);
    const data = await res.json();
    return data;
};

const addProject = async ({
    type,
    name,
    version,
    description,
    dLink,
    storeLink,
    expLink,
    signature,
}) => {
    const res = await fetch(`${baseAPI}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-appwrite-signature": signature,
        },
        body: JSON.stringify({
            project_name: name,
            project_version: version,
            project_desc: description,
            project_link: dLink ? dLink : null,
            project_link_play: storeLink ? storeLink : null,
            project_explore: expLink ? expLink : null,
            project_categories: type,
        }),
    });

    const data = await res.json();
    return { code: res.status, ...data };
};

const updateProject = async ({
    id,
    type,
    name,
    version,
    description,
    dLink,
    storeLink,
    expLink,
    signature,
}) => {
    const res = await fetch(`${baseAPI}/projects`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-appwrite-signature": signature,
        },
        body: JSON.stringify({
            project_id: id,
            project_name: name,
            project_version: version,
            project_desc: description,
            project_link: dLink ? dLink : null,
            project_link_play: storeLink ? storeLink : null,
            project_explore: expLink ? expLink : null,
            project_categories: type,
        }),
    });

    const data = await res.json();
    return { code: res.status, ...data };
};

const getProjects = async ({ category_id } = {}) => {
    const res = await fetch(
        `${baseAPI}/projects/${category_id ? "?category=" + category_id : ""}`
    );
    const data = await res.json();
    return data;
};

const deleteProject = async ({ id, signature }) => {
    const res = await fetch(`${baseAPI}/projects?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-appwrite-signature": signature,
        },
    });

    const data = await res.json();
    return { code: res.status, ...data };
};

// skills
const addSkill = async ({ name, percent, signature }) => {
    const res = await fetch(`${baseAPI}/skills`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-appwrite-signature": signature,
        },
        body: JSON.stringify({ name, percent: parseInt(percent) }),
    });

    const data = await res.json();
    return { code: res.status, ...data };
};

const getSkills = async () => {
    const res = await fetch(`${baseAPI}/skills`);
    const data = await res.json();
    return data;
};

const updateSkill = async ({ id, name, percent, signature }) => {
    const res = await fetch(`${baseAPI}/skills?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-appwrite-signature": signature,
        },
        body: JSON.stringify({ name, percent: parseInt(percent) }),
    });

    const data = await res.json();
    return { code: res.status, ...data };
};

const deleteSkill = async ({ id, signature }) => {
    const res = await fetch(`${baseAPI}/skills?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-appwrite-signature": signature,
        },
    });

    const data = await res.json();
    return { code: res.status, ...data };
};

export {
    addProject,
    addSkill,
    deleteProject,
    deleteSkill,
    getCategories,
    getProjects,
    getSkills,
    updateProject,
    updateSkill,
};
