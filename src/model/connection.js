 const mysql = require('mysql')
 class Connection{
    configMysql= {
        host:'localhost',
        user: 'root',
        password : '123456',
        charset : 'utf8_general_ci',
        database : 'ProductManager'

    }
    getConnection(){
        return mysql.createConnection(this.configMysql)
    }
    connected(){
        this.getConnection.connect(err=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('connected success!!!');
            }
        })
    }
}
module.exports = new Connection()