module.exports = app => {
    require("./app/modules/product/product.routes")(app);
    require("./app/modules/indication/indication.routes")(app);
    require("./app/modules/therapeutic/therapeutic.routes")(app);
};