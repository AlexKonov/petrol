import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartComponent } from 'src/app/petrol-chain/chart/chart.component';
import { ChartService } from 'src/app/petrol-chain/chart/chart.service';
import { PetrolChainModelsFactory } from 'src/app/petrol-chain/models/petrol-chain.models.factory';
import { PetrolChainComponent } from 'src/app/petrol-chain/petrol-chain.component';
import { PetrolChainService } from 'src/app/petrol-chain/petrol-chain.service';

@NgModule({
  imports: [
    CommonModule,
  ],

  declarations: [
    PetrolChainComponent,
    ChartComponent,
  ],

  providers: [
    PetrolChainModelsFactory,
    PetrolChainService,
    ChartService,
  ],

  exports: [
    PetrolChainComponent,
  ],
})
export class PetrolChainModule {
}
