# Support Agent

Install
---
Npm install

MYSQL Connection
---
dbconfig.js 

MYSQL Query
---
1. File Name
     * issue.sql
2. Note: You have to create database and run the query from file(issue.sql). 

API
***
Create Issue
--- 
1. Method 
     * POST
2. URL
     * `http://localhost:4000/api/create-issue`

## DESCRIPTION
1. CASE 1
  *  We create a issue after adding description.
  *  Data should be saved in the issue table and automatically assign to the free agent then status  should be process in the issue table
  *  We can check relation between issue and agent in agent_issue_rel table.
  *  Status should be progress.
2. CASE 2 
  * If we create another issue after adding description.
  * Data should be saved in the issue table and no agent is free then status code should be pending in the issue table.
3. CASE 3
  * A agent can take one issue at a time after completion of task automatically assign to the another task. 
   
Complete Status
---
1. Method 
     * POST
2. URL
    * `http://localhost:4000/api/complete-status`
  
### DESCRIPTION
1. CASE 1
   * We can complete status after adding issue_id.
   * Then pending task should be automatically assign to the free support agent.

#### NOTE
We have to insert directly agent name in the database.I have created only table.


  

