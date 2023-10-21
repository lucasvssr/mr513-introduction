import express from "express";
import { body } from "express-validator";
import { CitiesController } from "./cities.controller";
const router = express.Router();


router.get('/', CitiesController.showForm);
router.post('/', express.urlencoded({ extended: true }),
    body('city').notEmpty().isString().isLength({min:3}).isAlphanumeric().not().isNumeric().trim().escape(),
        CitiesController.searchResults
    );
router.get('/api/search/:city', CitiesController.searchResultsJson);
export default router;