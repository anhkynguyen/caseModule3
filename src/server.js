const http = require("http");
const fs = require("fs");
const qs = require('qs')
const url = require("url");
const router = require("./controller/router");
const notFound = require("./controller/handlerRouter/notFound");
const typeFile = {
  jpg: "images/jpg",
  png: "images/png",
  js: "text/javascript",
  css: "text/css",
  svg: "image/svg+xml",
  ttf: "font/tff",
  woff: "font/woff",
  woff2: "font/woff",
  eot: "application/vnd.ms-fontObject",
};
const server = http.createServer((req, res) => {
  let pathName = url.parse(req.url, true).pathname;
  const checkPath = pathName.match(
    /\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/
  );
  if (checkPath) {
    const contentType = typeFile[checkPath[0].toString().split(".")[1]];
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(__dirname + req.url).pipe(res);
  } else {
    const arrPath = pathName.split("/");
    let id = ''
    
    let trimPath = "";
   
    if (arrPath.length === 2) {
      trimPath = arrPath[arrPath.length-1];
    }
    else{
      trimPath =arrPath[arrPath.length-2]
      id = arrPath[arrPath.length-1]
    }
    let chosenHandler;
    if (typeof router[trimPath] === "undefined") {
      chosenHandler = notFound.handlerNotFound;
    } else {
      chosenHandler = router[trimPath];
    }
    chosenHandler(req, res,id);
  }
});
server.listen(8080, () => {
  console.log("server is running!!!");
});
