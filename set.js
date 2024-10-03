const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0NwN2hIdG1GdzF1Qlg0WW9rbS9LVGhNODl4M08vUzRWaTdsWndibmRIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT2NCdllBNGdlYTJIZHZuWGlxT0R2U1NxQVFjT0FadStPNCtBemY0L2t5OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTR1JJUTlkMU04bWlNMFAxby9pVHluMGNnYjNNN3MyMno5aGFacEZVelZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkSUVrcDJwM0VuekhhSmZrdGJzV2c1U3ZYRnprZXNVTk9CaVFoWWh2ZlE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVCUndxQzBNTFQrRVREaWcyTFNaZ0QzTEs4YnRuMlJxQjk4TnFqRTk1VzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkV1ekNmbTVhRzhaZ2hTVjk4a1g5RXpkQnlibWRIN21VazNqZE0zaVNOeWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0hCdGt1c1FkSWt1TEdmZGxYL05OSWRwM1ZaRTV4V0ZYRnYydjNIWUhWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0w4YldDQldPT2g4cnd4UHA0RkRoR2JBUk96SFM4K0E1bko1ZWJ1ZW9UQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFlcnFFOWRWODBydEJlNGkvZTB4UU8yWXQ0cmFqRThENmRnUXp0WDdYbFZZRERidFFvOVI2aHcveHdUNWZFd2ZaYytBc3RSRzFyN2laSVFCSk5RQml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiJYZzJMUmQ1VGNzckI0V05INGxqcnpmRXVTSnc4T2dMVGxqaFFaZlErR0c4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCNWhFRmhFclFNYUZQYUZKUjRuUU93IiwicGhvbmVJZCI6IjNiYjUwM2Q4LWJkNzgtNDg5OC1hZDRlLThmMzA1ZDgwM2VlYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5ckt0TFJNS1RHWXo3a3hnU1NHUEVGSFN4WEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieW5jZTU5N0kxUUxLVVZLeDBOVTU4NklNWCtrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpNMjg3UFk2IiwibWUiOnsiaWQiOiIyNTQxMTMzNTA0NTg6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNRVNIIFBSSU5URVJTIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJcjhwUXdROWUvNHR3WVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOM2dxSmdTTjMwQ0FvRUhSYnZEZVI2dWRQUzNwWGdMSVgxMEpsMGVvL1dFPSIsImFjY291bnRTaWduYXR1cmUiOiJBci9od1dPZXY2dEd6ajQ0TkRFK2hZdk5NMm5lR014c3NtZ3JTMUNMM3h4NGliVDJtTEU3dlZFRlBUZjFvdThxanBKZEV1R1VqMVBrL2FaQkZsZGRBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMnpLbk1SQm1zaklHS0JIc29hRzNHT0RDOUpjOGpCSGMwYm5Sa28weElKVXlTMVFTM2hKS3BoZzJkTVZpeSt2Y2VWbGVsTHp1SWpqSGRuVERhN2pyaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMTMzNTA0NTg6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUZDRLaVlFamQ5QWdLQkIwVzd3M2tlcm5UMHQ2VjRDeUY5ZENaZEhxUDFoIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3OTM2NTE1fQ==",
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "MESH KE",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254113350458",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'MESH CYBER',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
