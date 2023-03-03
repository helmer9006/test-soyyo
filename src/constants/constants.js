require("dotenv").config({ path: ".env.dev" });
exports.Constants = {
    TIPOS_USUARIOS: {
        ADMIN: "admin",
        ESTANDAR: "estandar",
        ESPECIAL: "especial",
    },
    APP_PORT: process.env.APP_PORT || 4000,
    APP_HOST: process.env.APP_HOST || "localhost",
    SECRETA: process.env.SECRETA,
    URL_SERVIDOR: `${process.env.APP_HOST}:${process.env.APP_PORT}/`,
}