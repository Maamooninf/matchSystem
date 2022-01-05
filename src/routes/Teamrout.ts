import express from "express";
import { globaly } from "../interfaces/main";
import { getAllteams, getone, createTeam } from "../controller/TeamController";
import { isloggedin } from "../initialApp/auth";
export default class Teamrout implements globaly {
  public path = "/team";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *    Team:
     *        type: object
     *        required:
     *         - name
     *        properties:
     *         name:
     *           type: string
     *           description:  Team's name
     *        example:
     *         name: Real Madrid
     */

    /**
     * @swagger
     * /team/getAll:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Returns All Teams
     *     tags: [Team]
     *     responses:
     *       200:
     *         description: The list of the teams
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Team'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getAll", isloggedin, getAllteams);

    /**
     * @swagger
     * /team/getone/{id}:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Get a team by id
     *     tags: [Team]
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: The team id
     *     responses:
     *       200:
     *         description: team
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Team'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getone/:id", isloggedin, getone);

    /**
     * @swagger
     * /team/create:
     *   post:
     *     security:
     *       - Bearer: []
     *     summary: create a team
     *     tags: [Team]
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Team'
     *     responses:
     *       200:
     *         description: team created successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Team'
     *       401:
     *        description: unauthentcated
     *       500:
     *          description: Network error
     */
    this.router.post("/create", isloggedin, createTeam);
  }
}
