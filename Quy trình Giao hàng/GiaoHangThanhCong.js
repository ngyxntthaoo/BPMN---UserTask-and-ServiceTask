const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("ThongBaoThanhCong", async function({ task, taskService }) {
  const success = "Đơn hàng giao thành công";
  const processVariables = new Variables();
  processVariables.set("success",success);
  
  console.log('Đơn hàng giao thành công');
  await taskService.complete(task, processVariables);
});