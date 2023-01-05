import {expect, jest, test} from '@jest/globals';
import Game from "../src/game";
import {Score, ScoreName} from "../src/score";
jest.mock('../src/score');


describe("The tennis game should", () => {
    var scorePlayer1:Score;
    var scorePlayer2:Score;
    var game:Game;

    beforeEach(()=> {
        scorePlayer1 = new Score();
        scorePlayer2 = new Score();
        game = new Game(scorePlayer1,scorePlayer2);
    });

    it("show Love-All when the match start", ()=> {        
        expect(game.getResultMessage()).toBe("Love-All");
    });
    
    it("show Fiflteen-All when both players win 1 point", ()=> {      
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(()=>0);
        scorePlayer1.isYourScore = jest.fn((scoreName)=>  scoreName === ScoreName.Love);

        winPoints(1,1);

        expectMessage("Fifteen-All",1);
    });

    it("show Thirty-All when both players win 2 points", ()=> {      
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(()=>0);
        scorePlayer1.isYourScore = jest.fn((scoreName)=>  scoreName === ScoreName.Thirty);

        winPoints(2,2);

        expectMessage("Thirty-All",2);
    });

    it("show Deuce when both players win more than 3 points", ()=> {      
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(()=>0);
        scorePlayer1.isYourScore = jest.fn((scoreName)=>  scoreName === ScoreName.Forty);

        winPoints(4,4);

        expectMessage("Deuce",4);
    });

    function winPoints(scorePlayer1:number, scorePlayer2:number):void {
        for(var i = 0;i<scorePlayer1;i++) {
            game.winAPointPlayer1();
        }
        for(var i = 0;i<scorePlayer2;i++) {
            game.winAPointPlayer2();
        }
    };

    function expectMessage(message:string, numberCallsToAddPoint:number) {
        expect(game.getResultMessage()).toBe(message);
        expect(scorePlayer1.addPoint).toHaveBeenCalledTimes(numberCallsToAddPoint);
        expect(scorePlayer2.addPoint).toHaveBeenCalledTimes(numberCallsToAddPoint);
    }
});