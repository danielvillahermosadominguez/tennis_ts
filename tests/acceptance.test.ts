import Game from "../src/game";
import { Score, ScoreName } from "../src/score";
import { TestUtils } from "./test.utils";
describe("Score should", () => {
    it.each([
        ["Mike", "John", [1, 0, 1, 1, 0, 0, 0,0], [
            "Mike - 1 - Fifteen\nJohn - 0 - Love",
            "Fifteen-All",
            "Mike - 2 - Thirty\nJohn - 1 - Fifteen",
            "Mike - 3 - Forty\nJohn - 1 - Fifteen",
            "Mike - 3 - Forty\nJohn - 2 - Thirty",
            "Deuce",
            "Advantage for the player - John",
            "John is the Winner!!!"
        ]],
        ["Marta", "Madam Buterfly", [1, 1, 1, 1], [
            "Marta - 1 - Fifteen\nMadam Buterfly - 0 - Love",
            "Marta - 2 - Thirty\nMadam Buterfly - 0 - Love",
            "Marta - 3 - Forty\nMadam Buterfly - 0 - Love",
            "Marta is the Winner!!!"
        ]]
    ])("acceptance test", (player1ID: string, player2ID: string, games: number[], gameResults: string[]) => {
        var scoreMike = new Score(player1ID);
        var scoreJohn = new Score(player2ID);
        var game = new Game(scoreMike, scoreJohn);
        var tu = new TestUtils(game, scoreMike, scoreJohn);
        var board = game.getResultMessage();

        expect(board.getValue()).toBe("Love-All");
        
        tu.expectStepByStepGames(games,gameResults);
    });

});