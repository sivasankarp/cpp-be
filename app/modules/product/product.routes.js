function ProductRoutes(app){
    const product = require("./product.controller")

    app.post("/product-save", product.productCreate);
    app.put("/product-save/:productId", product.productUpdate);
    app.get("/product-list", product.productList);
    app.get("/product-details/:productId", product.productDetails);
    app.delete("/product-delete/:productId", product.productDelete);
}

module.exports = ProductRoutes;