
export const healthCheck = (req, res) => {
  res.json({
    status: "ok",
    message: "Server is healthy ✅",
    uptime: process.uptime()
  });
};

export const getVersion = (req, res) => {
  res.json({
    name: "LinkedInReviewer API",
    version: "1.0.0"
  });
};
