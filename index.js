// importing required packages
require('dotenv').config()
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require("bcryptjs");
const cookieparser = require("cookie-parser");

// defining host and port
const host = process.env.HOSTNAME || "http://127.0.0.1";
const port = process.env.PORT || 5555;




// including database files
require("./db/conn");
const Interest = require("./db/models/interests");
const WorkModule = require("./db/models/worklists");
const WorkList = WorkModule.WorkList;
const ProjectList = WorkModule.ProjectList;
const ResumeModule = require("./db/models/resume");
const Education = ResumeModule.Education;
const Knowledge = ResumeModule.Knowledge;
const Admin = require("./db/models/admin");

const fetch_work_data = async() => {
    // creating array of objects from distinct works list data
    const worknamelist = await ProjectList.distinct('work_type');
    const worksluglist = await ProjectList.distinct('work_slug');
    workslist = [];
    for (let i = 0; i < worknamelist.length; i++) {
        workslist = workslist.concat({work_slug: worksluglist[i], work_type: worknamelist[i]});
    }
    return workslist;
}




// configuring app settings
const app = express();
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "/static")));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, "/partials"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));




// definings personal informations
const data = {
    personal: {
        name: "Subhadip Dutta",
        email: "subhadip.dutta@yahoo.com",
        location: "Bankura, West Bengal, India",
    },
    social_links: {
        facebook: "https://www.facebook.com/subhadip6869/",
        instagram: "https://www.instagram.com/subhadip6869",
        linkedin: "https://www.linkedin.com/in/subhadip-dutta-059356230/",
        twitter: "https://www.twitter.com/subhadip6869",
        telegram: "https://telegram.me/subhadip6869",
    },
}




// defining routes
app.get("/", async(req, res) => {
    let data_copy = JSON.parse(JSON.stringify(data));
    data_copy["title"] = "Subhadip | Home";
    data_copy["interest_data"] = await Interest.find();
    data_copy["work_data"] = await fetch_work_data();
    res.render("index.hbs", data_copy);
});

app.get("/resume", async(req, res) => {
    let data_copy = JSON.parse(JSON.stringify(data));
    data_copy["title"] = "Subhadip | Resume";
    data_copy["knowledge_data"] = await Knowledge.find();
    data_copy["education_data"] = await Education.find();
    data_copy["work_data"] = await fetch_work_data();
    res.render("resume.hbs", data_copy);
});

app.get("/works/:id", async(req, res) => {
    const work_slug = req.params.id;
    let data_copy = JSON.parse(JSON.stringify(data));
    data_copy["title"] = "Subhadip | Works";
    data_copy["project_data"] = await ProjectList.find({work_slug});
    data_copy["work_data"] = await fetch_work_data();
    res.render("works.hbs", data_copy);
})

app.get("/admin-login", async(req, res) => {
    if (req.cookies.admin) {
        res.redirect("/admin/dashboard")
    } else {
        let data_copy = JSON.parse(JSON.stringify(data));
        data_copy["title"] = "Admin Login Panel";
        data_copy["work_data"] = await fetch_work_data();
        res.render("admin_login.hbs", data_copy);
    }
})

app.post("/admin-login", async(req, res) => {
    const admin_email = req.body.admin_email;
    const admin_password = req.body.admin_password;
    try {
        const adminfind = await Admin.findOne({admin_email});
        if (await bcrypt.compare(admin_password, adminfind.admin_pass)) {
            res.cookie("admin", admin_email);
            res.redirect("/admin/dashboard");
        } else {
            let data_copy = JSON.parse(JSON.stringify(data));
            data_copy["work_data"] = await fetch_work_data();
            data_copy["error"] = "Invalid login details";
            res.render("admin_login.hbs", data_copy);
        }
    } catch (error) {
        let data_copy = JSON.parse(JSON.stringify(data));
        data_copy["work_data"] = await fetch_work_data();
        data_copy["error"] = "Invalid login details";
        res.render("admin_login.hbs", data_copy);
    }
})

app.get("/admin/dashboard", async(req, res) => {
    if (req.cookies.admin) {
        let data_copy = JSON.parse(JSON.stringify(data));
        data_copy["title"] = "Admin Login Panel";
        const admindata = await Admin.findOne({admin_email: req.cookies.admin});
        data_copy["admin_name"] = admindata.admin_name;
        data_copy["admin_email"] = admindata.admin_email;
        res.render("admin/dashboard.hbs", data_copy);
    } else {
        res.redirect("/admin-login");
    }
})

app.get("/logout", async(req, res) => {
    res.clearCookie("admin").redirect("/admin-login");
})

app.post("/update-admin", async(req, res) => {
    const aname = req.body.fname + " " + req.body.lname;
    const amail = req.body.amail;
    const apass = req.body.apass;
    try {
        const update_result = await Admin.updateOne({admin_email: amail}, {
            $set: {
                admin_name: aname,
                admin_pass: await bcrypt.hash(apass, 10)
            }
        });
        console.log(update_result);
        res.status(201)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
    res.redirect("/admin/dashboard");
})

app.get("/admin/projects", async(req, res) => {
    try {
        if (req.cookies.admin) {
            let data_copy = JSON.parse(JSON.stringify(data));
            data_copy["title"] = "Admin Login Panel";
            const admindata = await Admin.findOne({admin_email: req.cookies.admin});
            data_copy["admin_name"] = admindata.admin_name;
            data_copy["admin_email"] = admindata.admin_email;
            data_copy["project_data"] = await ProjectList.find().sort({project_name: 1});
            res.render("admin/projects.hbs", data_copy);
        } else {
            res.redirect("/admin-login");
        }
    } catch (error) {
        console.log(error)
    }
})

app.get("/delete-project/:id", async(req, res) => {
    const project_id = req.params.id;
    try {
        if (req.cookies.admin) {
            const delete_res = await ProjectList.deleteOne({_id: project_id});
            let data_copy = JSON.parse(JSON.stringify(data));
            data_copy["title"] = "Admin Login Panel";
            const admindata = await Admin.findOne({admin_email: req.cookies.admin});
            data_copy["admin_name"] = admindata.admin_name;
            data_copy["admin_email"] = admindata.admin_email;
            data_copy["project_data"] = await ProjectList.find().sort({project_name: 1});
            console.log(delete_res);
            res.render("admin/projects.hbs", data_copy);
        } else {
            res.redirect("/admin-login");
        }
    } catch (error) {
        console.log(error);
    }
})




// listening to host
app.listen(port, () => {
    console.log(`Listening to ${host}:${port}/`);
});