import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css']
})
export class AdminStatsComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };
  public barChartLabels: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChartData: ChartConfiguration['data'] = {
    labels: this.barChartLabels,
    datasets: [{ data: [], label: 'Bookings', backgroundColor: '#0d6efd' }],
  };

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.guestService.getMonthlyBookings(this.currentYear).subscribe((data) => {
      this.barChartData.datasets[0].data = data;
    });
  }
}
