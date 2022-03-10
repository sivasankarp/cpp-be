const IndicationModel = require("./indication.model.js");
const Joi = require('joi');

// Indication Save Validation
const check_indicationsave = Joi.object({
    title : Joi.string().required()
}).options({ abortEarly: false });


/**
* Create Indication 
* @author Admin
* @Date: 09-02-2022
*/
exports.indicationCreate = async(req, res, next) => {
    try {
        const udata = req.body;
        const {error, value} = check_indicationsave.validate(udata);
        
        if (error !== undefined) {
            res.status(500).send({
                status : false,
                message : error.message || "Some error occurred while creating the indication.",
            });
        } 
        else { 
            IndicationModel.indicationCreate(udata, function(err, result) {
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
* Indication Update 
* @author Admin
* @Date: 09-02-2022
*/
exports.indicationUpdate = async(req, res, next) => {
    try {
        const udata = req.body;
        const {error, value} = check_indicationsave.validate(udata);
        if (error !== undefined) {
            res.status(500).send({
                status : false,
                message : error.message || "Some error occurred while creating the indication.",
            });
        } 
        else {
            IndicationModel.indicationUpdate(req.params.indicationId, req.body, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                    res.status(404).send({
                        message: 'Not found Indication with id ${req.params.indicationId}.'
                    });
                    } else {
                    res.status(500).send({
                        message: "Error updating Indication with id " + req.params.indicationId
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
* Indication List.
* @author Admin
* @Date: 09-02-2022
*/
exports.indicationList = async (req, res) => {
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
        var tblData = await IndicationModel.indicationList('*',whr,limit);
        var tblCount = await IndicationModel.indicationList('COUNT(id) as cnt',whr,'');
        res.send({status:true, alert:"data found", allcount:tblCount[0].cnt, data:tblData});
    }
    catch(error){
        console.log(error)
        res.status(404).send({status:false, alert:'Failed..!', message:"Something Went Wrong..!"});
    }
};

/**
* Indication Details By ID.
* @author Admin
* @Date: 09-02-2022
*/
exports.indicationDetails = async(req, res) => {
    try{
      var data_details = await IndicationModel.indicationDetails(req.params.indicationId);
      res.send({status:true, alert:"data found", data:data_details});
    }
    catch (error) {
      res.send({ status: false, statusCode:400, error: error, message: "wrong credentials..!" });
    }
}


/**
* Delete Indication Particular
* @author Admin
* @Date: 09-02-2022
*/
exports.indicationDelete = async(req, res) => {
    try{
        IndicationModel.indicationDelete(req.params.indicationId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Indication with id ${req.params.indicationId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Indication with id " + req.params.indicationId
            });
          }
        } else res.send({ message: `Indication was deleted successfully!` });
      });
    }
    catch (error) {
      res.send({ status: false, statusCode:400, error: error, message: "wrong credentials..!" });
    }
}