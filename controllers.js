const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: "The Gmail API with NodeJS works",
    };
    const result = await transport.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getUser(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();
    console.log("token===>", token);
    const config = generateConfig(url, token);
    console.log("config==>", config);
    const response = await axios(config);
    console.log("res=====>", response);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getMails(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${
      req.params.email
    }/messages/?labelIds=${req.params.label.toUpperCase()}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data.messages);
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function searchMail(req, res) {
  try {
    const url = `https://www.googleapis.com/gmail/v1/users/me/messages?q=${req.params.search}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function readMail(req, res) {
  try {
    const url = `https://gmail.googleapis.com//gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    let data = await response.data;
    res.json(data);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getUser,
  sendMail,
  getMails,
  searchMail,
  readMail,
};
