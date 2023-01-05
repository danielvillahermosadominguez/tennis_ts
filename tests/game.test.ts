import { expect, jest, test } from '@jest/globals';
import Game from "../src/game";
import { Score, ScoreName } from "../src/score";
import { BoardMessage } from "../src/boardmessage";

jest.mock('../src/score');


describe("The tennis game should", () => {
    var scorePlayer1: Score;
    var scorePlayer2: Score;
    var game: Game;

    beforeEach(() => {
        scorePlayer1 = new Score("Mike");
        scorePlayer2 = new Score("John");
        game = new Game(scorePlayer1, scorePlayer2);
    });

    it("show Love-All when the match start", () => {
        scorePlayer1.distance = jest.fn(() => 0);
        scorePlayer1.yourScore = jest.fn(() => ScoreName.Love);
        expect(game.getResultMessage().getValue()).toBe("Love-All");
    });

    it("show Fiflteen-All when both players win 1 point", () => {
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(() => 0);
        scorePlayer1.yourScore = jest.fn(() => ScoreName.Fifteen);

        winPoints(1, 1);

        expectMessage("Fifteen-All", 1);
    });

    it("show Thirty-All when both players win 2 points", () => {
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(() => 0);
        scorePlayer1.yourScore = jest.fn(() => ScoreName.Thirty);

        winPoints(2, 2);

        expectMessage("Thirty-All", 2);
    });

    it("show Deuce when both players win more than 3 points", () => {
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(() => 0);
        scorePlayer1.yourScore = jest.fn(() => ScoreName.Forty);

        winPoints(4, 4);

        expectMessage("Deuce", 4);
    });

    it.each([
        [3, 4, "John"],
        [4, 5, "John"],
        [5, 6, "John"],
        [6, 7, "John"],
        [7, 8, "John"],
        [8, 9, "John"],
        [4, 3, "Mike"],
        [5, 4, "Mike"],
        [6, 5, "Mike"],
        [7, 6, "Mike"],
        [8, 7, "Mike"],
        [9, 8, "Mike"]
    ])("show Advantage when both players have different score (%p,%p) and player '%p' has the advantage",
        (player1wins: number, player2wins: number, advantagePlayer: string) => {
            scorePlayer1.addPoint = jest.fn();
            scorePlayer2.addPoint = jest.fn();
            scorePlayer1.distance = jest.fn(() => player1wins - player2wins);
            scorePlayer1.getPlayerID = jest.fn(() => "Mike");
            scorePlayer2.getPlayerID = jest.fn(() => "John");

            winPoints(player1wins, player2wins);

            expectMessage("Advantage for the player - " + advantagePlayer, player1wins, player2wins);
        });

    it.each([
        [0, 1, "Love", "Fifteen"],
        [0, 2, "Love", "Thirty"],
        [0, 3, "Love", "Forty"],
        [1, 2, "Fifteen", "Thirty"],
        [1, 3, "Fifteen", "Forty"],
        [2, 3, "Thirty", "Forty"],
        [1, 0, "Fifteen", "Love"],
        [2, 0, "Thirty", "Love"],
        [3, 0, "Forty", "Love"],
        [2, 1, "Thirty", "Fifteen"],
        [3, 1, "Forty", "Fifteen"],
        [3, 2, "Forty", "Thirty"]
    ])("show the standard message when both players have different score (%p,%p) and points are less than 3",
        (player1wins: number, player2wins: number, player1Message: string, player2Message: string) => {
            const expectedMessage = "Mike - " + player1wins + " - " + player1Message + "\n"
                + "John - " + player2wins + " - " + player2Message;
            scorePlayer1.addPoint = jest.fn();
            scorePlayer2.addPoint = jest.fn();
            scorePlayer1.distance = jest.fn(() => player1wins - player2wins);
            scorePlayer1.isOutWinZone = jest.fn(() => player1wins < 3);
            scorePlayer2.isOutWinZone = jest.fn(() => player2wins < 3);
            scorePlayer1.yourScore = jest.fn(() => ScoreName[player1Message]);
            scorePlayer2.yourScore = jest.fn(() => ScoreName[player2Message]);
            scorePlayer1.getPlayerID = jest.fn(() => "Mike");
            scorePlayer2.getPlayerID = jest.fn(() => "John");
            scorePlayer1.getValue = jest.fn(() => player1wins);
            scorePlayer2.getValue = jest.fn(() => player2wins);

            winPoints(player1wins, player2wins);

            expectMessage(expectedMessage, player1wins, player2wins);
        });

    function winPoints(scorePlayer1: number, scorePlayer2: number): void {
        for (var i = 0; i < scorePlayer1; i++) {
            game.winAPointPlayer1();
        }
        for (var i = 0; i < scorePlayer2; i++) {
            game.winAPointPlayer2();
        }
    };

    function expectMessage(message: string, numberCallsToAddPointS1: number, numberCallsToAddPointS2: number = numberCallsToAddPointS1) {
        var currentMessage = game.getResultMessage();
        expect(currentMessage.getValue()).toBe(message);
        expect(scorePlayer1.addPoint).toHaveBeenCalledTimes(numberCallsToAddPointS1);
        expect(scorePlayer2.addPoint).toHaveBeenCalledTimes(numberCallsToAddPointS2);
    }

});