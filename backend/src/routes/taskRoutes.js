const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { body } = require("express-validator");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// User routes
router.post(
  "/",
  [
    verifyToken,
    body("title")
      .isString()
      .notEmpty()
      .withMessage("Title is required and must be a string"),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required and must be a string"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Status must be one of: pending, in-progress, completed"),
  ],
  createTask
);
router.get("/", verifyToken, getTasks);
router.put("/:id", verifyToken, authorizeRoles("admin", "user"), updateTask);

router.delete("/:id", verifyToken, authorizeRoles("admin", "user"), deleteTask);

module.exports = router;
