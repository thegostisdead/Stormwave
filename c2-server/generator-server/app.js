var express = require('express');
var path = require('path');
var logger = require('morgan');
var fs = require('fs');

const ROOT_PATH = "/generated"; 
const POWERSHELL_PATH = "/powershell"; 
const DLL_PATH = "/dll"
const AGENT_PATH = "/agent"; 

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// each function shoud return a path 
function createPowershell() {
  
  // read file 
  const file = "powershell.template"
  
  let script = fs.readFileSync(file).toString();

  
  // replace text 
  script = script.replace("dog", "monkey") 


  // save to location 
  // return path 

};

function createDll() {
  
};

function createAgent() {

};


app.get("/powershell", (req, res) => {
  console.log("Generating a powershell script...");
  res.download(createPowershell()); 
});


app.get("/dll", (req, res) => {
  console.log("Generating a DLL"); 
  res.download(createDll()); 
});


app.get("/agent", (req, res) => {
  console.log("Generation a new agent");   
  res.download(createAgent()); 
});


module.exports = app;
