import express from "express";
import cors from "cors";
import morgan from "morgan";
import { globaly } from "../interfaces/main";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export default class App {
  private app: express.Application;
  private port: number;
  constructor(controllers: any, port: number) {
    this.app = express();

    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    let options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Match system",
          version: "1.0.0",
          description: "",
        },

        servers: [
          {
            url: "http://localhost:5000",
          },
        ],
        components: {
          securitySchemes: {
            Bearer: {
              type: "apiKey",
              in: "header",
              name: "Authorization",
            },
          },
        },
        security: {
          Bearer: [],
        },
      },
      apis: ["./src/routes/*.ts"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeControllers(controllers: globaly[]) {
    controllers.forEach((controller: globaly) => {
      this.app.use(controller.path, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
