export class Statistics {
  private _wordsCount: number;
  private _solvedCount: number;
  private _activeChallengesCount: number;

  get wordsCount(): number {
    return this._wordsCount;
  }

  set wordsCount(value: number) {
    this._wordsCount = value;
  }

  get solvedCount(): number {
    return this._solvedCount;
  }

  set solvedCount(value: number) {
    this._solvedCount = value;
  }

  get activeChallengesCount(): number {
    return this._activeChallengesCount;
  }

  set activeChallengesCount(value: number) {
    this._activeChallengesCount = value;
  }
}
