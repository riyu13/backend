import express from "express";
import {
    getKataKerjaById,
    getKataKerja,
    createKataKerja,
    updateKataKerja,
    deleteKataKerja
} from "../controllers/KataKerja.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/KataKerja', verifyUser, getKataKerja);
router.get('/KataKerja/:id', verifyUser, getKataKerjaById);
router.post('/KataKerja', verifyUser, createKataKerja);
router.patch('/KataKerja/:id', verifyUser, updateKataKerja);
router.delete('/KataKerja/:id', verifyUser, deleteKataKerja);

export default router;