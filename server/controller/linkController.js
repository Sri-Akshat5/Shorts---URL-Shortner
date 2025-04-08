const Link = require("../modules/Link");
const generateShortCode = require("../utils/generateShortCode");

async function createShortLink(req, res) {
  const { longUrl, customAlias, expiresAt } = req.body;
  const userId = req.user?.userId; 
  
console.log("UserId from req.user:", userId);

  try {
    let shortCode = customAlias || generateShortCode();

    const existing = await Link.findOne({ shortCode });
    if (existing)
      return res.status(400).json({ message: "Custom alias already in use" });

    const newLink = new Link({
      userId,
      longUrl,
      shortCode,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    await newLink.save();

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    res.status(201).json({ shortUrl });
  } catch (err) {
    console.error("Error creating short link:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

const deleteLink = async (req, res) => {
    try {
      const link = await Link.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
      if (!link) return res.status(404).json({ message: "Link not found or unauthorized" });
      res.json({ message: "Link deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  const updateLink = async (req, res) => {
    const { longUrl, expiresAt } = req.body;
  
    try {
      const updateFields = { longUrl };
  
      // Only include expiresAt if it's provided (can be null to remove expiration)
      if (expiresAt !== undefined) {
        updateFields.expiresAt = expiresAt ? new Date(expiresAt) : null;
      }
  
      const link = await Link.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        updateFields,
        { new: true }
      );
  
      if (!link) return res.status(404).json({ message: "Link not found or unauthorized" });
  
      res.json(link);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
      
  const getUserLinks = async (req, res) => {
    try {
      const userId = req.user.userId; // ✅ authenticated user
      const links = await Link.find({ userId });
  
      // Build full short URLs
      const linksWithShortUrl = links.map((link) => ({
        ...link.toObject(),
        shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
      }));
  
      res.json({ links: linksWithShortUrl });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

module.exports = { createShortLink, deleteLink, updateLink, getUserLinks, };
