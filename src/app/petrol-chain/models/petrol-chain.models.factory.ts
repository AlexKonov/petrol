import { Injectable } from '@angular/core';
import { IndicatorsListJson } from 'src/app/petrol-chain/json-interfaces/indicators-list.json-interface';
import { IndicatorsJson } from 'src/app/petrol-chain/json-interfaces/indicators.json-inrerface';
import { Indicators } from 'src/app/petrol-chain/models/indicators';
import { IndicatorsList } from 'src/app/petrol-chain/models/indicators-list';

@Injectable()
export class PetrolChainModelsFactory {

  public createIndicatorsFromJson(json: IndicatorsJson): Indicators {
    return new Indicators(
      json.time,
      json.fact,
      json.forecast,
      json.plan || null,
    );
  }

  public createIndicatorsListFromJson(json: IndicatorsListJson): IndicatorsList {
    const data = new Map<number, Indicators>();
    json
      .data
      .forEach(itemJson => {
        const indicators = this.createIndicatorsFromJson(itemJson);
        data.set(indicators.time, indicators);
      });

    return new IndicatorsList(data);
  }

}
