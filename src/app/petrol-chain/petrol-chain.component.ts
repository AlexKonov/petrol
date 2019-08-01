import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PetrolChainService } from 'src/app/petrol-chain/petrol-chain.service';

@Component({
  selector: 'pl-petrol-chain',
  templateUrl: './petrol-chain.component.html',
  styleUrls: ['./petrol-chain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetrolChainComponent {

  public indicatorsList$ = this.petrolChainService.loadIndicators();

  constructor(private petrolChainService: PetrolChainService) {
  }

}
