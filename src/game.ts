import { Score, ScoreName } from "./score";
import {BoardMessage} from "./boardmessage";
export default class Game {
    private score1: Score;
    private score2: Score;

    public constructor(score1: Score, score2: Score) {
        this.score1 = score1;
        this.score2 = score2;
    }

    public winAPointPlayer1(): void {
        this.score1.addPoint()
    }

    public winAPointPlayer2(): void {
        this.score2.addPoint()
    }

    public getResultMessage(): BoardMessage {
        var result = BoardMessage.of();
        var distance = this.score1.distance(this.score2);

        if(distance == 0) {
            result.all(this.score1.yourScore());
            return result;
        }

        if(this.score1.isOutWinZone() || this.score2.isOutWinZone()) {
           result.standardMessageFor(this.score1, this.score2);
           return result;
        }

        if(distance > 0) {
            result.advantageFor(this.score1.getPlayerID());
            return result;
        }

        result.advantageFor(this.score2.getPlayerID());
        
        return result;
    }
}

