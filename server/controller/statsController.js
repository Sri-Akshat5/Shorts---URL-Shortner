const Click = require('../modules/Click');
const mongoose = require("mongoose");


const getDailyClickStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    

    const clicks = await Click.find({ userId });

    if (!clicks.length) {
  
      return res.json({ dailyClicks: [] });
    }

    const clickMap = {};

    clicks.forEach(click => {
      const date = click.createdAt.toISOString().split('T')[0];
      if (!clickMap[date]) {
        clickMap[date] = 0;
      }
      clickMap[date]++;
    });

    const dailyClicks = Object.entries(clickMap).map(([date, clicks]) => ({
      date,
      clicks,
    }));

    dailyClicks.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({ dailyClicks });
  } catch (err) {
    console.error('❌ Error fetching daily click stats:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getDeviceStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const deviceStats = await Click.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = {};
    deviceStats.forEach(stat => {
      stats[stat._id || "Unknown"] = stat.count;
    });

    res.json({ deviceStats: stats });
  } catch (err) {
    console.error("❌ Error fetching device stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getDailyClickStats, getDeviceStats };
