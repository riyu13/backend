import express from "express";
import {
    getPesertaMagangById,
    getPesertaMagang,
    createPesertaMagang,
    updatePesertaMagang,
    deletePesertaMagang
} from "../controllers/PesertaMagang.js"

const router = express.Router();

router.get('/PesertaMagang', getPesertaMagang);
router.get('/PesertaMagang/:id', getPesertaMagangById);
router.post('/PesertaMagang', createPesertaMagang);
router.patch('/PesertaMagang/:id', updatePesertaMagang);
router.delete('/PesertaMagang/:id', deletePesertaMagang);

export default router;