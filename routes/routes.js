const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/primary.controller');
const appConfig = require('../configuration/appConfig');


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/gkb`;

    app.get(`${baseUrl}/`, theaterController.testTimeLogger);


}
