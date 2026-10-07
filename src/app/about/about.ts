import { Component, AfterViewInit, OnInit } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

@Component({
  imports: [],
  selector: 'hylke-about',
  styleUrls: ['./about.scss'],
  templateUrl: './about.html',
})
export class AboutComponent implements OnInit, AfterViewInit {
  private _horizontalScrollTarget: number | undefined;
  public currentAge: number | undefined;

  public ngOnInit(): void {
    this._setAge();
  }

  public ngAfterViewInit(): void {
    this._setContainerHeight();
  }

  public onWheel(event: WheelEvent): void {
    const container: EventTarget | null = event.currentTarget;
    if (!(container instanceof HTMLElement) || event.deltaY === 0) {
      return;
    }

    console.warn(event);

    const maxScrollLeft: number = container.scrollWidth - container.clientWidth;
    const currentTarget: number = this._horizontalScrollTarget ?? container.scrollLeft;
    const nextTarget: number = Math.max(
      0,
      Math.min(maxScrollLeft, currentTarget + event.deltaY),
    );

    if (nextTarget !== currentTarget) {
      event.preventDefault();
      this._horizontalScrollTarget = nextTarget;
      container.scrollTo({ left: nextTarget });
    } else {
      this._horizontalScrollTarget = undefined;
    }
  }

  public onScrollEnd(): void {
    this._horizontalScrollTarget = undefined;
  }

  private _setContainerHeight(): void {
    const nav: HTMLElement | null = document.querySelector<HTMLElement>('.navigation');
    const aboutContainer: HTMLElement | null = document.querySelector<HTMLElement>('.about-container');
    if (nav && aboutContainer) {
      const height: number = nav.offsetHeight;
      aboutContainer.style.height = `calc(100vh - ${height}px)`;
    }
  }

  private _setAge(): void {
    const now: Dayjs = dayjs();
    const birthday: Dayjs = dayjs('2003-05-31');
    this.currentAge = now.diff(birthday, 'year');
  }
}
