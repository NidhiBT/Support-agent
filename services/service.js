const db = require('../dbconfig');
var Services = {

    createIssue: async function(description) {
        return new Promise(async (resolve, reject)=>{
            let query = `INSERT INTO issue(description, status) VALUES ("${description}",'pending')`;
            await db.query(query, async function (error, result) {
                if (error) {
                    console.log(error)
                    return reject({
                        code: 0,
                        msg: 'Problem in creating issue. Please try again.',
                        response: null
                    });
                } else {
                    var issue_id = result.insertId;
                    let query = `SELECT * FROM agents WHERE agent_id NOT IN (SELECT agent_id FROM agent_issue_rel air INNER JOIN issue i ON air.issue_id = i.issue_id WHERE i.status IN ('pending', 'progress'))`;
                    await db.query(query, async function (error, result) {
                        if (error) {
                            console.log(error)
                            return reject({
                                code: 0,
                                msg: 'Problem in creating issue. Please try again.',
                                response: null
                            });
                        } else {
                            console.log(result)
                            if (result[0] !== undefined){
                                let query = `INSERT INTO agent_issue_rel(agent_id, issue_id) VALUES ("${result[0].agent_id}","${issue_id}")`;
                                await db.query(query, async function (error, result) {
                                    if (error) {
                                        console.log(error)
                                        return reject({
                                            code: 0,
                                            msg: 'Problem in assigning agent. Please try again.',
                                            response: null
                                        });
                                    } else {
                                        let query = `UPDATE issue SET status = 'progress' WHERE issue_id = "${issue_id}"`;
                                        await db.query(query, async function (error, result) {
                                            if (error) {
                                                console.log(error)
                                                return reject({
                                                    code: 0,
                                                    msg: 'Problem in updating issue status. Please try again.',
                                                    response: null
                                                });
                                            } else {
                                                return resolve({
                                                    code: 1,
                                                    msg: 'Issue created successfully',
                                                    response: true
                                                });
                                            }
                                        });
                                    }
                                });
                            } else {
                                return resolve({
                                    code: 1,
                                    msg: 'Issue created successfully',
                                    response: true
                                });
                            }
                        }
                    })
                }
            })
        });
    },

    completeStatus: async function(issue_id) {
        return new Promise(async (resolve, reject)=>{
            let query = `UPDATE issue SET status = 'completed' WHERE issue_id = ${issue_id} AND status = 'progress';`;
            await db.query(query, async function (error, result) {
                if (error) {
                    console.log(error)
                    return reject({
                        code: 0,
                        msg: 'Problem in updating issue status. Please try again.',
                        response: null
                    });
                } else {
                    let query = `SELECT * FROM issue WHERE status = 'pending' LIMIT 1`;
                    await db.query(query, async function (error, result) {
                        if (error) {
                            console.log(error)
                            return reject({
                                code: 0,
                                msg: 'Problem in getting issue list. Please try again.',
                                response: null
                            });
                        } else {
                            if (result[0] !== undefined){
                                var issue_id = result[0].issue_id;
                                let query = `SELECT * FROM agents WHERE agent_id NOT IN (SELECT agent_id FROM agent_issue_rel air INNER JOIN issue i ON air.issue_id = i.issue_id WHERE i.status IN ('pending', 'progress'))`;
                                await db.query(query, async function (error, result) {
                                    if (error) {
                                        console.log(error)
                                        return reject({
                                            code: 0,
                                            msg: 'Problem in getting agent list. Please try again.',
                                            response: null
                                        });
                                    } else {
                                        if (result[0] !== undefined){
                                            let query = `INSERT INTO agent_issue_rel(agent_id, issue_id) VALUES ("${result[0].agent_id}","${issue_id}")`;
                                            await db.query(query, async function (error, result) {
                                                if (error) {
                                                    console.log(error)
                                                    return reject({
                                                        code: 0,
                                                        msg: 'Problem in assigning agent. Please try again.',
                                                        response: null
                                                    });
                                                } else {
                                                    let query = `UPDATE issue SET status = 'progress' WHERE issue_id = "${issue_id}"`;
                                                    await db.query(query, async function (error, result) {
                                                        if (error) {
                                                            console.log(error)
                                                            return reject({
                                                                code: 0,
                                                                msg: 'Problem in updating issue status. Please try again.',
                                                                response: null
                                                            });
                                                        } else {
                                                            return resolve({
                                                                code: 1,
                                                                msg: 'Issue status updated successfully',
                                                                response: true
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            return resolve({
                                                code: 1,
                                                msg: 'Issue status updated successfully',
                                                response: true
                                            });
                                        }
                                    }
                                })
                            } else {
                                return resolve({
                                    code: 1,
                                    msg: 'Issue status updated successfully',
                                    response: true
                                });
                            }
                        }
                    });
                }
            })
        });
    }
}
module.exports = Services;
