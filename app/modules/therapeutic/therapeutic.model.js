const sql = require("../../config/db.config.js");

// constructor
const TherapeuticConst = function(cpp_therapeutics) {

};

/**
* Create Therapeutic 
* @author Admin
* @Date: 09-02-2022
*/
TherapeuticConst.therapeuticCreate = function (uData, result) {    
    sql.query("INSERT INTO cpp_therapeutics set ?", uData, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, { id: res.insertId, status:true, alert:'Therapeutic Save Successfully..!'});
        }
    });           
};

/**
* Update Therapeutic 
* @author Admin
* @Date: 09-02-2022
*/
TherapeuticConst.therapeuticUpdate = (id, udata, result) => {
    sql.query(
      "UPDATE cpp_therapeutics SET title = ? WHERE id = ?",
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
        result(null, { id: id, status:true, alert:'Therapeutic Update Successfully..!'});
      }
    );
};


/**
*  Therapeutic List
* @author Admin
* @Date: 09-02-2022
*/
TherapeuticConst.therapeuticList = (col, whr, limit) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT ${col} FROM cpp_therapeutics WHERE status='A' ${whr} ${limit}`, (err, res) => {
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
*  Therapeutic Details By ID
* @author Admin
* @Date: 09-02-2022
*/
TherapeuticConst.therapeuticDetails = (therapeuticId) => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM cpp_therapeutics WHERE id = ${therapeuticId}`, (err, res) => {
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
* Delete Therapeutic
* @author Admin
* @Date: 09-02-2022
*/
TherapeuticConst.therapeuticDelete = (id, result) => {
    sql.query("UPDATE cpp_therapeutics SET status = ? WHERE id = ?",['E', id],(err, res) => {
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



module.exports = TherapeuticConst;