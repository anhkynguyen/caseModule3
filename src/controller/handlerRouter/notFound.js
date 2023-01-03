const fs = require("fs");
class NotFound {
  handlerNotFound(req, res) {
    fs.readFile("./views/err/NotFound.html", "utf-8", (err, notFoundHTML) => {
      if (err) {
        console.log(err.message);
      } else {
        res.writeHead(200, "text/html");
        res.write(notFoundHTML);
        res.end();
      }
    });
  }
}
module.exports = new NotFound();
