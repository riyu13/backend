import express from "express";
import { 
    getHirakata2, 
    getKanjin5, 
    getKataBenda, 
    getKataKerja, 
    getKataSifat 
} from "../controllers/GetAllMateri/GetHirakata.js";
import { verifyPesertaMagang }  from "../middleware/AuthPesertaMagang.js"

const router = express.Router();

router.get('/gethirakata',verifyPesertaMagang, getHirakata2);
router.get('/getkanjin5', verifyPesertaMagang, getKanjin5);
router.get('/getkatabenda', verifyPesertaMagang, getKataBenda);
router.get('/getkatakerja', verifyPesertaMagang, getKataKerja);
router.get('/getkatasifat', verifyPesertaMagang, getKataSifat);

export default router;