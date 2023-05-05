import express from "express";
import {
    getKanjin5ById,
    getKanjin5,
    createKanjin5,
    updateKanjin5,
    deleteKanjin5
} from "../controllers/Kanjin5.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/Kanjin5',verifyUser, getKanjin5);
router.get('/Kanjin5/:id',verifyUser, getKanjin5ById);
router.post('/Kanjin5',verifyUser, createKanjin5);
router.patch('/Kanjin5/:id',verifyUser, updateKanjin5);
router.delete('/Kanjin5/:id',verifyUser, deleteKanjin5);

export default router;