const express = require("express");
const router = express.Router();
const entityController = require("../controllers/EntityController");
const { check } = require("express-validator");
// const auth = require("../middleware/auth");

// create new user
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

router.get("/getAllEntities", entityController.getAllEntities);
router.get("/getEntityById/:id", entityController.getEntityById);
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
module.exports = router;
