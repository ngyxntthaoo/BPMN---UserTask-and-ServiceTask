const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");
// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);
client.subscribe("SendNotification", async function({ task, taskService }) {
    const unsuccess = "Liên kết không thành công";
    console.log(unsuccess);
    const processVariables = new Variables();
    processVariables.set("unsuccess",unsuccess);
    await taskService.complete(task, processVariables);
  });