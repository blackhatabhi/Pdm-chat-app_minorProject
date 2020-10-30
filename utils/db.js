var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/pdmchatapp";

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
 
 
    console.log("connect to pdmchatapp");
    client.on('connection', function(){
      let chat = db.collection('chat');

      sendStatus = (s)=>{
        socket.emit('status',s);
      } 
      chat.find().limit(100).sort({_id:1}).toArray(function(err,res){
        if(err){
          throw err;
        }

        socket.emit('output',res);
      });

      socket.on('input', function(){
        let name = data.name;
        let message = data.message;

        if(name == '' || message == ''){
sendStatus('plss enter the message');
        }
        else{
          chat.insert({name:name, message:message} , function(){
            client.emit('output',[data]);

            sendStatus({
              message: 'Message sent',
              clear : true
            })
          })
        }
      })
    });
  });
