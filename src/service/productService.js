const { rejects } = require("assert");
const { resolve } = require("url");
const connection = require("../model/connection");
class ProductService {
  findAll() {
    let connect = connection.getConnection();
    return new Promise((resolve, rejects) => {
      connect.query("SELECT * from product join category on product.idCategory = category.idCategory ", (err, products) => {
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
        `insert into product(price,name,description,image,idCategory) values (${product.price},'${product.name}','${product.description}','${product.image}','${product.idCategory}')`,
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
        `UPDATE product SET name = '${product.name}',price = ${product.price}, description = '${product.description}',image= '${product.image}' WHERE id = ${id}`,
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
  search(search) {
    let connect = connection.getConnection();
    let sql = `select * from product WHERE name LIKE '%${search}%'`
    return new Promise((resolve, reject) => {
        connect.query(sql,(err, products) => {
            if (err) {
                reject(err);
            } else {
                resolve(products);
            }
        })
    })
}
}
const productService = new ProductService();
module.exports = productService;
