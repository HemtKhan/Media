const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const file = path.resolve(__dirname, "../../services.json");
    const data = fs.readFileSync(file, "utf8");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unable to load services" })
    };
  }
};
