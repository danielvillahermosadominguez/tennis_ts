import {Score, ScoreName} from "./score";

export class BoardMessage {
    private value:string;
    
    private constructor() {
        this.value = "";
    }

    public static of():BoardMessage {
        return new BoardMessage();
    }

    public all(scoreName:ScoreName) {
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

    public advantageFor(playerId:string) {
        this.value = "Advantage for the player - " + playerId;
    }

    public standardMessageFor(score1:Score, score2:Score) {
        this.value = score1.getPlayerID() +" - " + score1.getValue() + " - " + ScoreName[score1.yourScore()] + "\n"
                     + score2.getPlayerID() +" - " + score2.getValue()  + " - " + ScoreName[score2.yourScore()] ;
    }

    public getValue():string {
        return this.value;
    }
}