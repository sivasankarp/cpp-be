function IndicationRoutes(app){
    const indication = require("./indication.controller")

    app.post("/indication-save", indication.indicationCreate);
    app.put("/indication-save/:indicationId", indication.indicationUpdate);
    app.get("/indication-list", indication.indicationList);
    app.get("/indication-details/:indicationId", indication.indicationDetails);
    app.delete("/indication-delete/:indicationId", indication.indicationDelete);
}

module.exports = IndicationRoutes;