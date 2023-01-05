import { Score, ScoreName } from "../src/score";

describe("Score should", () => {
    it("have a zero value at the beginning", () => {
        var score = new Score("Mike")

        expect(score.getValue()).toBe(0);
    });

    it.each([
        [1],
        [20],
        [10]
    ])("increment %p times the points", (times) => {
        var score = new Score("Mike");

        setScore(score, times);

        expect(score.getValue()).toBe(times);
    });

    it.each([
        ["Mike"],
        ["Tom"],
        ["Ramon"]
    ])("should store the id of the player", (name) => {
        var score = new Score(name);

        expect(score.getPlayerID()).toBe(name);
    });

    it.each([
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, -1],
        [10, 3, -7]
    ])("with scores %p and %p return %p",
        (scoreValue1: number, scoreValue2: number, expectedDistance: number) => {
            var score1 = new Score("Mike");
            var score2 = new Score("John");
            setScore(score1, scoreValue1);
            setScore(score2, scoreValue2);

            var distance = score1.distance(score2);

            expect(distance).toBe(expectedDistance);
        });

    it.each([
        [0, "Love"],
        [1, "Fifteen"],
        [2, "Thirty"],
        [3, "Forty"],
    ])("with score %p return the type of score %p",
        (value: number, message: string) => {
            var score = new Score("Mike");
            var expectedTypeScore = ScoreName[message];
            setScore(score, value);

            var typeOfScore = score.yourScore();

            expect(typeOfScore).toBe(expectedTypeScore);
        });

    it.each([
        [0, true],
        [1, true],
        [2, true],
        [3, true],
        [4, false],
        [5, false],
        [6, false],
        [7, false],
        [8, false]
    ])("with score %p return if it is out of the winZone (<=3)",
        (value: number, expectedResult: boolean) => {
            var score = new Score("Mike");
            setScore(score, value);

            expect(score.isOutWinZone()).toBe(expectedResult);
        });


    function setScore(score: Score, scoreValue: number) {
        for (var i = 0; i < scoreValue; i++) {
            score.addPoint();
        }
    }

});