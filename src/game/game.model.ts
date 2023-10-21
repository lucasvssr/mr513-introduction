import { randomInt } from "crypto"

export enum GameStatus {
    new,
    won,
    lost,
    higher,
    lower
}

export class Game {
    readonly number:number

    private _remainingTries:number
    private _status:GameStatus

    constructor(game?: Game){
        this.number = game?.number || randomInt(1,1000) 
        this._remainingTries = game?._remainingTries || 10
        this._status = game?._status || GameStatus.new
    }

    get remainingTries(){
        return this._remainingTries
    }

    get status():GameStatus{
        return this._status
    }

    playOneTurn(guess: number): void {
        if(guess === this.number){
            this._status = GameStatus.won
        }else if (guess < this.number){
            this._status = GameStatus.higher
            this._remainingTries -=1
        }else if (guess > this.number){
            this._status = GameStatus.lower
            this._remainingTries -=1
        }

        this._remainingTries == 0 && (this._status = GameStatus.lost)
    }
}