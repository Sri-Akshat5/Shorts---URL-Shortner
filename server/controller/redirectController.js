const Link = require("../modules/Link");
const Click = require("../modules/Click");

const handleRedirect = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const link = await Link.findOne({ shortCode });

    if (!link) {
      return res.status(404).json({ message: "Short link not found" });
    }

    // Check expiration
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return res.status(410).json({ message: "Link has expired" });
    }

    // Update click count
    link.totalClicks += 1;
    await link.save();

    // Parse device/browser info from user-agent
    const userAgent = req.headers["user-agent"];
    const ip = req.ip || req.connection.remoteAddress;

    // Quick parser (could use UA-parser lib for more detail)
    const isMobile = /mobile/i.test(userAgent);
    const device = isMobile ? "Mobile" : "Desktop";
    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)/i);
    const browser = browserMatch ? browserMatch[0] : "Unknown";

    // Save click log
    await Click.create({
      linkId: link._id,   
      userId: link.userId,
      ip,
      device,
      browser,
    });

    // Redirect to long URL
    res.redirect(link.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleRedirect };
