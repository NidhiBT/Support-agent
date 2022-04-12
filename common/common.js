var Validator = require('Validator');

var commonFunctions = {

    parseJsonRequest: function(request, callback){
        try {
            if (request.body){
                callback(request.body);
            } else {
                callback({});
            }
        } catch(err) {
            console.log(err)
            callback({});
        }
    },

    checkValidationRulesJson: function(request, response, rules){
        var v = Validator.make(request, rules);
        if (v.fails()) {
            var Validator_errors = v.getErrors();
            for (var key in Validator_errors) {
                error = Validator_errors[key][0];
                break;
            }
            response_data = {
                code: '0',
                message: error
            };
            response.status(200).json(response_data);
            return false;
        } else {
            return true;
        }
    },

    sendJSONResponse: function(res, responsecode, responsemessage, responsedata){
        if (responsedata !== null) {
            response_data = {
                code: responsecode,
                message: responsemessage,
                data: responsedata
            };
            res.status(200).json(response_data);
        } else {
            response_data = {
                code: responsecode,
                message: responsemessage
            };
            res.status(200).json(response_data);
        }
    },
}

module.exports = commonFunctions;