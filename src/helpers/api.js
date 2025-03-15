const getCategories = async () => {
    const res = await fetch("http://localhost:3000/api/projects/categories");
    const data = await res.json();
    return data;
};

export { getCategories };
