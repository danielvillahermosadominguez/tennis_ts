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
        configureMock(scorePlayer1,"",NaN,"Love",  0);
        configureMock(scorePlayer2,"",NaN,"Love",  0);

        expect(game.getResultMessage().getValue()).toBe("Love-All");
    });

    it("show Fiflteen-All when both players win 1 point", () => {
        configureMock(scorePlayer1,"",NaN,"Fifteen",  0);
        configureMock(scorePlayer2,"",NaN,"Fifteen",  0);
        configureMock(scorePlayer2);


        winPoints(1, 1);

        expectMessage("Fifteen-All", 1);
    });

    it("show Thirty-All when both players win 2 points", () => {
        configureMock(scorePlayer1,"",NaN,"Thirty",  0);
        configureMock(scorePlayer2,"",NaN,"Thirty",  0);

        winPoints(2, 2);

        expectMessage("Thirty-All", 2);
    });

    it("show Deuce when both players win more than 3 points", () => {
        configureMock(scorePlayer1,"",NaN,"Forty",  0);
        configureMock(scorePlayer2);
        
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
            configureMock(scorePlayer1,"Mike",NaN,"",  player1wins - player2wins);
            configureMock(scorePlayer2,"John");
           
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
        [3, 2, "Forty", "Thirty"],
    ])("show the standard message when both players have different score (%p,%p) and points are less than 3",
        (player1wins: number, player2wins: number, player1Message: string, player2Message: string) => {
            var expectedMessage = `Mike - ${player1wins} - ${player1Message}\nJohn - ${player2wins} - ${player2Message}`;

            configureMock(scorePlayer1,"Mike",player1wins,player1Message,  player1wins - player2wins);
            configureMock(scorePlayer2,"John",player2wins,player2Message);
            
            winPoints(player1wins, player2wins);

            expectMessage(expectedMessage, player1wins, player2wins);
        });

    it.each([
        [0, 4, "John"],
        [1, 4, "John"],
        [2, 4, "John"],
        [3, 5, "John"],
        [4, 6, "John"],
        [5, 7, "John"],
        [6, 8, "John"],
        [7, 9, "John"],
        [4, 0, "Mike"],
        [4, 1, "Mike"],
        [4, 2, "Mike"],
        [5, 3, "Mike"],
        [6, 4, "Mike"],
        [7, 5, "Mike"],
        [8, 6, "Mike"],
        [9, 7, "Mike"]
    ])("show the winner message when the score (%p,%p) of is higher than 3 and the distance between them are >2",
        (player1wins: number, player2wins: number, winner: string) => {
            const expectedMessage = winner + " is the Winner!!!";

            configureMock(scorePlayer1,"Mike",player1wins,  "", player1wins - player2wins);
            configureMock(scorePlayer2,"John",player2wins);

            winPoints(player1wins, player2wins);

            expectMessage(expectedMessage, player1wins, player2wins);
        });


    function configureMock(score: Score, playerID: string="", playerWins: number =NaN, playerMessage: string= "", distanceToReturn: number = NaN): void {
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