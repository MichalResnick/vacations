import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/vacation-controller";
import authController from "./6-controllers/auth-controller";
import vacationController from "./6-controllers/vacation-controller";

const server = express();

// server.use(cors({ origin: appConfig.frontEndUrl }));
server.use(express.json())

// server.use(sanitize);

server.use("/api", authController);
server.use("/api", vacationController);
server.use("/api", controller);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

