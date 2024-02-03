import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appErrorFeedback]',
  standalone: true,
})
export class ErrorFeedbackDirective implements OnChanges {
  @Input() appErrorFeedback!: string;
  @Input() isFormSubmitted: boolean = false;

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _control: NgControl,
    @Inject(DOCUMENT) private document: Document
  ) {}
  private _addErrorFeedBack() {
    const hasError = this._control.invalid;
    const span = this.document.querySelector(
      '.invalid-feedback'
    ) as HTMLSpanElement;
    const errorMessage = this._renderer.createText(this._buildErrorMessage);
    this._resetErrorMessages(span);
    if (hasError) {
      this._renderer.addClass(this._el.nativeElement, 'is-invalid');

      this._renderer.appendChild(span, errorMessage);
    } else {
      this._renderer.removeClass(this._el.nativeElement, 'is-invalid');
    }
  }
  private _resetErrorMessages(span: HTMLSpanElement) {
    span?.childNodes.forEach((node) => {
      this._renderer.removeChild(span, node);
    });
  }

  private get _wichTypeOfErrorHas() {
    if (this._control.hasError('required')) return 'required';
    else return 'incorrect-format';
  }

  private get _buildErrorMessage() {
    const errorType = this._wichTypeOfErrorHas;
    return errorType === 'required'
      ? `لطفا  ${this.appErrorFeedback} را وارد نمایید`
      : `فرمت ${this.appErrorFeedback} وارد شده صحیح نمی باشد`;
  }

  private _addSpan() {
    const feedBackSpan = this._renderer.createElement('span');
    this._renderer.addClass(feedBackSpan, 'invalid-feedback');
    this._renderer.addClass(feedBackSpan, 'text-center');
    this._renderer.addClass(feedBackSpan, 'my-1');

    const parentElement = this._renderer.parentNode(this._el.nativeElement);
    const nextSibling = this._renderer.nextSibling(this._el.nativeElement);
    if (nextSibling) {
      this._renderer.insertBefore(parentElement, feedBackSpan, nextSibling);
    } else {
      this._renderer.appendChild(parentElement, feedBackSpan);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this._addSpan();
    if (this.isFormSubmitted) this._addErrorFeedBack();
  }
}
