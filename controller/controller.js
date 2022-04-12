const service = require('../services/service');
const common = require('../common/common');

class Controller {
    async createIssue(req, res) {
        common.parseJsonRequest(req, async function (request) {
            var rules = {
                description: 'required',
            }
            // Check validation rules
            if (common.checkValidationRulesJson(request, res, rules)) {
                let description = request.description;
                await service.createIssue(description)
                .then(result => {
                    common.sendJSONResponse(res, result.code, result.msg, result.response);
                })
            }
        });
    }

    async statusComplete(req, res) {
        common.parseJsonRequest(req, async function (request) {
            var rules = {
                issue_id: 'required',
            }
            // Check validation rules
            if (common.checkValidationRulesJson(request, res, rules)) {
                let issue_id = request.issue_id;
                await service.completeStatus(issue_id)
                .then(result => {
                    common.sendJSONResponse(res, result.code, result.msg, result.response);
                })
            }
        });
    }
}

module.exports = Controller;