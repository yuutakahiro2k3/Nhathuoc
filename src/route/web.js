import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/', (req, res) => {
        return res.send('Hello world with me');
    });
    return app.use("/", router);
}

export default initWebRoutes;
