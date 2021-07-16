const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const sendMail = require("../MailService");
const app = express();
app.use(express.json());
app.use(cors());

// Email sender
app.post("/send/notification", (req, res) => {
  const params = req.body.recipients;
  // catch error where request body is missing
  if (!params) {
    return res.status(400).json({
      status: "error",
      message: "Missing required field: recipients email",
    });
  }

  for (let i = 0; i < params.length; i++) {
    try {
      const send = sendMail(params[i]);
      res.json(send);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
});

// configure database
const db = mysql.createConnection({
  user: "root",
  host: "localhost", // follow hostname
  password: "password", // follow your mysql password + luqman has different password = admin
  database: "stains",
  dateStrings: true, // force date (DATE, DATETIME, TIMESTAMP) to be returned in string instead of in JS date object
});

// declare functions
function getQuery(db, sqlQuery, res) {
  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.send(err.sqlMessage);
    } else {
      res.send(result);
    }
  });
}

function setQuery(db, sqlQuery, par, res) {
  db.query(sqlQuery, par, (err, result) => {
    if (err) {
      res.send(err.sqlMessage);
    } else {
      res.send(result);
    }
  });
}

app.get("/auditlogs/sel", (req, res) => {
  const GetAuditLogsQuery = "CALL sp_auditlogs_sel()";
  getQuery(db, GetAuditLogsQuery, res);
});

app.post("/auditlogs/ins", (req, res) => {
  const insAuditLog = "CALL sp_auditlogs_ins(?, ?, ?, ?, ?, ?, ?)";
  const params = req.body.auditlog;
  setQuery(db, insAuditLog, [
    params.modifier,
    params.target,
    params.object,
    params.action,
    params.valueorigin,
    params.valuenew,
    params.datecreated
  ], res);
})

app.get("/appsusers/sel", (req, res) => {
  const AppUserQuery = "CALL sp_appsusers_sel()";
  getQuery(db, AppUserQuery, res);
});

app.post("/appsusers/ins", (req, res) => {
  const insAppsUsers = "CALL sp_appsusers_ins(?, ?, ?, ?)";
  const params = req.body.appuser;
  setQuery(
    db,
    insAppsUsers,
    [params.userid, params.appid, params.startdate, params.enddate],
    res
  );
});

app.get("/techstacks/sel", (req, res) => {
  const TechStackQuery = "CALL sp_techstacks_sel()";
  getQuery(db, TechStackQuery, res);
});

// insert new tech stack
app.post("/techstacks/ins", (req, res) => {
  const addTechStack = "CALL sp_techstacks_ins(?,?,?)";
  const params = req.body.techStackData;
  setQuery(
    db,
    addTechStack,
    [params.techname, params.datecreated, params.datemodified],
    res
  );
});

app.get("/users/sel", (req, res) => {
  const UsersQuery = "CALL sp_users_sel()";
  getQuery(db, UsersQuery, res);
});

app.get("/users/application", (req, res) => {
  const AppsQuery = "CALL sp_usersapp_sel()";
  getQuery(db, AppsQuery, res);
});

app.get("/application/users", (req, res) => {
  const UsersQuery = "CALL sp_appsuserlist_sel()";
  getQuery(db, UsersQuery, res);
});

// select employment type
app.get("/employment/sel", (req, res) => {
  const EmploymentQuery = "CALL sp_lookupemploymenttypes_sel()";
  getQuery(db, EmploymentQuery, res);
});

//insert employment type
app.post("/employment/ins", (req, res) => {
  const insUserEmail = "CALL sp_lookupemploymenttypes_ins(?,?,?)";
  const params = req.body.employmentData;
  setQuery(
    db,
    insUserEmail,
    [params.typename, params.datecreated, params.datemodified],
    res
  );
});

// insert user's email and created date from auth0 to mysql users table
app.post("/users/ins", (req, res) => {
  const insUserEmail = "CALL sp_users_ins(?,?)";
  const params = req.body;
  setQuery(db, insUserEmail, [params.email, params.datecreated], res);
});

// retrieve user's email and created date from Auth0 authentication
app.post("/profile/sel", (req, res) => {
  const RetrieveUserProfile = "CALL sp_profile_sel(?)";
  const params = req.body;
  setQuery(db, RetrieveUserProfile, params.email, res);
});

// update user's data in users table
app.post("/users/upd", (req, res) => {
  const UpdateUserProfile = "CALL sp_users_upd(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = req.body.user;
  setQuery(
    db,
    UpdateUserProfile,
    [
      params.firstName,
      params.lastName,
      params.phoneNumber,
      params.email,
      params.employmentType,
      params.position,
      params.contractStartDate,
      params.contractEndDate,
      params.dailyRate,
      params.datemodified
    ],
    res
  );
});

app.post("/applications/ins", (req, res) => {
  const CreateApp = "CALL sp_applications_ins(?, ?, ?, ?, ?, ?, ?)";
  const params = req.body.newapps;
  setQuery(
    db,
    CreateApp,
    [
      params.appname,
      params.appurl,
      params.devopslink,
      params.datecreated,
      params.datemodified,
      params.comments,
      params.expectedappmembercount,
    ],
    res
  );
});

//update user engagement date for application
app.post("/appsusers/upd", (req, res) => {
  const updAppsDetails = "CALL sp_appsusers_upd(?, ?, ?, ?)";
  const params = req.body.appdetail;
  setQuery(
    db,
    updAppsDetails,
    [params.appid, params.userid, params.datestarted, params.dateended],
    res
  );
});

