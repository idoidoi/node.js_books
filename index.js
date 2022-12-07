
var express = require('express');
var app = express();
// var booksRouter = require('./books.js');
// var router = require('./router.js');
// var todos = require("./todo.js");
var messages = [];

app.use(express.json());
app.use(express.static('public'))
// app.use('/router',router);
// app.use('/books',booksRouter);
 

app.listen(3000,function(){
    console.log("3000포트로 웹서버 실행!");
}); 

app.post("/send", function(req, res){
    var massage = {
        sender: req.body.sender,
        ko: req.body.ko,
        en: req.body.en
    };
    console.log("여기1");
    // console.log(message);
    // messages.push(message);
    // res.status(200).send({message: "Success"});
    var options = {
        url:"https://openapi.naver.com/v1/papago/n2mt",
        form: {
            source: message.ko.length == 0 ? "en" : "ko",
            target: message.ko.length == 0 ? "ko" : "en",
            text: message.ko.length == 0 ? message.en : message.ko
        },
        headers: {
            "X-Naver-Client-Id": "DHuE9T0kv76JbvH85Wty",
            "X-Naver-Client-Secret": "jsfprW1fYH",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    };
    request.post(options, function(error, respose){
        var result = JSON.parse(response.body).message.result;
        message.ko = message.ko.length == 0 ? result.translatedText : message.ko;
        message.en = message.en.length == 0 ? result.translatedText : message.en;
        console.log("여기2");
        console.log(message);
        messages.push(message);
        res.status(200).send({ message: "Success"}); 
    })
});

app.get("/receive", function(req, res){
    var result = {total: messages.length, messages: []};
    
    if (messages.length > req.query.from) {
        result.messages = messages.slice(req.query.from) 
    }
    res.status(200).send(result);
});

// app.post("/todos", function(req,res){
//     todos = req.body.todos;
//     console.log(req.body);
//     res.status(200).send({massage: "success"});
// });

// app.get("/todos", function(req, res){
//     res.status(200).send(todos);
// })