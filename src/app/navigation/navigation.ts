import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '../app.routes';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  imports: [RouterModule],
  selector: 'hylke-navigation',
  styleUrls: ['./navigation.scss'],
  templateUrl: './navigation.html',
})
export class NavigationComponent implements OnInit {
  public readonly navigationRoutes: Routes = routes.filter(route => route.title);

  public availabilityClassName!: string;
  public availabilityStatus!: string;

  public ngOnInit(): void {
    const isInWorkingHours: boolean = this._isInWorkingHours();
    this.availabilityClassName = isInWorkingHours ? 'yellow' : 'blue';
    this.availabilityStatus = isInWorkingHours ? 'At work...' : 'Available!';

    // implement "making music" / "with friends" indicator based on availability
  }

  private _isInWorkingHours(): boolean {
    const now: Dayjs = dayjs().tz("Europe/Amsterdam");
    const hour: number = now.hour();
    const day: number = now.day();
    return (day >= 1 && day <= 4) && (hour >= 9 && hour < 17);
  }
}
