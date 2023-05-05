import PesertaMagang from "../models/PesertaMagangModel.js";
import argon2 from "argon2";

export const Login2 = async(req, res) =>{
    const pesertamagang = await PesertaMagang.findOne({
        where:{
            email: req.body.email
        }
    });
    if(!pesertamagang) return res.status(404).json({ msg: "email atau password salah"});
    const match = await argon2.verify(pesertamagang.password, req.body.password);
    if(!match) return res.status(400).json({msg: "email atau password salah"});
    req.session.pesertamagangId = pesertamagang.uuid;
    const uuid = pesertamagang.uuid;
    const nama = pesertamagang.nama;
    const email = pesertamagang.email;
    const role = pesertamagang.role;
    res.status(200).json({uuid, nama, email, role});
}

export const Me2 = async(req, res) =>{
    if(!req.session.pesertamagangId){
        return res.status(401).json({msg: "Mohon login kembali"});
    }
    const pesertamagang = await PesertaMagang.findOne({
        attributes: ['uuid','nama','email','role'],
        where:{
            uuid: req.session.pesertamagangId
        }
    });
    if(!pesertamagang) return res.status(404).json({ msg: "User tidak ditemukan"});
    res.status(200).json(pesertamagang);
}

export const logOut2 = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}