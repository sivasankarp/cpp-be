const sql = require("../../config/db.config.js");

// constructor
const IndicationConst = function(cpp_indications) {

};

/**
* Create Indication 
* @author Admin
* @Date: 09-02-2022
*/
IndicationConst.indicationCreate = function (uData, result) {    
    sql.query("INSERT INTO cpp_indications set ?", uData, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, { id: res.insertId, status:true, alert:'Indication Save Successfully..!'});
        }
    });           
};

/**
* Update Indication 
* @author Admin
* @Date: 09-02-2022
*/
IndicationConst.indicationUpdate = (id, udata, result) => {
    sql.query(
      "UPDATE cpp_indications SET title = ? WHERE id = ?",
      [udata.title, id],
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
        result(null, { id: id, status:true, alert:'Indication Update Successfully..!'});
      }
    );
};


/**
*  Indication List
* @author Admin
* @Date: 09-02-2022
*/
IndicationConst.indicationList = (col, whr, limit) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT ${col} FROM cpp_indications WHERE status='A' ${whr} ${limit}`, (err, res) => {
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
*  Indication Details By ID
* @author Admin
* @Date: 09-02-2022
*/
IndicationConst.indicationDetails = (indicationId) => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM cpp_indications WHERE id = ${indicationId}`, (err, res) => {
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
* Delete Indication
* @author Admin
* @Date: 09-02-2022
*/
IndicationConst.indicationDelete = (id, result) => {
    sql.query("UPDATE cpp_indications SET status = ? WHERE id = ?",['E', id],(err, res) => {
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



module.exports = IndicationConst;