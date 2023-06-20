import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/admin-controller";
import authController from "./6-controllers/auth-controller";
import adminController from "./6-controllers/admin-controller";
import vacationController from "./6-controllers/vacations-controller";
import userController from "./6-controllers/user-controller";

const server = express();

server.use(cors());
server.use(express.json())

server.use(expressFileUpload());

// server.use(sanitize);

server.use("/api", authController);
server.use("/api", vacationController);
server.use("/api", adminController);
server.use("/api", userController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

