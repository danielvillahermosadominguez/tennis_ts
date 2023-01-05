import { Score, ScoreName } from "./score";
import { BoardMessage } from "./boardmessage";
const MinimumDistanceToWin = 2;
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
        var bestScore = this.getAdvantagedPlayer();

        if (this.equalityOfScores()) {
            result.all(bestScore.yourScore());
            return result;
        } 
        
        if(this.existSomeWinner()) {
            result.winnerIs(bestScore.getPlayerID());
            return result;
        } 
        
        if (this.existSomeInTheWinZone()) {
            result.advantageFor(bestScore.getPlayerID());
            return result;
        }

        result.standardMessageFor(this.score1, this.score2);

        return result;
    }


    private existSomeWinner(): boolean {
        var distance = this.score1.distance(this.score2);
        return (!this.score1.isOutWinZone() || !this.score2.isOutWinZone()) && (Math.abs(distance) >= MinimumDistanceToWin);
    }

    private existSomeInTheWinZone(): boolean {
        return !this.score1.isOutWinZone() || !this.score2.isOutWinZone();
    }

    private equalityOfScores(): boolean {
        var distance = this.score1.distance(this.score2);
        return distance == 0;
    }
    private getAdvantagedPlayer():Score {
        var distance = this.score1.distance(this.score2);
        if(distance > 0) {
            return this.score1;
        } 
        return this.score2;
    }
}

