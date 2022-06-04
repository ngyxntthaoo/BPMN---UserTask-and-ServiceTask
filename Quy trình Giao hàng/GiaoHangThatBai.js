const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("ThongBaoThatBai", async function({ task, taskService }) {
  const fail = "Đơn hàng giao không hành công";
  const processVariables = new Variables();
  processVariables.set("fail",fail);
  
  console.log('Đơn hàng giao không thành công');
  await taskService.complete(task, processVariables);
});