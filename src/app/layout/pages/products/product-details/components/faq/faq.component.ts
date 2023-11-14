import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { FaqViewModel } from './data/model/faq.view-model';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { FaqListDialogComponent } from './faq-list-dialog/faq-list-dialog.component';
import { FaqRepository } from './data/faq.repository';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { Routing } from '../../../../../../routing';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { Router } from '@angular/router';
import { ArticleCommentViewModel } from '../../../../../../shared/data/models/article-comment.view-model';
@Component({
  selector: 'keleman-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FaqRepository],
})
export class FAQComponent implements OnInit, OnDestroy {
  isLoading = false;

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

  tranckByFn(index: number, item: FaqViewModel) {
    return item.id;
  }

  public addquestion() {
    if (this.isLoggedIn) this.openAddQuestionDialog();
    else this.openRegisterBeforeActionDialog();
  }

  openRegisterBeforeActionDialog() {
    const dialogRef = this._dialog.open(AlertDialogComponent, {
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
    this.isLoading;
    const faq$ = this._faqRepository
      .getAllQuestions(this.productId)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.questions = [...result.result!];
      });
    this.subscriptions.add(faq$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    if (this.productId) {
      this._getAllQuetions();
    }
    this._authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
