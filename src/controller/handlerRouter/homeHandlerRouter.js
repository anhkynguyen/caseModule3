const fs = require("fs");
const qs = require("qs");

const productService = require("../../service/productService");
class HomeHandlerRouter {
  static getHomeHtml(homeHtml, products) {
    let tbody = "";
    products.map((product, index) => {
      tbody += `
    <tr>
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><img src="./public/${product.image}" alt ='Not Found' style =" width : 200px; height : 200px" ></td>
          <td><a href = "/delete/${product.id}"><button>Delete</button></a></td>
          <td><a href = "/edit/${product.id}"><button>Edit</button></a></td>
        </tr> 
    `;
    });
    homeHtml = homeHtml.replace("{products}", tbody);
    return homeHtml;
  }

  showHome(req, res) {
    fs.readFile("./views/home.html", "utf-8", async (err, homeHtml) => {
      if (err) {
        console.log(err.message);
      } else {
        let products = await productService.findAll();
        homeHtml = HomeHandlerRouter.getHomeHtml(homeHtml, products);
        res.writeHead(200, "text/html");
        res.write(homeHtml);
        res.end();
      }
    });
  }
  createProduct(req, res) {
    if (req.method === "GET") {
      fs.readFile("./views/create.html", "utf-8", async (err, createHtml) => {
        if (err) {
          console.log(err.message);
        } else {
          res.writeHead(200, "text/html");
          res.write(createHtml);
          res.end();
        }
      });
    } else {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", (err) => {
        if (err) {
          console.log(err);
        } else {
          const product = qs.parse(data);
          productService.save(product);
          res.writeHead(301, { location: "/home" });
          res.end();
        }
      });
    }
  }
  async deleteProduct(req, res, id) {
    if (req.method === "GET") {
      fs.readFile("./views/delete.html", "utf-8", async (err, deleteHtml) => {
        if (err) {
          console.log(err);
        } else {
          deleteHtml = deleteHtml.replace("{id}", id);
          await res.writeHead(200, "text/html");
          res.write(deleteHtml);
          res.end();
        }
      });
    }

    if (req.method === "POST") {
      await productService.remove(id);
      res.writeHead(301, { location: "/home" });
      res.end();
    }
  }

  editProduct(req, res, id) {
    if (req.method === "GET") {
      fs.readFile("./views/edit.html", "utf-8", async (err, editHtml) => {
        if (err) {
          console.log(err.message);
        } else {
          let product = await productService.findById(id);
          editHtml = editHtml.replace("{name}", product[0].name);
          editHtml = editHtml.replace("{price}", product[0].price);
          editHtml = editHtml.replace("{description}", product[0].description); 
          editHtml = editHtml.replace("{id}",id)
          res.writeHead(200, "text/html");

          res.write(editHtml);
          res.end();
        }
      });
    } else {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", async (err) => {

        if (err) {
          console.log(err);
        } else {
          const product = qs.parse(data);
          await productService.edit(product, id);
          res.writeHead(301, { location: '/home' });
          res.end();
        }
      });
    } 
  }
  showBeginHtml(req, res) {
    fs.readFile("./views/begin.html", "utf-8", async (err, beginHtml) => {
      if (err) {
        console.log(err.message);
      } else {
        res.writeHead(200, "text/html");
        res.write(beginHtml);
        res.end();
      }
    });
  }
}
module.exports = new HomeHandlerRouter();
