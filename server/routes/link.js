const express = require("express");
const router = express.Router();
const {
  createShortLink,
  deleteLink,
  updateLink,
  getUserLinks, 
} = require("../controller/linkController");

const { getDailyClickStats, getDeviceStats } = require("../controller/statsController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/create", authMiddleware, createShortLink);
router.get("/mylinks", authMiddleware, getUserLinks); 
router.delete("/:id", authMiddleware, deleteLink);
router.put("/:id", authMiddleware, updateLink);
router.get('/stats/daily', authMiddleware, getDailyClickStats);
router.get('/devices', authMiddleware, getDeviceStats);



module.exports = router;
