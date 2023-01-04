const { rejects } = require("assert");
const { resolve } = require("url");
const connection = require("../model/connection");
 class CategoryService {
  static findCategory() {
    let connect = connection.getConnection();
    return new Promise((resolve, rejects) => {
      connect.query("SELECT * FROM category", (err, categories) => {
        if (err) {
          rejects(err);
        } else {
          resolve(categories);
        }
      });
    });
  }
  
}

module.exports = CategoryService;
