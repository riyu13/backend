import express from "express";
import {
    getPembayaranById,
    getPembayaran,
    createPembayaran,
    updatePembayaran,
    deletePembayaran
} from "../controllers/Pembayaran.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/Pembayaran',verifyUser,getPembayaran);
router.get('/Pembayaran/:id',verifyUser,getPembayaranById);
router.post('/Pembayaran',verifyUser,createPembayaran);
router.patch('/Pembayaran/:id',verifyUser,updatePembayaran);
router.delete('/Pembayaran/:id',verifyUser,deletePembayaran);

export default router;