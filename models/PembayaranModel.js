import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import PesertaMagang from "./PesertaMagangModel.js";

const {DataTypes} = Sequelize;

const Pembayaran = db.define('pembayaran',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 100]
        }
    },
    biaya:{
        type: DataTypes.INTEGER,
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
    pesertamagangId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName: true
});

Users.hasMany(Pembayaran);
Pembayaran.belongsTo(Users, {foreignKey: 'userId'});
Pembayaran.belongsTo(PesertaMagang, {foreignKey: 'pesertamagangId'});

export default Pembayaran;