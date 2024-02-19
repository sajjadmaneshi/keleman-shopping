import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { FaqViewModel } from './data/faq.view-model';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { FaqListDialogComponent } from './faq-list-dialog/faq-list-dialog.component';
import { FaqRepository } from './data/faq.repository';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AlertDialogComponent } from '../../../../../shared/components/alert-dialog/alert-dialog.component';
import { Routing } from '../../../../../routing';
import { AlertDialogDataModel } from '../../../../../shared/components/alert-dialog/alert-dialog-data.model';
@Component({
  selector: 'keleman-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FaqRepository],
})
export class FAQComponent implements OnInit, OnDestroy {
  isLoading = true;

  @Input() productId!: number;

  questions: FaqViewModel[] = [];

  subscriptions = new Subscription();
  isLoggedIn = false;
  constructor(
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _router: Router,
    private readonly _faqRepository: FaqRepository
  ) {}

  openAddQuestionDialog() {
    this._dialog
      .open(AddQuestionDialogComponent, {
        width: '700px',
        panelClass: 'custom-mat-dialog',
        autoFocus: false,
        data: this.productId,
      })
      .afterClosed()
      .subscribe(() => this._getAllQuetions());
  }

  openAllQuestionsDialog() {
    this._dialog.open(FaqListDialogComponent, {
      width: '700px',
      data: this.questions,
      panelClass: 'custom-mat-dialog',
    });
  }

  public addquestion() {
    if (this.isLoggedIn) this.openAddQuestionDialog();
    else this.openRegisterBeforeActionDialog();
  }

  openRegisterBeforeActionDialog() {
    this._dialog.open(AlertDialogComponent, {
      data: {
        message: 'لطفا برای ثبت پرسش ابتدا وارد سایت شوید',
        callBackButtonText: 'واردشوید',
        callBackFunction: () =>
          this._router.navigate([Routing.register], {
            queryParams: { redirectUrl: this._router.routerState.snapshot.url },
          }),
      } as AlertDialogDataModel,
    });
  }

  private _getAllQuetions() {
    const faq$ = this._faqRepository
      .getAllQuestions(this.productId)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          this.questions = [...result.result!];
        },
        error: () => (this.isLoading = false),
      });
    this.subscriptions.add(faq$);
  }

  ngOnInit(): void {
    if (this.productId) {
      this._getAllQuetions();
    }
    this._authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
