const TherapeuticModel = require("./therapeutic.model.js");
const Joi = require('joi');

// Therapeutic Save Validation
const check_therapeuticsave = Joi.object({
    title : Joi.string().required()
}).options({ abortEarly: false });


/**
* Create Therapeutic 
* @author Admin
* @Date: 09-02-2022
*/
exports.therapeuticCreate = async(req, res, next) => {
    try {
        const udata = req.body;
        const {error, value} = check_therapeuticsave.validate(udata);
        
        if (error !== undefined) {
            res.status(500).send({
                status : false,
                message : error.message || "Some error occurred while creating the therapeutic.",
            });
        } 
        else { 
            TherapeuticModel.therapeuticCreate(udata, function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        }
    } catch (error) {
        res.send({ status: false, statusCode: 400, error: error, message: "wrong credentials..!" });
    }
}


/**
* Therapeutic Update 
* @author Admin
* @Date: 09-02-2022
*/
exports.therapeuticUpdate = async(req, res, next) => {
    try {
        const udata = req.body;
        const {error, value} = check_therapeuticsave.validate(udata);
        if (error !== undefined) {
            res.status(500).send({
                status : false,
                message : error.message || "Some error occurred while creating the therapeutic.",
            });
        } 
        else {
            TherapeuticModel.therapeuticUpdate(req.params.therapeuticId, req.body, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                    res.status(404).send({
                        message: 'Not found Therapeutic with id ${req.params.therapeuticId}.'
                    });
                    } else {
                    res.status(500).send({
                        message: "Error updating Therapeutic with id " + req.params.therapeuticId
                    });
                    }
                } else res.send(data);
            });
        }
    } catch (error) {
        res.send({ status: false, statusCode:400, error: error, message: "wrong credentials..!" });
    }
}

/**
* Therapeutic List.
* @author Admin
* @Date: 09-02-2022
*/
exports.therapeuticList = async (req, res) => {
    try{
        // Start Limit & Page
        var numPerPage = parseInt(req.query.limit, 10) || 10;
        var page = parseInt(req.query.page, 10) || 1;
        var skip = (page-1) * numPerPage;
        var limit = 'LIMIT ' +skip+ ',' + numPerPage;
  
        // Start Params Where
        var where = [];
        var search = req.query.search;
        search && where.push("AND (title like '%"+search+"%')"); 
  
        var whr = where.join(' ');
        var tblData = await TherapeuticModel.therapeuticList('*',whr,limit);
        var tblCount = await TherapeuticModel.therapeuticList('COUNT(id) as cnt',whr,'');
        res.send({status:true, alert:"data found", allcount:tblCount[0].cnt, data:tblData});
    }
    catch(error){
        console.log(error)
        res.status(404).send({status:false, alert:'Failed..!', message:"Something Went Wrong..!"});
    }
};

/**
* Therapeutic Details By ID.
* @author Admin
* @Date: 09-02-2022
*/
exports.therapeuticDetails = async(req, res) => {
    try{
      var data_details = await TherapeuticModel.therapeuticDetails(req.params.therapeuticId);
      res.send({status:true, alert:"data found", data:data_details});
    }
    catch (error) {
      res.send({ status: false, statusCode:400, error: error, message: "wrong credentials..!" });
    }
}


/**
* Delete Therapeutic Particular
* @author Admin
* @Date: 09-02-2022
*/
exports.therapeuticDelete = async(req, res) => {
    try{
        TherapeuticModel.therapeuticDelete(req.params.therapeuticId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Therapeutic with id ${req.params.therapeuticId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Therapeutic with id " + req.params.therapeuticId
            });
          }
        } else res.send({ message: `Therapeutic was deleted successfully!` });
      });
    }
    catch (error) {
      res.send({ status: false, statusCode:400, error: error, message: "wrong credentials..!" });
    }
}