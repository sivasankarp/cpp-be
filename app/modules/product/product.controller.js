const ProductModel = require("./product.model.js");
const Joi = require('joi');

// Product Save Validation
const check_productsave = Joi.object({
    product_code : Joi.string().required(),
    gs_code : Joi.string().required(),
    product_name : Joi.string().required(),
    trade_name : Joi.string().required(),
    therapeutic_area : Joi.string().required(),
    indication : Joi.string().required()
}).options({ abortEarly: false });


/**
* Create Product 
* @author Admin
* @Date: 09-02-2022
*/
exports.productCreate = async(req, res, next) => {
    try {
        const udata = req.body;
        const {error, value} = check_productsave.validate(udata);
        
        if (error !== undefined) {
            res.status(500).send({
                status : false,
                message : error.message || "Some error occurred while creating the product.",
            });
        } 
        else { 
            ProductModel.productCreate(udata, function(err, result) {
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
* Product Update 
* @author Admin
* @Date: 09-02-2022
*/
exports.productUpdate = async(req, res, next) => {
    try {
        const udata = req.body;
        const {error, value} = check_productsave.validate(udata);
        if (error !== undefined) {
            res.status(500).send({
                status : false,
                message : error.message || "Some error occurred while creating the product.",
            });
        } 
        else {
            ProductModel.productUpdate(req.params.productId, req.body, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                    res.status(404).send({
                        message: 'Not found Product with id ${req.params.productId}.'
                    });
                    } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productId
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
* Product List.
* @author Admin
* @Date: 09-02-2022
*/
exports.productList = async (req, res) => {
    try{
        // Start Limit & Page
        var numPerPage = parseInt(req.query.limit, 10) || 10;
        var page = parseInt(req.query.page, 10) || 1;
        var skip = (page-1) * numPerPage;
        var limit = 'LIMIT ' +skip+ ',' + numPerPage;
  
        // Start Params Where
        var where = [];
        var search = req.query.search;
        search && where.push("AND (product_name like '%"+search+"%' OR product_code like '%"+search+"%' OR gs_code like '%"+search+"%' OR trade_name like '%"+search+"%')"); 
  
        var whr = where.join(' ');
        var tblData = await ProductModel.productList('*',whr,limit);
        var tblCount = await ProductModel.productList('COUNT(id) as cnt',whr,'');
        res.send({status:true, alert:"data found", allcount:tblCount[0].cnt, data:tblData});
    }
    catch(error){
        console.log(error)
        res.status(404).send({status:false, alert:'Failed..!', message:"Something Went Wrong..!"});
    }
};

/**
* Product Details By ID.
* @author Admin
* @Date: 09-02-2022
*/
exports.productDetails = async(req, res) => {
    try{
      var data_details = await ProductModel.productDetails(req.params.productId);
      res.send({status:true, alert:"data found", data:data_details});
    }
    catch (error) {
      res.send({ status: false, statusCode:400, error: error, message: "wrong credentials..!" });
    }
}


/**
* Delete Product Particular
* @author Admin
* @Date: 09-02-2022
*/
exports.productDelete = async(req, res) => {
    try{
        ProductModel.productDelete(req.params.productId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with id ${req.params.productId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Product with id " + req.params.productId
            });
          }
        } else res.send({ message: `Product was deleted successfully!` });
      });
    }
    catch (error) {
      res.send({ status: false, statusCode:400, error: error, message: "wrong credentials..!" });
    }
}