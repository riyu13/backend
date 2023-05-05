import Hirakata from "../models/HirakataModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getHirakata = async(req, res) =>{
    try {
        let response;
         response = await Hirakata.findAll({
            attributes: ['uuid','hiragana','katakana','romaji'],
            include:[{
                model: User,
                attributes: ['nama','email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getHirakataById = async(req, res) =>{
    try {
        const hirakata = await Hirakata.findOne({
            where:{
                uuid: req.params.id
            }
        });
       if(!hirakata) return res.status(404).json({msg: "Data tidak ditemukan!"});
        let response;
        if(req.role === "admin" && req.role === "user"){
            response = await Hirakata.findOne({
                attributes: ['uuid','hiragana','katakana','romaji','userId'],
                where:{
                    id: hirakata.id
                },
                include:[{
                    model: User,
                    attributes: ['nama','email']
                }]
            });
        }else{
            response = await Hirakata.findOne({
                attributes: ['uuid','hiragana','katakana','romaji','userId'],
                where:{
                    [Op.and]: [{id: hirakata.id}, {userId: req.userId}],
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

export const createHirakata = async(req, res) =>{
    const { hiragana, katakana, romaji, userId } = req.body;
    try {
        await Hirakata.create({
            hiragana: hiragana,
            katakana: katakana,
            romaji: romaji,
            userId: req.userId
        });
        res.status(201).json({msg: "Hiragana & Katakana Berhasil Ditambah!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateHirakata = async(req, res) =>{
    const hirakata = await Hirakata.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!hirakata) return res.status(404).json({msg: "Data tidak ditemukan!"});
    const { hiragana, katakana, romaji, userId } = req.body;
    try {
        await Hirakata.update({
            hiragana: hiragana,
            katakana: katakana,
            romaji: romaji,
            userId: userId
        },{
            where:{
                id: hirakata.id
            }
        });
        res.status(200).json({msg: "Hiragana & Katakana berhasil diupdate!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteHirakata = async(req, res) =>{
    const hirakata = await Hirakata.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!hirakata) res.status(404).json({ msg: "Data Hiragana & Katakana tidak ditemukan!"});
    try {
        await Hirakata.destroy({
            where:{
                id: hirakata.id
            }
        });
        res.status(200).json({msg: "Data Hiragana & Katakana berhasil dihapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

