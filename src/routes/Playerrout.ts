import express from "express";
import { globaly } from "../interfaces/main";
import { isloggedin } from "../initialApp/auth";
import {
  getAllPlayers,
  createPlayer,
  getOne,
  updateplayer,
  addMatchandpos,
} from "../controller/PlayerController";
export default class Playerrout implements globaly {
  public path = "/player";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *    Player:
     *        type: object
     *        required:
     *         - position
     *         - name
     *        properties:
     *         position:
     *           type: number
     *           description:  refre to default position of a player
     *         name:
     *           type: string
     *           description:  player's name
     *         team:
     *          type: number
     *          description:  refer to player's team
     *        example:
     *         name: mohammed
     *         team: 10
     *         position: 3
     *    PlayerMpos:
     *      type: object
     *      required:
     *       - position
     *       - player
     *       - match
     *      properties:
     *       position:
     *        type: number
     *        description:  refre to  position number of a player
     *       match:
     *        type: number
     *        description:  refre to  match number
     *       player:
     *        type: number
     *        description:  refre to  player number
     *      example:
     *       position: 2
     *       player: 1
     *       match: 1
     *
     */

    /**
     * @swagger
     * /player/getAll:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Returns All players
     *     tags: [Player]
     *     responses:
     *       200:
     *         description: The list of the players
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */

    this.router.get("/getAll", isloggedin, getAllPlayers);

    /**
     * @swagger
     * /player/getone/{playerid}:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Get a player by id
     *     tags: [Player]
     *     parameters:
     *      - in: path
     *        name: playerid
     *        schema:
     *         type: string
     *        required: true
     *        description: The player id
     *     responses:
     *       200:
     *         description: player
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       404:
     *        description: position not found
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getone/:playerid", isloggedin, getOne);

    /**
     * @swagger
     * /player/create:
     *   post:
     *     security:
     *       - Bearer: []
     *     summary: create a player (if team dose not exists it will be null)
     *     tags: [Player]
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Player'
     *     responses:
     *       200:
     *         description: player created successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       404:
     *         description: position not found
     *       500:
     *          description: Network error
     */
    this.router.post("/create", isloggedin, createPlayer);

    /**
     * @swagger
     * /player/update/{playerid}:
     *   patch:
     *     security:
     *       - Bearer: []
     *     summary: Update player by id
     *     tags: [Player]
     *     parameters:
     *      - in: path
     *        name: playerid
     *        schema:
     *         type: string
     *        required: true
     *        description: player id
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Player'
     *     responses:
     *       200:
     *         description: player updated successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Player'
     *       401:
     *        description: unauthentcated
     *       500:
     *          description: Network error
     */

    this.router.patch("/update/:playerid", isloggedin, updateplayer);

    /**
     * @swagger
     * /player/createjunc:
     *   post:
     *    security:
     *       - Bearer: []
     *    summary: attach a player with position and match
     *    tags: [Player]
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *        schema:
     *         $ref: '#/components/schemas/PlayerMpos'
     *    responses:
     *       200:
     *        description: attach successfully added
     *        content:
     *         application/json:
     *           schema:
     *            $ref: '#/components/schemas/PlayerMpos'
     *       401:
     *        description: unauthentcated
     *       404:
     *         description: some prop not found
     *       500:
     *          description: Network error
     */
    this.router.post("/createjunc", isloggedin, addMatchandpos);
  }
}
