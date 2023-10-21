import express from 'express';
import 'dotenv/config'
import session from 'express-session';
import { Game } from './game/game.model';
import game from './game/game.routes';
import cities from './cities/cities.routes';

const port = process.env.PORT;

const app = express();

app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET || 'secret',
    saveUninitialized: false,
    resave: false
}));

declare module "express-session" {
    interface SessionData {
        game: Game;
    }
}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.render('index', { title: 'Accueil' });
});

app.use('/play', game);
app.use('/cities', cities);

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
