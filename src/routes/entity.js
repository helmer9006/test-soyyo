const express = require("express");
const router = express.Router();
const entityController = require("../controllers/EntityController");
const { check } = require("express-validator");

// create new entity
router.post(
  "/create",
  [
    check("name", "The name is required").not().isEmpty(),
    check("identificationNumber", "The identificationNumber is required")
      .not()
      .isEmpty(),
    check("expirationDate", "The expirationDate is required.").isLength({
      min: 6,
    }),
    check("contactName", "The contactName is required").not().isEmpty(),
    check("contactEmail", "Add an email of contact valid.").isEmail(),
  ],
  entityController.createEntity
);
// get all entities
router.get("/getAllEntities", entityController.getAllEntities);
// get entity by id
router.get("/getEntityById/:id", entityController.getEntityById);
// filter entities by range - endpoint test
router.post(
  "/filter",
  [
    check("startId", "The startid it must be numeric and is required")
      .isNumeric()
      .custom((value, { req }) => {
        if (value < 1 || value > 20) {
          throw new Error("Error the range  for filter is incorrect");
        }
        return true;
      }),
    check("endId", "The endid It must be numeric and is required")
      .isNumeric()
      .custom((value, { req }) => {
        if (value < 1 || value > 20) {
          throw new Error("Error the range  for filter is incorrect");
        }
        return true;
      }),
  ],
  entityController.filter
);
// filter entities by range - data db
router.post(
  "/filterByRange",
  [
    check("startId", "The startid it must be numeric and is required")
      .isNumeric()
      .custom((value, { req }) => {
        if (value < 1 || value > 20) {
          throw new Error("Error the range  for filter is incorrect");
        }
        return true;
      }),
    check("endId", "The endid It must be numeric and is required")
      .isNumeric()
      .custom((value, { req }) => {
        if (value < 1 || value > 20) {
          throw new Error("Error the range  for filter is incorrect");
        }
        return true;
      }),
  ],
  entityController.filterByRange
);
module.exports = router;
