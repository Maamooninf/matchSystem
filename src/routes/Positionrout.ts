import express from "express";
import { globaly } from "../interfaces/main";
import { isloggedin } from "../initialApp/auth";
import {
  getAllpos,
  getone,
  createPos,
  updatePos,
} from "../controller/PositionController";
export default class Positionrout implements globaly {
  public path = "/position";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *    Position:
     *        type: object
     *        required:
     *         - name
     *        properties:
     *         name:
     *           type: string
     *           description:  position's name
     *        example:
     *         name: offensive
     */

    /**
     * @swagger
     * /position/getAll:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Returns All positions
     *     tags: [Position]
     *     responses:
     *       200:
     *         description: The list of the positions
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Position'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */

    this.router.get("/getAll", isloggedin, getAllpos);

    /**
     * @swagger
     * /position/getone/{id}:
     *   get:
     *     security:
     *       - Bearer: []
     *     summary: Get a position by id
     *     tags: [Position]
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: The position id
     *     responses:
     *       200:
     *         description: position
     *         contents:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/Position'
     *       401:
     *        description: unauthentcated
     *       500:
     *         description: netWork Error
     */
    this.router.get("/getone/:id", isloggedin, getone);

    /**
     * @swagger
     * /position/create:
     *   post:
     *     security:
     *       - Bearer: []
     *     summary: create a position
     *     tags: [Position]
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Position'
     *     responses:
     *       200:
     *         description: position created successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Position'
     *       401:
     *        description: unauthentcated
     *       500:
     *          description: Network error
     */

    this.router.post("/create", isloggedin, createPos);

    /**
     * @swagger
     * /position/update/{id}:
     *   patch:
     *     security:
     *       - Bearer: []
     *     summary: Update position by id
     *     tags: [Position]
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *         type: string
     *        required: true
     *        description: posititon id
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Position'
     *     responses:
     *       200:
     *         description: position updated successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Position'
     *       401:
     *        description: unauthentcated
     *       500:
     *          description: Network error
     */
    this.router.patch("/update/:id", isloggedin, updatePos);
  }
}
