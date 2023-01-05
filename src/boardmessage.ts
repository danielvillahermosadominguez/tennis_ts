import {ScoreName} from "./score";

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

    public getValue():string {
        return this.value;
    }
}