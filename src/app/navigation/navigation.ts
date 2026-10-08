import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { routes } from '../app.routes';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  imports: [RouterModule, AsyncPipe],
  selector: 'hylke-navigation',
  styleUrls: ['./navigation.scss'],
  templateUrl: './navigation.html',
})
export class NavigationComponent implements OnInit {
  private readonly _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  public readonly navigationRoutes: Routes = routes.filter(route => route.title);

  public readonly isMobileUser$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );

  private readonly _showMobileNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly showMobileNav$: Observable<boolean> = this._showMobileNav$.asObservable();

  public availabilityClassName!: string;
  public availabilityStatus!: string;

  public ngOnInit(): void {
    const isInWorkingHours: boolean = this._isInWorkingHours();
    this.availabilityClassName = isInWorkingHours ? 'yellow' : 'blue';
    this.availabilityStatus = isInWorkingHours ? 'At work...' : 'Available!';

    // implement "making music" / "with friends" indicator based on availability
  }

  public toggleMobileNavigation(): void {
    this._showMobileNav$.next(!this._showMobileNav$.value);
  }

  private _isInWorkingHours(): boolean {
    const now: Dayjs = dayjs().tz("Europe/Amsterdam");
    const hour: number = now.hour();
    const day: number = now.day();
    return (day >= 1 && day <= 4) && (hour >= 9 && hour < 17);
  }
}
