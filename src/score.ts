export enum ScoreName {
    Love
}

export class Score {
    public addPoint():void {
        throw new Error("Method not implemented");
    }
    
    public distance(score:Score): number {
        throw new Error("Method not implemented");
    }

    public isYourScore(scoreName:ScoreName):boolean {
        throw new Error("Method not implemented");
    }
}