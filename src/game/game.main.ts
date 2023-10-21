import { Game, GameStatus } from './game.model';
import { createInterface } from "readline";
    
const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new Game();

function play(){
    game.status === GameStatus.new && console.log("Vous avez 10 essais pour deviner un nombre compris entre 1 et 1000.")
    
    readLine.question('Entrez un nombre entre 1 et 1000 : ', (answer)=> {
        const number = parseInt(answer)
        if (!isNaN(number) && 1 <= number || number <= 1000){
            game.playOneTurn(number)
            
            switch (game.status){
                case GameStatus.won:
                    console.log(`Bravo ! Vous avez gagné en ${10 - game.remainingTries} essais.`)
                    readLine.close()
                    break
                case GameStatus.higher:
                    console.log(`Le nombre à deviner est supérieur. Il reste ${game.remainingTries} essais.`)
                    play()
                    break
                case GameStatus.lower:
                    console.log(`Le nombre à deviner est inférieur. Il reste ${game.remainingTries} essais.`)
                    play()
                    break
                case GameStatus.lost:
                    console.log(`Dommage ! Il fallait deviner le nombre ${game.number}`)
                    readLine.close()
                    break
            }
        }else {
            console.log('Nombre non valide ! Il doit être en 1 et 1000.')
            play()
        }
    })
}

play()