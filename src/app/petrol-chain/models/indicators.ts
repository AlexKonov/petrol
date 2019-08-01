export class Indicators {
  constructor(
    public time: number,
    public fact: number,
    public forecast: number,
    public plan: number | null,
  ) {
  }
}
