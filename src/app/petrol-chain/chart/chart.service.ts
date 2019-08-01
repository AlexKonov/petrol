import { Injectable } from '@angular/core';
import { ChartAPI, generate, PrimitiveArray } from 'c3';
import * as d3 from 'd3';
import * as moment from 'moment';
import { Indicators } from 'src/app/petrol-chain/models/indicators';

@Injectable()
export class ChartService {

  private chart: ChartAPI | null = null;

  public create(element: HTMLElement, data: Indicators[]): void {
    this.destroy();

    this.chart = generate({
      bindto: element,
      data: {
        rows: this.convertDataToRows(data),
        x: 'time',
        types: {
          plan: 'area-step',
          fact: 'step',
        },
        colors: {
          plan: 'url(#planGradient)',
          fact: '#0e5289',
          forecast: '#afb5b3',
        },
        names: {
          plan: 'План',
          fact: 'Факт',
          forecast: 'Прогноз',
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: value => this.getValueLabel(<Date> value),
            multiline: true,
            fit: true,
            culling: { max: 40 },
          },
        },
        y: {
          label: {
            text: 'S, ppm',
            position: 'inner-top',
          },
          min: 2,
          max: 20,
        },
      },
      grid: {
        x: { show: true },
        y: { show: true },
      },
      area: { zerobased: false },
      point: { show: false },
      tooltip: { show: false },
      zoom: { enabled: true },

      onrendered: () => this.modifyView(element),
    });

  }

  public setNewData(data: any): void {
    if (!this.chart) {
      return;
    }

    this.chart.load({
      rows: this.convertDataToRows(data),
    });
  }

  public destroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  private modifyView(element: HTMLElement): void {
    this.modifyGraphPlan(element);
    this.modifyAxisYLabel(element);
  }

  private modifyGraphPlan(element: HTMLElement): void {
    const planGradient = d3
      .select(element)
      .select('svg defs')
      .append('linearGradient')
      .attr('id', 'planGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    planGradient
      .append('stop')
      .attr('stop-color', 'rgba(24,255,43,0.5)')
      .attr('offset', '0%');
    planGradient
      .append('stop')
      .attr('stop-color', 'rgba(24,255,43,0)')
      .attr('offset', '100%');

    d3
      .select(element)
      .select('.c3-legend-item-plan .c3-legend-item-tile')
      .style('stroke', 'rgb(24,255,43)');
  }

  private modifyAxisYLabel(element: HTMLElement): void {
    d3
      .select(element)
      .select('.c3-axis-y-label')
      .attr('transform', null);
  }

  private convertDataToRows(data: Indicators[]): PrimitiveArray[] {
    return [
      ['time', 'plan', 'fact', 'forecast'],
      ...(
        data.map(item => [item.time, item.plan, item.fact, item.forecast])
      ),
    ];
  }

  private getValueLabel(value: Date): string {
    return moment(value)
      .format('HH:mm');
  }

}
