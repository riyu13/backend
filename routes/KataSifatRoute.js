import express from "express";
import {
    getKataSifatById,
    getKataSifat,
    createKataSifat,
    updateKataSifat,
    deleteKataSifat
} from "../controllers/KataSifat.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/KataSifat', verifyUser, getKataSifat);
router.get('/KataSifat/:id', verifyUser, getKataSifatById);
router.post('/KataSifat', verifyUser, createKataSifat);
router.patch('/KataSifat/:id', verifyUser, updateKataSifat);
router.delete('/KataSifat/:id', verifyUser, deleteKataSifat);

export default router;