// delete user from application
app.delete("/appsusers/del", (req, res) => {
  const delAppsDetails = "CALL sp_appsusers_del(?, ?)";
  const params = req.body.userdetail;
  setQuery(db, delAppsDetails, [params.appid, params.userid], res);
});

// retrieve application details from db
app.post("/appsdetails/sel", (req, res) => {
  const selAppsDetails = "CALL sp_appsdetails_sel(?, ?)";
  const params = req.body;
  setQuery(db, selAppsDetails, [params.appid, params.userid], res);
});

// retrieve user details of selected application from db
app.post("/userdetails/sel", (req, res) => {
  const selUserDetails = "CALL sp_userdetails_sel(?, ?)";
  const params = req.body;
  setQuery(db, selUserDetails, [params.appid, params.userid], res);
});

//insert roleid and userid to db
app.post("/userroles/ins", (req, res) => {
  const insUserRoles = "CALL sp_userroles_ins(?, ?)";
  const params = req.body;
  setQuery(db, insUserRoles, [params.userid, params.roleid], res);
});

// delete the particular userid and roleid in userroles table
app.delete("/userroles/del", (req, res) => {
  const delUserRoles = "CALL sp_userroles_del(?, ?)";
  const params = req.body;
  setQuery(db, delUserRoles, [params.userid, params.roleid], res);
});
// retrieve all records of a user from userstechstacks table
app.post("/userstechstacks/sel", (req, res) => {
  const RetrieveUserTechStacks = "CALL sp_userstechstacks_sel(?)";
  const params = req.body;
  setQuery(db, RetrieveUserTechStacks, params.email, res);
});

// delete all records of a user from userstechstacks table
app.delete("/userstechstacks/del", (req, res) => {
  const deleteUserTechStacks = "CALL sp_userstechstacks_del(?)";
  const params = req.body;
  setQuery(db, deleteUserTechStacks, params.email, res);
});

// insert selected techstacks by a user into userstechstacks table
app.post("/userstechstacks/ins", (req, res) => {
  const insertUserTechStacks = "CALL sp_userstechstacks_ins(?, ?, ?, ?)";
  const params = req.body.userTechStacks;
  setQuery(
    db,
    insertUserTechStacks,
    [params.email, params.techstackid, params.skilllevel, params.datecreated],
    res
  );
});

// insert selected techstacks by a user into appstechstacks table
app.post("/appstechstacks/ins", (req, res) => {
  const insertAppTechStacks = "CALL sp_appstechstacks_ins(?, ?, ?)";
  const params = req.body.appTechStacks;
  setQuery(
    db,
    insertAppTechStacks,
    [params.appname, params.techstackid, params.datecreated],
    res
  );
});

// retrieve page view
app.get("/lookuppages", (req,res) => {
  const getPageViews = "CALL sp_lookuppages_sel()";
  getQuery(db, getPageViews, res);
});

// insert page url and visited date of page into systempagetracking table for tracking which page has been viewed
app.post("/systempagetracking/ins", (req, res) => {
  const addPage = "CALL sp_systempagetracking_ins(?,?)";
  const params = req.body.pagetrackerdata;
  setQuery(db, addPage, [params.url, params.date], res);
});

// insert page name, url, and date of new page into lookuppages if the page doesnt exist in the db
app.post("/lookuppages/ins", (req, res) => {
  const addNewPage = "CALL sp_lookuppages_ins(?,?,?)";
  const params = req.body.pagetrackerdata;
  setQuery(db, addNewPage, [params.name, params.url, params.date], res);
});

app.get("/applications/sel", (req,res) => {
  const GetActiveApps = "CALL sp_applications_sel()";
  getQuery(db, GetActiveApps, res);
});

// Navigation
app.get("/navmenu/horizontal", (req,res) => {
  const GetHorizontalSearch = "CALL sp_navmenuitems_sel(1)";
  getQuery(db, GetHorizontalSearch, res);
});

app.get("/navmenu/vertical", (req,res) => {
  const GetHorizontalSignIn = "CALL sp_navmenuitems_sel(2)";
  getQuery(db, GetHorizontalSignIn, res);
});

app.get("/usersnotloggedin", (req,res) => {
  const UsersNotLoggedInQuery = "CALL sp_usersnotloggedin_sel()";
  getQuery(db, UsersNotLoggedInQuery, res);
});

app.post("/usersloginhistory", (req, res) => {
  const UsersLoginHistory = "CALL sp_loginhistory_sel(?)";
  const params = req.body;
  setQuery(db, UsersLoginHistory, params.email, res);
});

//track user login date
app.post("/userlogin/add", (req, res) => {
  const insUserLogin = "CALL sp_userslogin_ins(?,?)";
  const params = req.body;
  setQuery(db, insUserLogin, [params.email, params.datelogin], res);
});

// get all roles
app.get("/lookupuserroles", (req,res) => {
  const getAllRoles = "CALL sp_lookupuserroles_sel";
  getQuery(db, getAllRoles, res);
});

//isnert userroles
app.post("/lookupuserroles/ins", (req, res) => {
  const insRoles = "CALL sp_lookupuserroles_ins(?,?,?)";
  const params = req.body.roleData;
  setQuery(
    db,
    insRoles,
    [params.rolename, params.datecreated, params.datemodified],
    res
  );
});

// configure server port number
const listener = app.listen(3333, () => {
  console.log("App is listening on port " + listener.address().port);
});
