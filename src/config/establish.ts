import dotenv from "dotenv";
dotenv.config();

let degree: number = process.env.DEGREE_HASH
  ? parseInt(process.env.DEGREE_HASH)
  : 8;
let hashword: string = process.env.HASH_TOKEN
  ? process.env.HASH_TOKEN
  : "newsecret";
export { degree, hashword };
