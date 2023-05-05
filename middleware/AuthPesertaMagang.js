import PesertaMagang from "../models/PesertaMagangModel.js";

export const verifyPesertaMagang = async(req, res, next) => {
    if(!req.session.pesertamagangId){
        return res.status(401).json({msg: "Mohon login kembali"});
    }
    const pesertamagang = await PesertaMagang.findOne({
        where:{
            uuid: req.session.pesertamagangId
        }
    });
    if(!pesertamagang) return res.status(404).json({ msg: "User tidak ditemukan"});
    req.pesertamagangId = pesertamagang.id;
    req.role = pesertamagang.role;
    next();
}