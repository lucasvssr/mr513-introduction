import express from "express";
import { GameController } from "./game.controller";
import { body } from "express-validator";
const router = express.Router();


router.get('/', GameController.start);
router.post('/', express.urlencoded({ extended: true }),
    body('guess').notEmpty().isInt({ min: 1, max: 1000 }),
    GameController.play);

export default router;