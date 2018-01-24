import { Component, OnChanges, Input } from '@angular/core';
import { Device } from '../Device';
import { DeviceDataService } from '../device-data.service';
declare const google: any;

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.css']
})
export class ChartComponentComponent implements OnChanges {
  loading: boolean;
  tempCableChart: any;
  tempAirChart: any;
  optionsForCable: any;
  optionsForAir: any;
  constructor(private deviceDataService: DeviceDataService) { }
  @Input() device: Device;
  ngOnChanges(changes) {
    console.log('changes', changes);
    console.log('google', google);
    this.getDeviceData();
  }
  getDeviceData(): void {
    const that = this;
    if (this.device.id !== 0) {
      this.loading = true;
      if (this.tempCableChart) {
        this.tempCableChart.clearChart();
      }
      if (this.tempAirChart) {
        this.tempAirChart.clearChart();
      }

      this.deviceDataService.getDeviceData(this.device.name).subscribe((deviceData) => {
        console.log('devicedata-', deviceData);

        google.charts.load('current', { packages: ['corechart', 'line'] });
        google.charts.setOnLoadCallback(() => {
          this.drawBasic(deviceData, that);
        });
      });
    }
  }
  drawBasic(deviceData: any, that: any): void {
    const tempCable = [];
    const tempAir = [];
    deviceData.forEach(function (element, i) {
      tempCable.push([new Date(element['timestamp'] * 1000), element['values'].filter((item) => item['label'] === 'tempCable')
      [0]['value']]);
      tempAir.push([new Date(element['timestamp'] * 1000), element['values'].filter((item) => item['label'] === 'tempAir')
      [0]['value']]);

    });
    const dataOfCable: any = new google.visualization.DataTable();
    const dataOfAir: any = new google.visualization.DataTable();
    dataOfCable.addColumn('datetime', 'X');
    dataOfCable.addColumn('number', 'Temperature');
    dataOfCable.addRows(tempCable);

    dataOfAir.addColumn('datetime', 'X');
    dataOfAir.addColumn('number', 'Temperature');
    dataOfAir.addRows(tempAir);
    if (!that.optionsForCable) {
      that.optionsForCable = {
        title: 'Cable Temperature',
        titleTextStyle: {
          color: '#db3236',
          bold: true,
          fontSize: 22
        },
        backgroundColor : '#f7f7f7',
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Temperature',
          scaleType: 'log'
        },
        tooltip:
          { textStyle: { color: '#3cba54' }, showColorCode: true }

      };
    }
    if (!that.optionsForAir) {
      that.optionsForAir = {
        title: 'Air Temperature',
        titleTextStyle: {
          color: '#db3236',
          bold: true,
          fontSize: 22
        },
        backgroundColor : '#f7f7f7',
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Temperature',
          scaleType: 'log'
        },
        tooltip:
          { textStyle: { color: '#3cba54' }, showColorCode: true }
      };
    }
    if (!that.tempCableChart) {
      that.tempCableChart = new google.visualization.LineChart(document.getElementById('temp_cable_chart'));
    }
    if (!that.tempAirChart) {
      that.tempAirChart = new google.visualization.LineChart(document.getElementById('temp_air_chart'));
    }
    that.loading = false;
    that.tempCableChart.draw(dataOfCable, that.optionsForCable);
    that.tempAirChart.draw(dataOfAir, that.optionsForAir);
  }

}
