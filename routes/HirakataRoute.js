import express from "express";
import {
    getHirakataById,
    getHirakata,
    createHirakata,
    updateHirakata,
    deleteHirakata
} from "../controllers/Hirakata.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/Hirakata',verifyUser, getHirakata);
router.get('/Hirakata/:id',verifyUser, getHirakataById);
router.post('/Hirakata',verifyUser, createHirakata);
router.patch('/Hirakata/:id',verifyUser, updateHirakata);
router.delete('/Hirakata/:id',verifyUser, deleteHirakata);

export default router;