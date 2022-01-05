import "reflect-metadata";
import { createConnection } from "typeorm";
import App from "./initialApp/App";
import Matchrout from "./routes/Matchrout";
import Playerrout from "./routes/Playerrout";
import Positionrout from "./routes/Positionrout";
import Teamrout from "./routes/Teamrout";
import Userrout from "./routes/Userrout";
import dotenv from "dotenv";
dotenv.config();
createConnection()
  .then(async () => {
    const app = new App(
      [
        new Matchrout(),
        new Playerrout(),
        new Positionrout(),
        new Teamrout(),
        new Userrout(),
      ],
      5000
    );

    app.listen();
  })
  .catch((error) => console.log(error));
