import { Score, ScoreName } from "./score";
const Separator:string = " - ";
const AdvantageForThePlayer = "Advantage for the player - ";
const IsTheWinner = " is the Winner!!!";
export class BoardMessage {
    private value: string;
    
    private constructor() {
        this.value = "";
    }

    public static of(): BoardMessage {
        return new BoardMessage();
    }

    public all(scoreName: ScoreName) {
        switch (scoreName) {
            case ScoreName.Love:
                this.value = "Love-All";
                break;
            case ScoreName.Fifteen:
                this.value = "Fifteen-All";
                break;
            case ScoreName.Thirty:
                this.value = "Thirty-All";
                break;
            default:
                this.value = "Deuce";
                break;
        }
    }

    public advantageFor(playerId: string) {
        this.value = AdvantageForThePlayer + playerId;
    }

    public standardMessageFor(score1: Score, score2: Score) {
        this.value = score1.getPlayerID() + Separator + score1.getValue() + Separator + ScoreName[score1.yourScore()] + "\n"
            + score2.getPlayerID() + Separator + score2.getValue() + Separator + ScoreName[score2.yourScore()];
    }

    public winnerIs(playerId: string) {
        this.value = playerId + IsTheWinner;
    }

    public getValue(): string {
        return this.value;
    }
}