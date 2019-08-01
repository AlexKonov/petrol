import { Indicators } from 'src/app/petrol-chain/models/indicators';

export class IndicatorsList {
  constructor(
    public data: Map<number, Indicators>,
  ) {
  }
}
