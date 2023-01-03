const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.get("/mail/user/:email", controllers.getUser);

router.get("/mail/send", controllers.sendMail);

router.get("/mail/all/:email/:label", controllers.getMails);

router.get("/mail/search/:search", controllers.searchMail);

router.get("/mail/read/:email/:messageId", controllers.readMail);

module.exports = router;
