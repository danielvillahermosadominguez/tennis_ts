import Game from "../src/game";

describe("The tennis game should", () => {
    it("show Love-All when the match start", ()=> {
        var game = new Game();
        var result = game.getResultMessage();
        expect(result).toBe("Love-All");
    });
});