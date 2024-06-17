import { Component } from '@angular/core';
import {ChartConfiguration} from 'chart.js';
import {BaseChartDirective} from "ng2-charts";
import {CurrentDataService} from "../../core/local/current-data.service";
import {DeckTraining} from "../../models/deck-training.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Número de cartas', backgroundColor: '#BF62EA' }
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  deckTraining!: DeckTraining;
  chartData!: number[];
  completionTimeSeconds!: number;

  constructor(private currentDataService: CurrentDataService, private router: Router) {
    if (!this.isValid()) return;

    this.deckTraining = this.currentDataService.deckTraining!;
    this.completionTimeSeconds = this.currentDataService.completionTimeSeconds!;

    for (let i = 0; i < this.deckTraining.boxAmount; i++) {
      this.barChartData.labels!.push(`Caja ${i + 1}`);
    }

    this.chartData = new Array(this.deckTraining.boxAmount).fill(0);
    this.currentDataService.cardsTraining?.map(cardTraining => {
      this.chartData[cardTraining.box - 1]++;
    });
    this.barChartData.datasets[0].data = this.chartData;

    this.currentDataService.finishTraining(true);
  }

  isValid() {
    let isValid = true;
    if (!this.currentDataService.cardsTraining?.at(0)?.card || !this.currentDataService.completionTimeSeconds ||
        !this.currentDataService.deckTraining) {
      this.router.navigate(['']).then(() => {
        console.log('Navigation complete ' + this.router.url);
      }).catch(error => {
        console.error('Navigation error:', error);
      });
      isValid = false;
    }
    return isValid;
  }

}
