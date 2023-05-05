import express from "express";
import {Login2, logOut2, Me2} from "../controllers/Auth2.js";

const router = express.Router();

router.get('/me2', Me2);
router.post('/login2', Login2);
router.delete('/logout2', logOut2);

export default router;