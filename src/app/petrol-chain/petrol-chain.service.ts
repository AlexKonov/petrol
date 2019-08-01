import { HttpClientModule } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { random } from 'lodash';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_GATEWAY } from 'src/app/api-service.config';
import { IndicatorsListJson } from 'src/app/petrol-chain/json-interfaces/indicators-list.json-interface';
import { IndicatorsList } from 'src/app/petrol-chain/models/indicators-list';
import { PetrolChainModelsFactory } from 'src/app/petrol-chain/models/petrol-chain.models.factory';

@Injectable()
export class PetrolChainService {
  constructor(
    @Inject(API_GATEWAY) private api: string,
    private httpClient: HttpClientModule,
    private petrolChainModelsFactory: PetrolChainModelsFactory,
  ) {
  }

  public loadIndicators(): Observable<IndicatorsList> {
    return of(mockData())
      .pipe(
        map(json => this.petrolChainModelsFactory.createIndicatorsListFromJson(json)),
      );
  }

}

function mockData(): IndicatorsListJson {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - 86400 * 1000);
  const endDate = new Date(currentDate.getTime() + 86400 * 1000);

  const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 4).getTime();
  const endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 4).getTime();

  const result: IndicatorsListJson = {
    data: [],
  };

  let plan!: number;
  let lastHoursPlan = 0;
  for (let i = startTime; i < endTime; i += 60 * 10 * 1000) {
    const hours = moment(i).hours();

    if (i === startTime || (hours !== lastHoursPlan && (hours === 6 || hours === 14 || hours === 22))) {
      plan = random(8, 14);
      lastHoursPlan = hours;
    }

    result
      .data
      .push({
        plan,
        time: i * 1000,
        fact: plan + random(-3, 1),
        forecast: plan + random(-3, 1),
      });
  }

  return result;
}
