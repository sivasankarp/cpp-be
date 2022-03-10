function TherapeuticRoutes(app){
    const therapeutic = require("./therapeutic.controller")

    app.post("/therapeutic-save", therapeutic.therapeuticCreate);
    app.put("/therapeutic-save/:therapeuticId", therapeutic.therapeuticUpdate);
    app.get("/therapeutic-list", therapeutic.therapeuticList);
    app.get("/therapeutic-details/:therapeuticId", therapeutic.therapeuticDetails);
    app.delete("/therapeutic-delete/:therapeuticId", therapeutic.therapeuticDelete);
}

module.exports = TherapeuticRoutes;