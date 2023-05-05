import PesertaMagang from "../models/PesertaMagangModel.js";
import argon2 from "argon2";

export const getPesertaMagang = async(req, res) =>{
    try {
        const response = await PesertaMagang.findAll({
            attributes: ['id','uuid','nama','tempatlahir','tgllahir','provinsi','kota','kecamatan','kelurahan','alamat','notelp','jkel','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPesertaMagangById = async(req, res) =>{
    try {
        const response = await PesertaMagang.findOne({
            attributes: ['id','uuid','nama','tempatlahir','tgllahir','provinsi','kota','kecamatan','kelurahan','alamat','notelp','jkel','email','role'],
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createPesertaMagang = async(req, res) =>{
    const { nama, provinsi, kota, kecamatan, kelurahan, alamat, tempatlahir, tgllahir, notelp, jkel, email, password, confPassword, role } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Konfirmasi Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await PesertaMagang.create({
            nama: nama,
            provinsi: provinsi,
            kota: kota,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            alamat: alamat,
            tempatlahir: tempatlahir,
            tgllahir: tgllahir,
            notelp: notelp,
            jkel: jkel,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updatePesertaMagang = async(req, res) =>{
    const pesertamagang = await PesertaMagang.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!pesertamagang) return res.status(404).json({ msg: "Data peserta tidak ditemukan"});
    const { nama, provinsi, kota, kecamatan, kelurahan, alamat, tempatlahir, tgllahir, notelp, jkel, email, password, confPassword, role } = req.body;
    let hashPassword;
    if(password === "" || password === ""){
        hashPassword = pesertamagang.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Konfirmasi Password tidak cocok"});
    try {
        await PesertaMagang.update({
            nama: nama,
            provinsi: provinsi,
            kota: kota,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            alamat: alamat,
            tempatlahir: tempatlahir,
            tgllahir: tgllahir,
            notelp: notelp,
            jkel: jkel,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: pesertamagang.id
            }
        });
        res.status(200).json({msg: "Data perserta berhasil Di update"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }

}

export const deletePesertaMagang = async(req, res) =>{
    const pesertamagang = await PesertaMagang.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!pesertamagang) return res.status(404).json({ msg: "Data peserta tidak ditemukan"});
    try {
        await PesertaMagang.destroy({
            where:{
                id: pesertamagang.id
            }
        });
        res.status(200).json({msg: "Data peserta berhasil di hapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

