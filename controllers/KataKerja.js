import KataKerja from "../models/KataKerjaModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getKataKerja = async(req, res) =>{
    try {
        if(req.role === "admin"){
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search_query || "";
            const offset = limit * page;
            const totalRows = await KataKerja.count({
            attributes: ['uuid','kanji','romaji','arti','userId'],
            include:[{
                model: Users,
                attributes: ['nama']
            }],
            where:{
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {romaji:{
                    [Op.like]: '%'+search+'%'
                }}, {arti:{
                  [Op.like]: '%'+search+'%'
              }}]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await KataKerja.findAll({
            where:{
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {romaji:{
                    [Op.like]: '%'+search+'%'
                }}, {arti:{
                [Op.like]: '%'+search+'%'
            }}]
            },
            offset: offset,
            limit: limit,
            order:[
                ['id', 'DESC']
            ]
        });
        res.json({
            result: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        });
    }else{
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await KataKerja.count({
            attributes: ['uuid','kanji','romaji','arti','userId'],
            include:[{
                model: Users,
                attributes: ['nama']
            }],
            where:{
                userId: req.userId,
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {romaji:{
                    [Op.like]: '%'+search+'%'
                }}, {arti:{
                  [Op.like]: '%'+search+'%'
              }}]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await KataKerja.findAll({
            where:{
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {romaji:{
                    [Op.like]: '%'+search+'%'
                }}, {arti:{
                [Op.like]: '%'+search+'%'
            }}]
            },
            offset: offset,
            limit: limit,
            order:[
                ['id', 'DESC']
            ]
        });
        res.json({
            result: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        });
    }
    }catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKataKerjaById = async(req, res) =>{
    try {
        const response = await KataKerja.findOne({
            attributes: ['uuid','kanji','romaji','arti','userId'],
            where:{
                uuid: req.params.id
            },
            include:{
                model: Users,
                attributes: ['nama']
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createKataKerja = async(req, res) =>{
    const { kanji, romaji, arti, userId } = req.body;
    try {
        await KataKerja.create({
            kanji: kanji,
            romaji: romaji,
            arti: arti,
            userId: req.userId
        });
        res.status(200).json({msg: "Kata Kerja Berhasil Ditambah!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateKataKerja = async(req, res) =>{
    const katakerja = await KataKerja.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!katakerja) return res.status(404).json({msg: "Data tidak dimeukan"});
    const { kanji, romaji, arti, userId } = req.body;
    try {
        await KataKerja.update({
            kanji: kanji,
            romaji: romaji,
            arti: arti,
            userId: userId
        },{
            where: {
                id: katakerja.id
            }
        });
        res.status(201).json({msg: "Data berhasil diupdate!"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteKataKerja = async(req, res) =>{
    const katakerja = await KataKerja.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!katakerja) res.status(404).json({ msg: "Data kanji n5 tidak ditemukan!"});
    try {
        await KataKerja.destroy({
            where:{
                id: katakerja.id
            }
        });
        res.status(200).json({msg: "Data berhasil dihapus!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

