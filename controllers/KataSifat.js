import KataSifat from "../models/KataSifatModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getKataSifat = async(req, res) =>{
    try {
        if(req.role === "admin"){
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search_query || "";
            const offset = limit * page;
            const totalRows = await KataSifat.count({
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
        const result = await KataSifat.findAll({
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
        const totalRows = await KataSifat.count({
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
        const result = await KataSifat.findAll({
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
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKataSifatById = async(req, res) =>{
    try {
        const response = await KataSifat.findOne({
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

export const createKataSifat = async(req, res) =>{
    const { kanji, romaji, arti, userId } = req.body
    try {
        await KataSifat.create({
            kanji: kanji,
            romaji: romaji,
            arti: arti,
            userId: req.userId
        });
        res.status(201).json({msg: "Kata Sifat Berhasil Ditambah!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateKataSifat = async(req, res) =>{
    const katasifat = await KataSifat.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!katasifat) return res.status(404).json({msg: "Data tidak dimeukan"});
    const { kanji, romaji, arti, userId } = req.body;
    try {
        await KataSifat.update({
            kanji: kanji,
            romaji: romaji,
            arti: arti,
            userId: userId
        },{
            where: {
                id: katasifat.id
            }
        });
        res.status(201).json({msg: "Data berhasil diupdate!"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteKataSifat = async(req, res) =>{
    const katasifat = await KataSifat.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!katasifat) res.status(404).json({ msg: "Data kanji n5 tidak ditemukan!"});
    try {
        await KataSifat.destroy({
            where:{
                id: katasifat.id
            }
        });
        res.status(200).json({msg: "Data berhasil dihapus!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

