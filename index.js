import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import PembayaranRoute from "./routes/PembayaranRoute.js";
import PesertaMagangRoute from "./routes/PesertaMagangRoute.js";
import HirakataRoute from "./routes/HirakataRoute.js";
import Kanjin5Route from "./routes/Kanjin5Route.js";
import KataBendaRoute from "./routes/KataBendaRoute.js";
import KataSifatRoute from "./routes/KataSifatRoute.js";
import KataKerjaRoute from "./routes/KataKerjaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AuthRoute2 from "./routes/AuthRoute2.js";
import GetAllMateri from "./routes/GetAllMateriRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie:{
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(PembayaranRoute);
app.use(PesertaMagangRoute);
app.use(HirakataRoute);
app.use(Kanjin5Route);
app.use(KataBendaRoute);
app.use(KataSifatRoute);
app.use(KataKerjaRoute);
app.use(AuthRoute);
app.use(AuthRoute2);
app.use(GetAllMateri);
// store.sync(); //untuk membuat table session pada database

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server berjalan di port 5000');
});