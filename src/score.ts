export enum ScoreName {
    Love,
    Fifteen,
    Thirty,
    Forty
}

export class Score {

    private playerID: string;
    private value: number;

    public constructor(playerID: string) {
        this.playerID = playerID;
        this.value = 0;
    }

    public addPoint(): void {
        this.value++;
    }

    public distance(score: Score): number {
        return this.value - score.getValue();
    }

    public yourScore(): ScoreName {
        var keys = Object.keys(ScoreName);
        switch (this.value) {
            case 0: return ScoreName.Love;
            case 1: return ScoreName.Fifteen;
            case 2: return ScoreName.Thirty;
        }

        return ScoreName.Forty;
    }

    public getPlayerID(): string {
        return this.playerID;
    }

    public isOutWinZone(): boolean {
        return this.value <= 3;
    }

    public getValue(): number {
        return this.value;
    }
}