const sql = require("../../config/db.config.js");

// constructor
const ProductConst = function(cpp_products) {

};

/**
* Create Product 
* @author Admin
* @Date: 09-02-2022
*/
ProductConst.productCreate = function (uData, result) {    
    sql.query("INSERT INTO cpp_products set ?", uData, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, { id: res.insertId, status:true, alert:'Product Save Successfully..!'});
        }
    });           
};

/**
* Update Product 
* @author Admin
* @Date: 09-02-2022
*/
ProductConst.productUpdate = (id, udata, result) => {
    sql.query(
      "UPDATE cpp_products SET product_code = ?, gs_code = ?, product_name = ?, trade_name = ?, therapeutic_area = ?, indication = ? WHERE id = ?",
      [udata.product_code, udata.gs_code, udata.product_name, udata.trade_name, udata.therapeutic_area, udata.indication, id],
      (err, res) => {
        if (err) {
        //   console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, { id: id, status:true, alert:'Product Update Successfully..!'});
      }
    );
};


/**
*  Product List
* @author Admin
* @Date: 09-02-2022
*/
ProductConst.productList = (col, whr, limit) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT ${col} FROM cpp_products WHERE status='A' ${whr} ${limit}`, (err, res) => {
            if(err){
                reject(err);
            }
            if(res){
                resolve(res);
            }
        });
    })
}


/**
*  Product Details By ID
* @author Admin
* @Date: 09-02-2022
*/
ProductConst.productDetails = (productId) => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM cpp_products WHERE id = ${productId}`, (err, res) => {
        if (err) {
         reject(err);
        }
        if (res.length) {
          resolve(res[0]);
        }
      });
    })
};


/**
* Delete Product
* @author Admin
* @Date: 09-02-2022
*/
ProductConst.productDelete = (id, result) => {
    sql.query("UPDATE cpp_products SET status = ? WHERE id = ?",['E', id],(err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
  
        if (res.affectedRows == 0) {
        // not found Org with the id
        result({ kind: "not_found" }, null);
        return;
        }
  
        result(null, res);
    });
};



module.exports = ProductConst;