import { Component, OnInit } from '@angular/core';
import { Device } from '../Device';
import { DeviceDataService } from '../device-data.service';


@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.css']
})
export class SelectDeviceComponent implements OnInit {
  selectedDevice: Device;
  devices: Device[] = null;

  constructor(private deviceDataService: DeviceDataService) { }

  ngOnInit() {
    this.getDevices();
  }

  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedDevice = this.devices[$event.target.value];
    console.log(this.devices[$event.target.value]);
  }

  getDevices(): void {
    this.deviceDataService.getDevices().subscribe((devices) => {
      this.devices = devices.map((device, i) => {
        return { id: i + 1, name: device.id };
      });
      this.devices.unshift(new Device(0, 'Please select an device'));
      this.selectedDevice = this.devices[0];

    });
  }

}
