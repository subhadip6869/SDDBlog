const getCategories = async () => {
    const res = await fetch("http://localhost:3000/api/projects/categories");
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
    const res = await fetch("http://localhost:3000/api/projects", {
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
    const res = await fetch("http://localhost:3000/api/projects", {
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
        `http://localhost:3000/api/projects/${
            category_id ? "?category=" + category_id : ""
        }`
    );
    const data = await res.json();
    return data;
};

export { addProject, getCategories, getProjects, updateProject };
