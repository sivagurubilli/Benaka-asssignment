const express = require("express");
const {
  getAllUsers,
  addUser,
  deleteUser,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", protect, authorize(["admin"]), getAllUsers);
router.post("/", protect, authorize(["admin"]), addUser);
router.delete("/:id", protect, authorize(["admin"]), deleteUser);

router.get("/profile", protect, getProfile);
router.put("/profile/update", protect, updateProfile);

module.exports = router;
