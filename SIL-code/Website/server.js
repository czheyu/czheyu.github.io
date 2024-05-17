const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const path = require("path");
app.use(express.json());

var url = "https://czheyuchatapp.onrender.com";
//url = "https://9f385a7a-d4b2-4c35-b8fc-9937e0c39c58-00-zrl36mrg5918.picard.replit.dev:3001";

app.get("/", (req, res) => {
  //console.log("GET / called");
  res.sendFile(__dirname + "/home/index.html");
});

app.get("/style.css", (req, res) => {
  //console.log("GET /style.css called");

  res.sendFile(__dirname + "/home/style.css");
});

app.get("/chatlist", (req, res) => {
  //console.log("GET /chatlist called");
  res.sendFile(__dirname + "/chatlist/index.html");
});
app.get("/chatlist/index.js", (req, res) => {
  //console.log("GET /chatlist/index.js called");
  res.sendFile(__dirname + "/chatlist/index.js");
});

app.get("/chat", (req, res) => {
  res.redirect(url + "/chatlist");
});

app.get("/chatapp/:chatid", (req, res) => {
  //console.log("GET /chat called");

  res.send(
    fs
      .readFileSync(__dirname + "/chatpage/index.html", "utf8")
      .replaceAll("CHATIDREPLACE", req.params.chatid),
  );
  //send jsfile that sets var chatid to req.params.chatid
});

app.get("/chatapp/:chatid/index.js", (req, res) => {
  //console.log("GET /chat/:chatid/index.js called");

  res.sendFile(__dirname + "/chatpage/index.js");
});

app.get("/chat/login", (req, res) => {
  //console.log("GET /chat/login called");

  res.sendFile(__dirname + "/loginpage/index.html");
});

app.get("/chat/login/index.js", (req, res) => {
  //console.log("GET /chat/login/index.js called");

  res.sendFile(__dirname + "/loginpage/index.js");
});

app.get("/chat/register", (req, res) => {
  console.log("GET /chat/register called");

  res.sendFile(__dirname + "/registerpage/index.html");
});

app.get("/chat/register/index.js", (req, res) => {
  //console.log("GET /chat/register/index.js called");

  res.sendFile(__dirname + "/registerpage/index.js");
});

app.post("/api/deletemsg", (req, res) => {
  //console.log("POST /chat/deletemsg called");
  if (
    checkuser(req.body.password, req.body.username) &&
    checkaccess(req.body.chatid, req.body.password, req.body.username)
  ) {
    res.send(
      deleteMessage(
        req.body.chatid,
        req.body.id,
        req.body.username,
        req.body.password,
      ),
    ); //need
  } else {
    //console.log("wrong password or username- msgget");
  }
});

app.post("/api/messagesget", (req, res) => {
  if (
    checkuser(req.body.password, req.body.username) &&
    checkaccess(req.body.chatid, req.body.password, req.body.username)
  ) {
    let chatdata = getchatdatabyid(req.body.chatid)
    if(chatdata!=null){
      res.send(chatdata); //need
    }else{
      res.send(["accessfailed"])
    }
  } else {
    res.send(["accessfailed"])
    //console.log("wrong password or username- msgget");
  }
});

app.post("/api/messagesend", (req, res) => {
  //console.log("POST /api/messagesend called");
  if (
    checkuser(req.body.password, req.body.username) &&
    checkaccess(req.body.chatid, req.body.password, req.body.username)
  ) {
    const posted = handlePost(req.body.chatid, req.body, res)
    res.send(posted.result); 
  }
});

app.post("/api/login", (req, res) => {
  //console.log("POST /api/login called");
  const loginattempt = checkuser(req.body.password, req.body.username);
  res.send(loginattempt); //need
  //console.log("Attempted to login: " +"\n" + loginattempt + "\nusername: " + req.body.password + "\npassword: " + req.body.username,);
});

app.post("/api/register", (req, res) => {
  //console.log("POST /api/register called");
  res.send(checkregis(req.body.password, req.body.username));
});

