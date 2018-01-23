import { Component, OnChanges, Input } from '@angular/core';
import {Device} from '../Device';
import { DeviceDataService } from '../device-data.service';




@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.css']
})
export class ChartComponentComponent implements OnChanges {
  loading: boolean;
  constructor(private deviceDataService: DeviceDataService) { }
  @Input() device: Device;
  ngOnChanges(changes) {
    console.log('changes', changes);
    this.getDeviceData();
  }
  getDeviceData(): void {
    if (this.device.id !== 0) {
      this.loading = true;

      this.deviceDataService.getDeviceData(this.device.name).subscribe((deviceData) => {
        console.log('devicedata-', deviceData);
        this.loading = false;
      });
    }
  }

}
