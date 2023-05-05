import Kanjin5 from "../models/Kanjin5Model.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getKanjin5 = async(req, res) =>{
    try {
        if(req.role === "admin"){
        const page = parseInt(req.query.page) || 0;
        const search = req.query.search_query || "";
        const offset = 10 * page;
        const totalRows = await Kanjin5.count({
            attributes: ['uuid','kanji','onyomi','kunyomi','arti','userId'],
            include:[{
                model: Users,
                attributes: ['nama']
            }],
            where:{
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {onyomi:{
                    [Op.like]: '%'+search+'%'
                }}, {kunyomi:{
                  [Op.like]: '%'+search+'%'
              }}]
            }
        });
        const totalPage = Math.ceil(totalRows / 10);
        const result = await Kanjin5.findAll({
            where:{
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {onyomi:{
                    [Op.like]: '%'+search+'%'
                }}, {kunyomi:{
                [Op.like]: '%'+search+'%'
            }}]
            },
            offset: offset,
            limit: 10,
            order:[
                ['id', 'DESC']
            ]
        });
        res.json({
            result: result,
            page: page,
            totalRows: totalRows,
            totalPage: totalPage
        });
    }else{
        const page = parseInt(req.query.page) || 0;
        const search = req.query.search_query || "";
        const offset = 10 * page;
        const totalRows = await Kanjin5.count({
            attributes: ['uuid','kanji','onyomi','kunyomi','arti','userId'],
            include:[{
                model: Users,
                attributes: ['nama']
            }],
            where:{
                userId: req.userId,
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {onyomi:{
                    [Op.like]: '%'+search+'%'
                }}, {kunyomi:{
                  [Op.like]: '%'+search+'%'
              }}]
            }
        });
        const totalPage = Math.ceil(totalRows / 10);
        const result = await Kanjin5.findAll({
            where:{
                [Op.or]: [{arti:{
                    [Op.like]: '%'+search+'%'
                }}, {onyomi:{
                    [Op.like]: '%'+search+'%'
                }}, {kunyomi:{
                [Op.like]: '%'+search+'%'
            }}]
            },
            offset: offset,
            order:[
                ['id', 'DESC']
            ]
        });
        res.json({
            result: result,
            page: page,
            totalRows: totalRows,
            totalPage: totalPage
        });
    }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKanjin5ById = async(req, res) =>{
    try {
        const response = await Kanjin5.findOne({
            attributes: ['uuid','kanji','onyomi','kunyomi','arti','userId'],
            include:[{
                model: Users,
                attributes: ['nama']
            }],
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createKanjin5 = async(req, res) =>{
    const { kanji, onyomi, kunyomi, arti, userId } = req.body;
    try {
        await Kanjin5.create({
            kanji: kanji,
            onyomi: onyomi,
            kunyomi: kunyomi,
            arti: arti,
            userId: req.userId
        });
        res.status(201).json({msg: "Kanji N5 Berhasil Ditambah!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateKanjin5 = async(req, res) =>{
    const kanjin5 = await Kanjin5.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!kanjin5) return res.status(404).json({msg: "Data tidak ditemukan!"});
    const { kanji, onyomi, kunyomi, arti, userId } = req.body;
    try {
        await Kanjin5.update({
            kanji: kanji,
            onyomi: onyomi,
            kunyomi: kunyomi,
            arti: arti,
            userId: userId
        },{
            where: {
                id: kanjin5.id
            }
        });
        res.status(201).json({msg: "Kanji N5 Berhasil Diupdate!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteKanjin5 = async(req, res) =>{
    const kanjin5 = await Kanjin5.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!kanjin5) res.status(404).json({ msg: "Data kanji n5 tidak ditemukan!"});
    try {
        await Kanjin5.destroy({
            where:{
                id: kanjin5.id
            }
        });
        res.status(200).json({msg: "Data kanji n5 berhasil dihapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

