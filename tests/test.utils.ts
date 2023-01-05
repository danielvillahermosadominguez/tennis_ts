
import Game from "../src/game";
import { Score, ScoreName } from "../src/score";
import { BoardMessage } from "../src/boardmessage";

export class TestUtils {

    private game: Game;
    private scorePlayer1:Score;
    private scorePlayer2:Score;
    public constructor(game:Game, scorePlayer1:Score, scorePlayer2:Score) {
        this.game = game;
        this.scorePlayer1 = scorePlayer1;
        this.scorePlayer2 = scorePlayer2;
    }

    public  configureMock(score: Score, playerID: string="", playerWins: number =NaN, playerMessage: string= "", distanceToReturn: number = NaN): void {
        score.addPoint = jest.fn();
        if(playerID !="") {
            score.getPlayerID = jest.fn(() => playerID);
        }

        if(!isNaN(playerWins)) {
            score.getValue = jest.fn(() => playerWins);
            score.isOutWinZone = jest.fn(() => playerWins <= 3);
        }

        if(playerMessage != "") {
            score.yourScore = jest.fn(() => ScoreName[playerMessage]);
        }

        if(!isNaN(distanceToReturn)) {
            score.distance = jest.fn(() => distanceToReturn);
        }
    }

    public winPoints(scorePlayer1: number, scorePlayer2: number): void {
        for (var i = 0; i < scorePlayer1; i++) {
            this.game.winAPointPlayer1();
        }
        for (var i = 0; i < scorePlayer2; i++) {
            this.game.winAPointPlayer2();
        }
    };

    public expectMessage(message: string, numberCallsToAddPointS1: number, numberCallsToAddPointS2: number = numberCallsToAddPointS1) {
        var currentMessage = this.game.getResultMessage();
        expect(currentMessage.getValue()).toBe(message);
        expect(this.scorePlayer1.addPoint).toHaveBeenCalledTimes(numberCallsToAddPointS1);
        expect(this.scorePlayer2.addPoint).toHaveBeenCalledTimes(numberCallsToAddPointS2);
    }

    public expectStepByStepGames(games:number[],gameResults:string[]){
        var board = this.game.getResultMessage();
        expect(board.getValue()).toBe("Love-All");
        for (var i = 0; i < games.length; i++) {
            if (games[i] == 1) {
                this.game.winAPointPlayer1();
            } else {
                this.game.winAPointPlayer2();
            }
            board = this.game.getResultMessage();
            expect(board.getValue()).toBe(gameResults[i]);
        }
    }
}