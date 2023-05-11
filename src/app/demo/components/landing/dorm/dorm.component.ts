import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Fmembership } from 'src/app/models/fmembership';
import { FmembershipService } from 'src/app/services/Fmembership/fmembership.service';
import { Table } from 'primeng/table';
import { Chart, registerables } from 'chart.js';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-dorm',
  templateUrl: './dorm.component.html',
  styleUrls: ['./dorm.component.css'],
})
export class DormComponent {
  listfoyer!: any;
  data: any;

  options: any;
  fmembership: Fmembership = {};
  submitted: boolean = false;
  foyerid!: number;
  items!: MenuItem[];

  chart: Chart | null = null;

  chartData: any;
  chartOptions: any;
  fmembershipDialog: boolean = false;
  constructor(
    public layoutService: LayoutService,
    public router: Router,
    public fmembershipService: FmembershipService
  ) {}

  ngOnInit(): void {
    this.fmembershipService.getfoyers().subscribe(
      (data) => {
        this.listfoyer = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }
  openNew(p: any) {
    this.foyerid = p;
    this.fmembership = {};
    this.submitted = false;
    this.fmembershipDialog = true;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  hideDialog() {
    this.fmembershipDialog = false;
    this.submitted = false;
  }

  createId(): number {
    const min = 0;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
