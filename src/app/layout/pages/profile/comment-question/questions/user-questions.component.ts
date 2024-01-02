import { Component, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../../data/profile.repository';
import { UserQuestionViewModel } from '../../data/view-models/user-question.view-model';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-user-questions',
  templateUrl: './user-questions.component.html',
})
export class UserQuestionsComponent implements OnDestroy {
  questions: UserQuestionViewModel[] = [];

  destroy$ = new Subject<void>();

  page = 1;
  limit = 10;

  totalElements = 0;
  constructor(
    private readonly _profileRepository: ProfileRepository,
    public readonly loadingService: LoadingService
  ) {
    loadingService.startLoading('read', 'userQuestions');
    this._getUserQuestions();
  }

  private _getUserQuestions() {
    this._profileRepository
      .getQuestions(this.page - 1, this.limit)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'userQuestions')),
        takeUntil(this.destroy$),
        map((res) => res.result!)
      )
      .subscribe({
        next: (result) => {
          this.questions = [...result.items];
          this.totalElements = result.totalElements;
        },
        error: () => this.loadingService.stopLoading('read', 'userQuestions'),
      });
  }

  pageChange($event: number) {
    this.page = $event;
    this._getUserQuestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