app.post("/api/getchats", (req, res) => {
  //console.log("POST /api/getchats called");
  if (checkuser(req.body.password, req.body.username)) {
    res.send(getallchatsbyuser(req.body.username)); //need
  } else {
    //console.log("wrong password or username- msgget");
  }
});

app.post("/api/createchat",(req,res) => {
  //console.log("POST /api/createchat called");
  if(JSON.parse(checkuser(req.body.password,req.body.username)).result == "success"){
    res.send(createchat(req.body.username,req.body.chatname));
  }
  
});
app.post("/api/chatnamebyid",(req,res) =>{
  //console.log("POST /api/chatnamebyid called");
  if(JSON.parse(checkuser(req.body.password,req.body.username)).result == "success"){
    res.send(chatnamebyid(req.body.chatid,req.body.username))
  }
  
});

app.post("/api/getuserinchat",(req,res) =>{
  //console.log("POST /api/getuserinchat called");
  if(JSON.parse(checkuser(req.body.password,req.body.username)).result == "success"){
    res.send(getusersinchat(req.body.chatid,req.body.username))
  }
});

app.post("/api/invitetochat",(req,res) =>{
  //console.log("POST /api/invitetochat called");
  if(JSON.parse(checkuser(req.body.password,req.body.username)).result == "success"){
    res.send(invitetochat(req.body.chatid,req.body.usernametoinvite,req.body.username))
  }

});

app.post("/api/removefromchat",(req,res) =>{
  //console.log("POST /api/removefromchat called");
  if(JSON.parse(checkuser(req.body.password,req.body.username)).result == "success"){
    res.send(removefromchat(req.body.chatid,req.body.usernametoremove,req.body.username))
  }

});

app.post("/api/getusers",(req,res) =>{
  //console.log("POST /api/getusers called");
  if(JSON.parse(checkuser(req.body.password,req.body.username)).result == "success"){
    res.send(getusers())
  }

});

app.post("/api/deletechat",(req,res) =>{
  //console.log("POST /api/deletechat called");
  if(JSON.parse(checkuser(req.body.password,req.body.username)).result == "success"&&checkaccess(req.body.chatid,req.body.password,req.body.username)){
    res.send(deletechat(req.body.chatid,req.body.username))
  }

});

//for cronjob:
app.get("/cron",(req,res) =>{
  res.send("cronjobed");
});





function getalldata(){
  let data = require("./data.json");
  let userdata = require("./userdata.json");
  console.log(data)
  console.log(userdata)
  if (typeof(data) == "string"){
    data = JSON.parse(data)
  }
  if (typeof(userdata) == "string"){
    data = JSON.parse(userdata)
  }
  return {"data":data,"userdata":userdata};
}

app.post("/getalldata",(req,res) =>{
  console.log("alldata atempted")
  console.log(req.body.id)
  console.log(process.env.id)
  if(req.body.id==process.env.id){
    console.log("id is correct")
    let getalldataresult = getalldata();
    res.send(getalldataresult);
    console.log("alldata sent")
    console.log(getalldataresult)
  }
})

  function getdata(){
  const http = require("https");
  
  const url = 'https://czheyuchatapp.onrender.com/getalldata';
  
  const options = {
      method: 'POST',
      'Content-Type': 'application/json',
  };
  
  const data = '{"id":"skibidiwafaunnafinafsanjiafsnjifjn123j5ni21Yb2bBg1bgb31hu"}';
  
  let result = '';
  const req = http.request(url, options, (res) => {
      console.log(res.statusCode);
  
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
          result += chunk;
      });
  
      res.on('end', () => {
        console.log("got data:")
        console.log(result)
  
        fs.writeFileSync(
          __dirname + "/data.json",JSON.stringify(JSON.parse(result).data))
  
        fs.writeFileSync(
        __dirname + "/userdata.json",JSON.stringify(JSON.parse(result).userdata))
      });
  });
  
  req.on('error', (e) => {
      console.error(e);
  });
  
  req.write(data);
  req.end();
}
getdata();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


function generatechatid(listofcurrentids){
  //8 digit- meaning ~1bil ids
  let newid;
  let found = false;
  while(found==false){
    newid = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
    if(!listofcurrentids.includes(newid)){
       found=true
    }
  }
  return newid
}

