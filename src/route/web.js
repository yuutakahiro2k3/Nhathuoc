import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displaygetCRUD);
    router.get('/edit-crud', homeController.geteditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    app.use("/", router);
}

export default initWebRoutes;
