const { Client, logger, Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("SaveInfor", async function({ task, taskService }) {
  const name = task.variables.get("name");
  const phoneNumber = task.variables.get("phoneNumber");
  const time = task.variables.get("time");
  const problem = task.variables.get("problem");
  const product = task.variables.get("product");
  const solve = task.variables.get("solve");
  console.log("Họ tên khách hàng: " + name);
  console.log("Số điện thoại khách hàng: " + phoneNumber);
  console.log("Thời gian khiếu nại: " + time);
  console.log("Vấn đề khiếu nại: " + problem);
  console.log("Sản phẩm khiếu nại: " + product);
  console.log("Phương án giải quyết: " + solve);
  const processVariables = new Variables();
  var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost:8080",
  user: "",
  password: "",
  database: "khieunai"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Ket noi thanh cong");
  var sql = "INSERT INTO KhieuNai (ten,sdt,thoigian,vande,sanpham,phuongan) VALUES (name, phoneNumber,time,problem,product,solve)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Don khieu nai duoc luu");
  });
});
  await taskService.complete(task, processVariables);
});
