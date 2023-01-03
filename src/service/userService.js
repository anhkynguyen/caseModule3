const { rejects } = require("assert");
const { resolve } = require("url");
const connection = require("../model/connection");
class UserService {
    login(user) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`select *
                           from user
                           where username = '${user.username}'
                             and password = '${user.password}';`, (err, users) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(users)
                }
            })
        })
    }
    save(user) {
        let connect = connection.getConnection();
        return new Promise((resolve, rejects) => {
          connect.query(
            ` insert into user(fullName,username,password,phoneNumber,email) values ('${user.fullName}','${user.username}','${user.password}',${user.phoneNumber},'${user.email}')`,
            (err, user) => {
              if (err) {
                console.log(err);
              }
            }
          );
        });
      }
     
}

module.exports = new UserService()
