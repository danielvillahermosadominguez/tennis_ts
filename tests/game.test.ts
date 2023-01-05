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
    
    it("show Fiflteen-All when the player 1 win a point", ()=> {      
        scorePlayer1.addPoint = jest.fn();
        scorePlayer2.addPoint = jest.fn();
        scorePlayer1.distance = jest.fn(()=>0);
        scorePlayer1.isYourScore = jest.fn((scoreName)=>  scoreName === ScoreName.Love);

        game.winAPointPlayer1();
        game.winAPointPlayer2();

        expect(game.getResultMessage()).toBe("Fifteen-All");
        expect(scorePlayer1.addPoint).toHaveBeenCalled();
        expect(scorePlayer2.addPoint).toHaveBeenCalled();
    });
});