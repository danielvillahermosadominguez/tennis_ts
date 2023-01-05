import { Score, ScoreName } from "./score";
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

    public getResultMessage(): string {
        var distance = this.score1.distance(this.score2);
        if (distance === 0) {
            if (this.score1.isYourScore(ScoreName.Love)) {
                return "Love-All"
            } else if (this.score1.isYourScore(ScoreName.Fifteen)) {
                return "Fifteen-All";
            }
            else if (this.score1.isYourScore(ScoreName.Thirty)) {
                return "Thirty-All";
            }
            return "Deuce";
        } else if (distance > 0) {
            return "Advantage for the player - " + this.score1.getPlayerID();
        }

        return "Advantage for the player - " + this.score2.getPlayerID();

    }
}