function deletechat(chatid,username){
  let data = require('./data.json');
  for(let i = 0; i<data.chats.length; i++){
    if(data.chats[i].id == chatid){
      console.log(username+" deleted chat: "+data.chats[i].name+"(id:"+data.chats[i].id+")");
      data.chatids.splice(data.chatids.indexOf(chatid),1);
      data.chats.splice(i,1);
      data.chatscount -= 1;
      fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data));
      return JSON.stringify({result: "success"})
    }
  }
  return JSON.stringify({result: "error"})

}

function getusers(){
  const userdata = require('./userdata.json');
  let userdataarray = [];
  for (let i = 0; i < userdata.users.length; i++){
    userdataarray.push(userdata.users[i].username);
  }
  return userdataarray;
}

function removefromchat(id,usernametoremove,username){
    const data = require("./data.json");
    for (let i = 0; i < data.chats.length; i++) {
      if (data.chats[i].id == id && data.chats[i].users.includes(username)&& data.chats[i].users.includes(usernametoremove)) {
        data.chats[i].users.splice(data.chats[i].users.indexOf(usernametoremove),1);
        const alert = {"id":data.chats[i].countaccess,"type":"alert","value":`${usernametoremove} was removed by ${username}`};

        data.chats[i].countaccess += 1;

        data.chats[i].data.push(alert);
        fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data));
        console.log(`${username}removed ${usernametoremove} from chat: ${data.chats[i].name} (id:${data.chats[i].id})`);
      }
    }
  return getusersinchat(id,username);
}

function createchat(user, chatname) {
  const entiredata = require("./data.json");
  const chatid = generatechatid(entiredata.chatids);

  const data = {
    users: [user],
    id: chatid,
    name: chatname,
    countaccess: 1,
    settings:{},
    data: [{"id":0,"username":"","type":"alert","value":`Chat Created by ${user}`,"date":new Date().toISOString(),"replying":false,"replyingtoID":null}],
  };
  console.log("created chat: "+chatname+"(id:"+chatid+")");

  entiredata.chatids.push(chatid);
  entiredata.chatscount += 1;

  entiredata.chats.push(data);
  fs.writeFileSync(__dirname+"/data.json", JSON.stringify(entiredata));
  return JSON.stringify({result: "success"});
}

function chatnamebyid(id,user){
  const data = require("./data.json")
  for(let i = 0; i<data.chats.length; i++){
    if (data.chats[i].id == id && data.chats[i].users.includes(user)){
      return `{"result": "${data.chats[i].name}"}`
    }
  }
  return false
}

function invitetochat(chatid, usernametoinvite,user) {
  const data = require("./data.json");
  for (let i = 0; i < data.chats.length; i++) {
    if (data.chats[i].id == chatid && data.chats[i].users.includes(user)&& !data.chats[i].users.includes(usernametoinvite)) {
      data.chats[i].users.push(usernametoinvite);
      const alert = {"id":data.chats[i].countaccess,"type":"alert","value":`${usernametoinvite} was added by ${user}`};
      
      data.chats[i].countaccess += 1;

      data.chats[i].data.push(alert);
      
      fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data));
      console.log(`${user} added ${usernametoinvite} from chat: ${data.chats[i].name} (id:${data.chats[i].id})`);
    }
  }
  return getusersinchat(chatid,user);
}

function getusersinchat(id,user) {
  const data = require("./data.json")
  let response = "["
  for(let i = 0; i<data.chats.length; i++){
    if (data.chats[i].id == id && data.chats[i].users.includes(user)){
      for (let j = 0; j<data.chats[i].users.length; j++){
        response += '"'+data.chats[i].users[j] + '"';
        if (j != data.chats[i].users.length-1){
          response += ',';

        }
      }
      response += "]"
      //console.log(`{"result": ${response}}`)
      return `{"result": ${response}}`

    }
  }

  return false
}

function pushdatatochatbychatid(index, data, chatid) {
  const entiredata = require("./data.json");
  entiredata.chats[index] = data;
  //console.log("pushdatatochatbychatid: "+JSON.stringify(data))
  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(entiredata));
  return;
}

