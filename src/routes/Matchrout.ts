import express from "express";
import { globaly } from "../interfaces/main";
import { isloggedin } from "../initialApp/auth";
import {
  createMatch,
  getMatches,
  updateMatch,
  getOneMatch,
} from "../controller/MatchesController";

export default class Matchrout implements globaly {
  public path = "/match";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Match:
     *       type: object
     *       required:
     *         - teamone
     *         - teamtwo
     *         - date
     *       properties:
     *         teamone:
     *           type: number
     *           description:  refre to team one number
     *
     *         teamtwo:
     *           type: number
     *           description:  refre to team two number
     *
     *         date:
     *          type: string
     *          description:  start time of match
     *       example:
     *         id: 1
     *         teamone: 2
     *         teamtwo: 4
     *         date: 2021-10-01
     */

    /**
     * @swagger
     * /match/getAll:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Returns All matches which consisits of two teams and a date
     *     tags: [Match]
     *     responses:
     *       200:
     *         description: The list of the matches
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getAll", isloggedin, getMatches);

    /**
     * @swagger
     * /match/getone/{id}:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Get a match by id
     *     tags: [Match]
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: The match id
     *     responses:
     *       200:
     *         description: match
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getone/:id", isloggedin, getOneMatch);

    /**
     * @swagger
     * /match/create:
     *   post:
     *     security:
     *       - Bearer: []
     *     summary: Create a new match
     *     tags: [Match]
     *     parameters:
     *      - name: authorization
     *        in: header
     *        description: API key
     *        required: true
     *        type: string
     *        format: string
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Match'
     *     responses:
     *       200:
     *         description: match successfully added
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       400:
     *         description: valdation error
     *       500:
     *          description: Network error
     */
    this.router.post("/create", isloggedin, createMatch);

    /**
     * @swagger
     * /match/update/{id}:
     *   patch:
     *     security:
     *       - Bearer: []
     *     summary: Update match by id
     *     tags: [Match]
     *     parameters:
     *      - name: authorization
     *        in: header
     *        description: API key
     *        required: true
     *        type: string
     *        format: string
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: The match id
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Match'
     *     responses:
     *       200:
     *         description: The list of the matches
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Match'
     *       401:
     *        description: unauthentcated
     *       400:
     *         description: valdation error
     *       500:
     *          description: Network error
     */

    this.router.patch("/update/:id", isloggedin, updateMatch);
  }
}
