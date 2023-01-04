const fs = require("fs");
const qs = require("qs");
const userService = require("../../service/userService");
const productService = require("../../service/productService");
const cookie = require("cookie");
class UserHandlerRouter {
  showFormLogin(req, res) {
    if (req.method === "GET") {
      fs.readFile(
        "./views/user/login.html",
        "utf-8",
        async (err, loginHtml) => {
          if (err) {
            console.log(err.message);
          } else {
            res.writeHead(200, "text/html");
            res.write(loginHtml);
            res.end();
          }
        }
      );
    } else {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", async (err) => {
        if (err) {
          console.log(err);
        }
        let user = qs.parse(data);
        let trimUser = user.username;
        let users = await userService.login(user);
        if (users.length !== 0) {
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("name", JSON.stringify(users[0]), {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7,
            })
          );
          if (trimUser === "admin") {
            res.writeHead(301, { location: "/home" });
            res.end();
          } else {
            res.writeHead(301, { location: "/user" });
            res.end();
          }
        } else {
          res.writeHead(301, { location: "/login" });
          res.end();
        }
      });
    }
  }
  userRegister(req, res) {
    if (req.method === "GET") {
      fs.readFile(
        "./views/user/register.html",
        "utf-8",
        async (err, registerHtml) => {
          if (err) {
            console.log(err.message);
          } else {
            res.writeHead(200, "text/html");
            res.write(registerHtml);
            res.end();
          }
        }
      );
    } else {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", (err) => {
        if (err) {
          console.log(err);
        } else {
          const user = qs.parse(data);
          console.log(user);
          userService.save(user);
          res.writeHead(301, { location: "/registerSuccess" });
          res.end();
        }
      });
    }
  }
  registerSuccess(req, res) {
    fs.readFile(
      "./views/user/registerSuccess.html",
      "utf-8",
      async (err, registerSuccessHtml) => {
        if (err) {
          console.log(err.message);
        } else {
          res.writeHead(200, "text/html");
          res.write(registerSuccessHtml);
          res.end();
        }
      }
    );
  }
  static getHomeUserHtml(homeUserHtml, products) {
    let tbody = "";
    products.map((product, index) => {
      tbody += `
    <tr>
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><img src="./public/${
            product.image
          }" alt ='Not Found' style =" width : 100px; height : 100px" ></td>
          <td>${product.description}</td>
          <td>${product.nameCategory}</td>
        
        </tr> 
    `;
    });
    homeUserHtml = homeUserHtml.replace("{products}", tbody);
    return homeUserHtml;
  }

  showHomeUser(req, res) {
    if (req.method === "GET") {
      fs.readFile("./views/user/user.html", "utf-8", async (err, homeUserHtml) => {
        if (err) {
          console.log(err.message);
        } else {
          let products = await productService.findAll();
          homeUserHtml = UserHandlerRouter.getHomeUserHtml(homeUserHtml, products);
          res.writeHead(200, "text/html");
          res.write(homeUserHtml);
          res.end();
        }
      });
    }
    else{
      let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    fs.readFile('./views/user/user.html', 'utf-8', async (err, homeUserHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let products = await productService.search(search.search)
                            homeHtml = UserHandlerRouter.getHomeHtml(homeUserHtml, products);
                            res.writeHead(200, 'text/html');
                            res.write(homeUserHtml);
                            res.end();
                        }
                    })
                }
            }) 

    }
  }
  
}
module.exports = new UserHandlerRouter();
