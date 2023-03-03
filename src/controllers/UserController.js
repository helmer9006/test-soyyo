const { User } = require("../database/db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const path = require('path');
const { Constants } = require('../constants/constants');

const createUser = async (req, res) => {
    console.log("POST - CREATE USER");
    try {
        //validar errores
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ status: false, response: errores.array(), msg: "Error in data input" });
        }
        // const { profile, firtName, lastName } = req.usuario;
        //Valido perfil
        // if (profile === Constants.TYPE_USER.ADMIN) {
            // Verificar si el usuario ya estuvo registrado
            const { email, password } = req.body;
            //validar que el usuario no esté creado previamente
            let userReg = await User.findOne({
                where: {
                    [Op.or]: [{ email }]
                }
            });
            if (userReg) {
                return res.json({ status: false, response: userReg, msg: "User already exists" });
            }


            // Hashear pass
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);

            const userCreated = await User.create(req.body);
            if (!userCreated) {
                return res.json({ status: false, response: {}, msg: "could not create user" });
            }

            res.json({ status: true, response: userCreated, msg: "User create successfull." });

        // } else {
            // return res.status(403).json({
            //     status: false, response: {}, msg: `Not authorized ${firtName} ${lastName} with profile ${profile}`,
            // });
        // }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, response: {}, msg: "Error creating user" });
    }
}

const getAllUsers = async (req, res) => {
    console.log("GET - ALL USERS");
    try {
        const users = await User.findAll();
        if (users.length == 0) {
            return res.json({ status: true, response: [], msg: 'Users not found' });
        }
        res.json({ status: true, response: users, msg: "Users found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, response: [], msg: "Error internal server." });
    }
};

module.exports = {
    createUser,
    getAllUsers
};