const { rejects } = require("assert");
const { resolve } = require("url");
const connection = require("../model/connection");
class ProductService {
  findAll() {
    let connect = connection.getConnection();
    return new Promise((resolve, rejects) => {
      connect.query("SELECT * FROM product", (err, products) => {
        if (err) {
          rejects(err);
        } else {
          resolve(products);
        }
      });
    });
  }
  save(product, id) {
    let connect = connection.getConnection();
    return new Promise((resolve, rejects) => {
      connect.query(
        `insert into product(price,name,description) values (${product.price},'${product.name}','${product.description}')`,
        (err, product) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  }
  remove(id) {
    let connect = connection.getConnection();
    let sql = `DELETE FROM ProductManager.product WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      connect.query(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Done !!!");
        }
      });
    });
  }
  findById(id) {
    let connect = connection.getConnection();
    return new Promise((resolve, rejects) => {
      connect.query(
        `SELECT * FROM product WHERE id = ${id}`,
        (err, products) => {
          if (err) {
            rejects(err);
          } else {
            resolve(products);
          }
        }
      );
    });
  }
  edit(product, id) {
    let connect = connection.getConnection();
    return new Promise((resolve, rejects) => {
      connect.query(
        `UPDATE product SET name = '${product.name}',price = ${product.price}, description = '${product.description}' WHERE id = ${id}`,
        (err, product) => {
          if (err) {
            rejects(err);
          } else {
            resolve(product);
          }
        }
      );
    });
  }
//   searchProduct(search) {
//     let connect = connection.getConnection();
//     let sql = `select * from user s join grade g on s.idGrade = g.idGrade  WHERE name LIKE '%${search}%'`
//     return new Promise((resolve, reject) => {
//         connect.query(sql,(err, students) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(students);
//             }
//         })
//     })
// }
}
const productService = new ProductService();
module.exports = productService;
