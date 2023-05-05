import express from "express";
import {
    getKataBendaById,
    getKataBenda,
    createKataBenda,
    updateKataBenda,
    deleteKataBenda
} from "../controllers/KataBenda.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/KataBenda',verifyUser, getKataBenda);
router.get('/KataBenda/:id',verifyUser, getKataBendaById);
router.post('/KataBenda',verifyUser, createKataBenda);
router.patch('/KataBenda/:id',verifyUser, updateKataBenda);
router.delete('/KataBenda/:id',verifyUser, deleteKataBenda);

export default router;