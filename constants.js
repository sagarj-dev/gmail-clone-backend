require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: "jasani.sagar@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "Siddhant &lt;jasani.sagar@gmail.com>",
  to: "sagar.dev@tech.mekanism.cc",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};
