import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ChartService } from 'src/app/petrol-chain/chart/chart.service';
import { IndicatorsList } from 'src/app/petrol-chain/models/indicators-list';

@Component({
  selector: 'pl-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent implements OnChanges, AfterViewInit {

  @Input()
  public indicatorsList!: IndicatorsList;

  @ViewChild('chart', { static: false })
  private chartElement?: ElementRef;

  constructor(
    private chartService: ChartService,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.indicatorsList && this.chartElement) {
      this.chartService.setNewData([...this.indicatorsList.data.values()]);
    }
  }

  public ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    this.chartService.create(this.chartElement!.nativeElement, [...this.indicatorsList.data.values()]);
  }

}
