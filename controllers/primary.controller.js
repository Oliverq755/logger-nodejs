const logger = require('../lib/loggerLib');
const response = require('../lib/responseLib');
var request = require('request');
const { json } = require('body-parser');


let testTimeLogger = async (req, res, next) => {
    let responseObject = {};
    logger.info({ Description: 'Module testTimeLogger | api test time logger execution started ', reqTime: timeFormater() });

    let responseTime = await responseTimeChecker();

    logger.info({ Description: 'Module testTimeLogger | api test time logger execution finished ', reqTime: timeFormater(), responseTime: responseTime });

    responseObject = response.generate(false, "execution finished", 200, responseTime);

    logger.info({ Description: 'Module testTimeLogger | api test time logger sending response to user ', reqTime: timeFormater(), responseTime: responseTime, responseSendTime: timeFormater() });

    res.send(responseObject);
}

let responseTimeChecker = () => {
    logger.info({ Description: 'Module responseTimeChecker | response time check started ', reqTime: timeFormater() });
    return new Promise((resolve, reject) => {
        request.get({
            url: 'https://google.com',
            time: true
        }, (err, urlResponse) => {
            logger.error({ Description: 'Module responseTimeChecker | response time error ', error: JSON.stringify(err), reqTime: timeFormater() });
            if (err) {
                reject(err);
            } else {
                let currentTimeFormat = timeFormater();
                let promiseResponse = {
                    responseTimeFormate: currentTimeFormat,
                    totalTimeTaken: urlResponse.elapsedTime,
                }
                logger.info({ Description: 'Module responseTimeChecker | response time check executed successfully ', response: JSON.stringify(promiseResponse), reqTime: timeFormater() });

                resolve(promiseResponse);
            }
        });
    })
}

let timeFormater = () => {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currenMin = currentDate.getMinutes();
    let currentSec = currentDate.getSeconds();
    let currentMilliseconds = currentDate.getMilliseconds();
    let currentTimeFormat = currentHour.toString() + ":" + currenMin.toString() + ":" + currentSec.toString() + ":" + currentMilliseconds.toString();
    return currentTimeFormat;
}


module.exports = {
    testTimeLogger,
}
