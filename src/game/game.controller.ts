import { Game, GameStatus } from './game.model';
import { Request, Response } from "express";
import { validationResult } from 'express-validator';

export class GameController {

    static start(req: Request, res: Response): void {
        req.session.game = new Game();
        res.render('game/play', { title: 'Game', game: req.session.game, status: GameStatus, errors: undefined });
    }

    static play(req: Request, res: Response): void {
        const game = new Game(req.session.game);

        const result = validationResult(req);

        if (result.isEmpty()) {
            game.playOneTurn(parseInt(req.body.guess));
            req.session.game = game;
            if (game.status === GameStatus.won) {
                res.render('game/won', { title: 'Game', game: game });
            } else if (game.status === GameStatus.lost) {
                res.render('game/lost', { title: 'Game', game: game });
            } else {
                res.render('game/play', { title: 'Game', game: game, status: GameStatus, errors: undefined });
            }
        } else {
            res.render('game/play', { title: 'Game', game: game, status: GameStatus, errors: result.array() });
        }

    }
}