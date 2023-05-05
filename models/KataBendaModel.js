import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const KataBenda = db.define('katabenda',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    kanji:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    romaji:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    arti:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName: true
});

Users.hasMany(KataBenda);
KataBenda.belongsTo(Users, {foreignKey: 'userId'});

export default KataBenda;