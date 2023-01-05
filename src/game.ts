import {Score, ScoreName} from "./score";
export default class Game {
    private score1:Score;
    private score2:Score;

    public constructor(score1:Score, score2:Score) {
        this.score1 = score1;
        this.score2 = score2;
    }

    public winAPointPlayer1():void {
        this.score1.addPoint()
    }

    public winAPointPlayer2():void {
        this.score2.addPoint()
    }

    public getResultMessage():string {
         if((this.score1.distance(this.score2) == 0) && this.score1.isYourScore(ScoreName.Love)){
            return "Fifteen-All";
         } 

         return "Love-All";
    }
}

