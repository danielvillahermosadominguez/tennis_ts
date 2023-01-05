import { expect, jest, test } from '@jest/globals';
import Game from "../src/game";
import { Score, ScoreName } from "../src/score";
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
        scorePlayer1.isYourScore = jest.fn((scoreName) => scoreName === ScoreName.Love);
        expect(game.getResultMessage()).toBe("Love-All");
    });

    it("show Fiflteen-All when both players win 1 point", () => {
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(() => 0);
        scorePlayer1.isYourScore = jest.fn((scoreName) => scoreName === ScoreName.Fifteen);

        winPoints(1, 1);

        expectMessage("Fifteen-All", 1);
    });

    it("show Thirty-All when both players win 2 points", () => {
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(() => 0);
        scorePlayer1.isYourScore = jest.fn((scoreName) => scoreName === ScoreName.Thirty);

        winPoints(2, 2);

        expectMessage("Thirty-All", 2);
    });

    it("show Deuce when both players win more than 3 points", () => {
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(() => 0);
        scorePlayer1.isYourScore = jest.fn((scoreName) => scoreName === ScoreName.Forty);

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
    ])
        ("show Advantage when both players have different score (%p,%p) and player '%p' has the advantage",
            (player1wins: number, player2wins: number, advantagePlayer: string) => {
                scorePlayer1.addPoint = jest.fn();
                scorePlayer2.addPoint = jest.fn();
                scorePlayer1.distance = jest.fn(() => player1wins - player2wins);
                scorePlayer1.getPlayerID = jest.fn(() => "Mike");
                scorePlayer2.getPlayerID = jest.fn(() => "John");

                winPoints(player1wins, player2wins);

                expectMessage("Advantage for the player - " + advantagePlayer, player1wins, player2wins);
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
        expect(game.getResultMessage()).toBe(message);
        expect(scorePlayer1.addPoint).toHaveBeenCalledTimes(numberCallsToAddPointS1);
        expect(scorePlayer2.addPoint).toHaveBeenCalledTimes(numberCallsToAddPointS2);
    }

});