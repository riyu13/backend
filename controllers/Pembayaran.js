import Pembayaran from "../models/PembayaranModel.js";
import User from "../models/UserModel.js";
import PesertaMagang from "../models/PesertaMagangModel.js";
import { Op } from "sequelize";

export const getPembayaran = async(req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Pembayaran.findAll({
                attributes: ['uuid','keterangan','biaya','userId','pesertamagangId'],
                include:[{
                    model: User, 
                    attributes: ['nama','email']},{
                    model: PesertaMagang, 
                    attributes: ['nama','email'],
                }]
            });
        }else{
            response = await Pembayaran.findAll({
                attributes: ['uuid','keterangan','biaya','userId','pesertamagangId'],
                where:{
                    userId: req.userId,
                },
                include:[{
                    model: User,
                    attributes: ['nama','email']},{
                    model: PesertaMagang, 
                    attributes: ['nama','email'],
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPembayaranById = async(req, res) =>{
    try {
        const pembayaran = await Pembayaran.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!pembayaran) return res.status(404).json({msg: "Data tidak ditemukan!"});
        let response;
        if(req.role === "admin"){
            response = await Pembayaran.findOne({
                attributes: ['uuid','keterangan','biaya','userId','pesertamagangId'],
                where:{
                    id: pembayaran.id
                },
                include:[{
                    model: User,
                    attributes: ['nama','email']
                }]
            });
        }else{
            response = await Pembayaran.findOne({
                attributes: ['uuid','keterangan','biaya','userId','pesertamagangId'],
                where:{
                    [Op.and]: [{id: pembayaran.id}, {userId: req.userId}],
                },
                include:[{
                    model: User,
                    attributes: ['nama','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createPembayaran = async(req, res) =>{
    const { keterangan, biaya, pesertamagangId } = req.body;
    try {
        await Pembayaran.create({
            keterangan: keterangan,
            biaya: biaya,
            userId: req.userId,
            pesertamagangId: pesertamagangId
        });
        res.status(200).json({msg: "Pembayaran berhasil!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePembayaran = async(req, res) =>{
    try {
        const pembayaran = await Pembayaran.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!pembayaran) return res.status(404).json({msg: "Data tidak ditemukan!"});
        const { keterangan, biaya, pesertamagangId } = req.body;
        if(req.role === "admin"){
           await Pembayaran.update({keterangan, biaya, pesertamagangId},{
            where:{
                id: pembayaran.id
            }
           });
        }else{
            if(req.userId !== pembayaran.userId) return res.status(403).json({msg: "Tidak bisa diakses!"})
            await Pembayaran.update({keterangan, biaya, pesertamagangId},{
                where:{
                    [Op.and]: [{id: pembayaran.id}, {userId: req.userId}],
                },
               });
        }
        res.status(200).json({msg: "Pembayaran berhasil diupdate!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deletePembayaran = async(req, res) =>{
    try {
        const pembayaran = await Pembayaran.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!pembayaran) return res.status(404).json({msg: "Data tidak ditemukan!"});
        const { keterangan, biaya, pesertamagangId } = req.body;
        if(req.role === "admin"){
           await Pembayaran.destroy({
            where:{
                id: pembayaran.id
            }
           });
        }else{
            if(req.userId !== pembayaran.userId) return res.status(403).json({msg: "Tidak bisa diakses!"})
            await Pembayaran.destroy({
                where:{
                    [Op.and]: [{id: pembayaran.id}, {userId: req.userId}],
                },
               });
        }
        res.status(200).json({msg: "Pembayaran berhasil dihapus!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

