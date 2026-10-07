import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  imports: [AsyncPipe],
  selector: 'hylke-home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html',
})
export class HomeComponent implements AfterViewInit {
  private readonly _typewriterElementSelector: string = '.typewriter';
  private readonly _typewriterSpeed: number = 300;
  private readonly _deleteSpeed: number = 100;
  private readonly _typewriterTexts: string[] = [
    "a human touch.",
    "attention to detail.",
    "users in mind.",
    "creativity.",
    "care and curiosity.",
    "innovation.",
  ];

  private _loopNumber: number = 0;

  private readonly _currentText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly typewriterText$: Observable<string> = this._currentText$.asObservable();

  public ngAfterViewInit(): void {
    this._initTypeWriteEffect();
  }

  private _initTypeWriteEffect(): void {
    const typewriterElement: Element | null = document.querySelector(this._typewriterElementSelector);
    if (typewriterElement) {
      console.warn("TYPE!");
      this._writeText(typewriterElement);
    }
  }

  private _writeText(element: Element): void {
    const nextText: string = this._typewriterTexts[this._loopNumber]
    for (let i = 0; i <= nextText.length; i++) {
      const timeout: number = (this._typewriterSpeed - (Math.random() * 20)) * i;
      setTimeout(() => {
        this._currentText$.next(nextText.substring(0, i));

        if (i === nextText.length - 1) {
          setTimeout(() => this._deleteText(element), this._typewriterSpeed * 4);
        }
      }, timeout);
    }
  }

  private _deleteText(element: Element): void {
    for (let i = this._typewriterTexts[this._loopNumber].length; i >= 0; i--) {
      const timeout: number = (this._deleteSpeed - (Math.random() * 10)) * (this._typewriterTexts[this._loopNumber].length - i);
      setTimeout(() => {
        this._currentText$.next(this._typewriterTexts[this._loopNumber].substring(0, i));

        if (i === 0) {
          setTimeout(() => {
            this._loopNumber = this._loopNumber < this._typewriterTexts.length - 1 ? this._loopNumber + 1 : 0;
            this._writeText(element);
          }, this._typewriterSpeed);
        }
      }, timeout);
    }
  }

}
