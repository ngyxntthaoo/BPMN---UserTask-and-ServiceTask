// const Nexmo = require('nexmo');
// const nexmo = new Nexmo({
//   apiKey: '413cf797',
//   apiSecret: 'UsomWw8VI1Lg9URC',
// }, {debug: true});

// // const Nexmo = require('nexmo');

// // const nexmo = new Nexmo({
// // 	apiKey: '413cf797',
// // 	apiSecret: 'UsomWw8VI1Lg9URC',
// // });

// const from = "Vonage APIs";
// const to = "84929689558";
// const text = "Hi from Node JS";

// var result = nexmo.message.sendSms(from, to, text); 

// console.log(result);

// // const Vonage = require('@vonage/server-sdk')

// // const vonage = new Vonage({
// //   apiKey: "413cf797",
// //   apiSecret: "UsomWw8VI1Lg9URC"
// // })
// // const from = "Vonage APIs"
// // const to = "8436344856"
// // const text = 'A text message sent using the Vonage SMS API'

// // vonage.message.sendSms(from, to, text, (err, responseData) => {
// //     if (err) {
// //         console.log(err);
// //     } else {
// //         if(responseData.messages[0]['status'] === "0") {
// //             console.log("Message sent successfully.");
// //         } else {
// //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
// //         }
// //     }
// // })

// const accountSid = 'AC3981d7183db53dcd5c6b8550a74cb5f4'; // Your Account SID from www.twilio.com/console
// const authToken = '162bdca5d2c2a2acdbce793638a08bdc'; // Your Auth Token from www.twilio.com/console

// const twilio = require('twilio');
// const client = new twilio(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Hello from Node',
//     to: '+84929689558', // Text this number
//     from: '+84366344856', // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));


// const accountSid = 'AC3981d7183db53dcd5c6b8550a74cb5f4'; 
// const authToken = '162bdca5d2c2a2acdbce793638a08bdc'; 
// const client = require('twilio')(accountSid, authToken); 
 
// client.messages 
//       .create({ 
//          body: 'Hello',  
//         //  messagingServiceSid: 'Khanh',      
//          to: '+84929689558' 
//        }) 
//       .then(message => console.log(message.sid)) 
//       .done();

const { Client, logger, Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);
client.subscribe("Send", async function({ task, taskService }) {
    const processVariables = new Variables();

    const Nexmo = require('nexmo')
    const nexmo = new Nexmo({
    apiKey: '413cf797',
    apiSecret: 'UsomWw8VI1Lg9URC',
    })
    let text = "Mã xác nhận của bạn là: abcxyz ";
    nexmo.message.sendSms("Nexmo", "+84929689558", text, {
    type: "unicode"
    }, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if (responseData.messages[0]['status'] === "0") {
        console.log("Message sent successfully.");
        } else {
        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
    })

    const unsuccess = "Gửi mã xác nhận thành công";
    processVariables.set("unsuccess",unsuccess);
    await taskService.complete(task, processVariables);
  });
