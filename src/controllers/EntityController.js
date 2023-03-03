const { Entity } = require("../database/db");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const path = require("path");
const { Constants } = require("../constants/constants");
const axios = require("axios");
const createEntity = async (req, res) => {
  console.log("POST - CREATE ENTITY");
  try {
    //validar errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        status: false,
        response: errores.array(),
        msg: "Error in data input",
      });
    }
    // const { profile, firtName, lastName } = req.usuario;
    //Valido perfil
    // if (profile === Constants.TYPE_USER.ADMIN) {
    //validate entity
    const { identificationNumber } = req.body;
    let entityReg = await Entity.findOne({
      where: {
        [Op.or]: [{ identificationNumber }],
      },
    });
    if (entityReg) {
      return res.json({
        status: false,
        response: entityReg,
        msg: "Entity already exists",
      });
    }
    const entityCreated = await Entity.create(req.body);
    if (!entityCreated) {
      return res.json({
        status: false,
        response: {},
        msg: "could not create entity",
      });
    }

    res.json({
      status: true,
      response: entityCreated,
      msg: "Entity create successfull.",
    });

    // } else {
    // return res.status(403).json({
    //     status: false, response: {}, msg: `Not authorized ${firtName} ${lastName} with profile ${profile}`,
    // });
    // }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, response: {}, msg: "Error creating entity" });
  }
};

const getAllEntities = async (req, res) => {
  console.log("GET - ALL ENTITIES");
  try {
    const entities = await Entity.findAll({});
    if (entities.length == 0) {
      return res.status(404).json({ status: true, response: [], msg: "Entity not found" });
    }
    return res.json({ status: true, response: entities, msg: "Entities found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, response: [], msg: "Error internal server." });
  }
};

const getEntityById = async (req, res) => {
  console.log("GET - ALL ENTITY BY ID");
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.params);
    if (!id || isNaN(id)) {
      return res.json({
        status: false,
        response: [],
        msg: "Error in data input, parameter incorrect",
      });
    }
    const entity = await Entity.findOne({
      where: { id },
    });
    if (!entity) {
      return res.json({ status: false, response: [], msg: "Entity not found" });
    }
    res.json({ status: true, response: entity, msg: "Entity found" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, response: [], msg: "Error internal server." });
  }
};

const filter = async (req, res) => {
  try {
    const entities = [];
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        status: false,
        response: errores.array(),
        Error: "Error en validación datos de entrada",
      });
    }
    const { startId, endId } = req.body;
    for (let i = startId; i <= endId; i++) {
      const url = `https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/dev/entity/v2.1/entities/${i}`;
      const result = await axios.get(url);
      if (!result || !result.data || !result.data.data) {
        return res.status(404).json({
          status: false,
          Error: `Error no se encuentra la entidad con id ${i} para rango especificado`,
        });
      }
      const {
        entityId,
        identificationNumber,
        expirationDate,
        contactName,
        contactMail,
        logo,
        name,
      } = result.data.data;

      entities.push({
        entityId: entityId,
        name: name,
        identificationNumber: identificationNumber,
        expirationDate: expirationDate,
        contactName: contactName,
        contactEmail: contactMail,
        logo: logo,
      });
    }
    var entitiesSort = entities.sort(SortName);
    res
      .status(200)
      .json({ status: true, description: "OK", content: entitiesSort });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, response: [], msg: "Error internal server." });
  }
};

const SortName = (x, y) => {
  return x.name.localeCompare(y.name);
};
module.exports = {
  createEntity,
  getAllEntities,
  getEntityById,
  filter,
};
