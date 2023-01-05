export enum ScoreName {
    Love,
    Fifteen,
    Thirty,
    Forty
}

export class Score {

    public constructor(playerID: string) {
        throw new Error("Method not implemented");
    }

    public addPoint(): void {
        throw new Error("Method not implemented");
    }

    public distance(score: Score): number {
        throw new Error("Method not implemented");
    }

    public isYourScore(scoreName: ScoreName): boolean {
        throw new Error("Method not implemented");
    }

    public getPlayerID(): string {
        throw new Error("Method not implemented");
    }
}