function getallchatsbyuser(username) {
  const data = require("./data.json");
  const chats = data.chats;
  let listofchats = [];
  for (let i = 0; i < chats.length; i++) {
    if (chats[i].users.includes(username)) {
      listofchats.push({id:chats[i].id,name:chats[i].name,lastmessage:chats[i].data[chats[i].data.length-1]});
    }
  } //return list of ids
  return listofchats;
}

function checkaccess(chatid, pass, user) {
  const chatdata = getchatdatabyid(chatid);
  if (chatdata == null) {
    return false;
  }
  if (chatdata.users.includes(user)) {
    return true;
  }
  return false
}

function getchatdatabyid(id) {
  const data = require("./data.json");
  const chats = data.chats;
  for (let i = 0; i < chats.length; i++) {
    if (chats[i].id == id) {
      return chats[i];
    }
  }
  return null;
}

function deleteMessage(chatid, id, user, pass) {
  const data = getchatdatabyid(chatid);
  if (data == null) {
    return '{"result":false}';
  }
  for (let i = 0; i < data.data.length; i++) {
    if (
      data.data[i].id == id &&
      data.data[i].username == user &&
      JSON.parse(checkuser(pass, user)).result == "success"
    ) {
      data.data[i].type = "deleted";
      data.data[i].value = null;
      pushdatatochatbychatid(
        require("./data.json").chats.indexOf(data),
        data,
        chatid,
      );
      return getchatdatabyid(chatid);
    }
  }
}

function checkuser(pass, user) {
  const jsonuserdata = require("./userdata.json");
  for (let i = 0; i < jsonuserdata.users.length; i++) {
    if (
      jsonuserdata.users[i].username == user &&
      jsonuserdata.users[i].password == pass
    ) {
      return '{"result":"success"}';
    }
  }
  return '{"result":"failed"}';
}

function checkregis(pass, user) {
  if (user == "select user") {
    return '{"result":"username taken"}';
  }
  let jsonuserdata = require("./userdata.json");
  for (let i = 0; i < jsonuserdata.users.length; i++) {
    if (jsonuserdata.users[i].username == user) {
      return '{"result":"username taken"}';
    }
  }

  //if runs till here: means username isnt taken
  jsonuserdata = require("./userdata.json");
  jsonuserdata.users.push({
    id: jsonuserdata.usercount,
    username: user,
    password: pass,
  });
  jsonuserdata.usercount++;
  fs.writeFile(
    path.join(__dirname, "/userdata.json"),
    JSON.stringify(jsonuserdata),
    (err) => {
      // Checking for errors
      if (err) throw err;

      // Success
    },
  );
  return '{"result":"success"}';
}


function filtertext(text){
  let text_to_be_altered= text;
  const words = require("./filterwords.json");
  for(let i=0;i<words.length;i++){

    let searchMask = words[i].word;
    let regEx = new RegExp(searchMask, "ig");
    let replaceMask = words[i].replacement;
    

    text_to_be_altered = text_to_be_altered.replaceAll(regEx, replaceMask)
  }
  return text_to_be_altered
}

function handlePost(chatid, reqbody, res) {
  const jsondata = getchatdatabyid(chatid);
  if (jsondata == null) {
    return '{"result":false}';
  }
  const id = writeData(
    reqbody.type,
    reqbody.username,
    filtertext(reqbody.value).substring(0, 1000),
    reqbody.replying,
    reqbody.replyingtoID,
    jsondata,
    chatid,
  );


  return {result:getchatdatabyid(chatid),id:id}
}

function writeData(
  type,
  username,
  value,
  replying,
  replyingtoID,
  data,
  chatid,
) {
  let dataarray = data;
  let id = dataarray.countaccess
  let dataadding = {
    id: id,
    username: username,
    type: type,
    value: value,
    date: new Date().toISOString(),
    replying: replying,
    replyingtoID: replyingtoID,
  };
  dataarray["data"].push(dataadding);
  dataarray.countaccess++;
  pushdatatochatbychatid(
    require("./data.json").chats.indexOf(dataarray),
    dataarray,
    chatid,
  );
  return id
}