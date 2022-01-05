import express from "express";
import { Signincont, Signupcont } from "../controller/UserControlle";
import { globaly } from "../interfaces/main";
import { isloggedin } from "../initialApp/auth";
export default class Userrout implements globaly {
  public path = "/user";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *    Usersignin:
     *        type: object
     *        required:
     *         - username
     *         - password
     *        properties:
     *         username:
     *           type: string
     *           description:  eamil of a user
     *         password:
     *          type: string
     *          description:  password of a user
     *        example:
     *         username: example'@'gmail.com
     *         password: a0Abe2
     *    Returnval:
     *     type: object
     *     properties:
     *      token:
     *       type: string
     *       description:  token access of a user
     *    Usersingup:
     *        type: object
     *        required:
     *         - username
     *         - password
     *         - confirmpass
     *        properties:
     *         username:
     *          type: string
     *          description:  email of a user
     *         password:
     *          type: string
     *          description:  password of a user
     *         confirmpass:
     *          type: string
     *          description: confirm a password
     *         isAdmin:
     *          type: boolean
     *          description: privllage of a user
     *        example:
     *         username: example'@'gmail.com
     *         password: a0Abe2
     *         confirmpass: a0Abe2
     *         isAdmin: true
     */

    /**
     * @swagger
     * /user/signin:
     *   post:
     *     summary: login to the system
     *     tags: [User]
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Usersignin'
     *     responses:
     *       200:
     *         description: successfully
     *         content:
     *           application/json:
     *            schema:
     *             $ref: '#/components/schemas/Returnval'
     *       404:
     *         description: user not found
     *       402:
     *          description: valdation error
     *       401:
     *        description: unauthentcated
     *       500:
     *          description: Network error
     */
    this.router.post("/signin", Signincont);

    /**
     * @swagger
     * /user/signup:
     *   post:
     *     security:
     *       - Bearer: []
     *     summary: create an admin user
     *     tags: [User]
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *          $ref: '#/components/schemas/Usersingup'
     *     responses:
     *       200:
     *         description: successfully
     *         content:
     *           application/json:
     *            schema:
     *             type: string
     *       402:
     *          description: valdation error
     *       401:
     *        description: unauthentcated
     *       500:
     *          description: Network error
     */
    this.router.post("/signup", isloggedin, Signupcont);
  }
}
