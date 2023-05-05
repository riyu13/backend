import Hirakata from "../../models/HirakataModel.js";
import Kanjin5 from "../../models/Kanjin5Model.js";
import KataBenda from "../../models/KataBendaModel.js";
import KataKerja from "../../models/KataKerjaModel.js";
import KataSifat from "../../models/KataSifatModel.js";
import {Op} from "sequelize";

export const getHirakata2 = async(req, res) =>{
  try {
    const response = await Hirakata.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const getKanjin5 = async(req, res) => {
  const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Kanjin5.count({
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
    const totalPage = Math.ceil(totalRows / limit);
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

  // try {
  //   const response = await Kanjin5.findAll({});
  //   res.status(200).json(response);
  // } catch (error) {
  //   res.status(500).json({msg: error.message});
  // }
}

export const getKataBenda = async(req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await KataBenda.count({
      where:{
          [Op.or]: [{arti:{
              [Op.like]: '%'+search+'%'
          }}, {romaji:{
              [Op.like]: '%'+search+'%'
        }}]
      }
  }); 
  const totalPage = Math.ceil(totalRows / limit);
  const result = await KataBenda.findAll({
      where:{
          [Op.or]: [{arti:{
              [Op.like]: '%'+search+'%'
          }}, {romaji:{
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

export const getKataKerja = async(req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await KataKerja.count({
      where:{
          [Op.or]: [{arti:{
              [Op.like]: '%'+search+'%'
          }}, {romaji:{
              [Op.like]: '%'+search+'%'
        }},{kanji:{
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
        }},{kanji:{
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

export const getKataSifat = async(req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await KataSifat.count({
      where:{
          [Op.or]: [{arti:{
              [Op.like]: '%'+search+'%'
          }}, {romaji:{
              [Op.like]: '%'+search+'%'
        }},{kanji:{
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
        }},{kanji:{
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