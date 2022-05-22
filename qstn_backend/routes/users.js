const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
  updatePoint,
  googleLogin,
  googlecallBack,
  gooleToken,
  getPoint,
  getUserByToken,
  updateUser
} = require("../services/Auth");
router.post("/updateUser", async (req, res) => {
  await updateUser(req, res);
});
router.post("/getPoint", async (req, res) => {
  await getPoint(req, res);
});
// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", userAuth,
checkRole(["superadmin"]),async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Users Login Route
router.post("/login", async (req, res) => {
  console.log(req.body)
  await userLogin(req.body, res);
});

router.post("/updateFirstLogin", async (req, res) => {
  await updateFirstLogin(req, res);
});

router.post("/updatePoint", async (req, res) => {
  await updatePoint(req, res);
});
// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  
  return res.json(await getUserByToken(req, res));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

router.get("/google", googleLogin);
router.get(
  "/auth/google/callback", googlecallBack,
  async (req, res) => {
    await gooleToken(req,res);
  }
  );
module.exports = router;
