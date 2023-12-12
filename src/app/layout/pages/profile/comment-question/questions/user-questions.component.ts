import { Component } from '@angular/core';
import { UserCommentViewModel } from '../../data/view-models/user-comment.view-model';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../../data/profile.repository';
import { UserQuestionViewModel } from '../../data/view-models/user-question.view-model';

@Component({
  selector: 'keleman-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.scss'],
})
export class UserQuestionsComponent {
  questions: UserQuestionViewModel[] = [];

  isLoading = true;
  destroy$ = new Subject<void>();

  page = 1;
  limit = 10;

  totalElements = 0;
  constructor(private readonly _profileRepository: ProfileRepository) {
    this._getUserQuestions();
  }

  private _getUserQuestions() {
    this._profileRepository
      .getQuestions(this.page - 1, this.limit)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
        map((res) => res.result!)
      )
      .subscribe(
        (result) => {
          this.questions = [...result.items];
          this.totalElements = result.totalElements;
        },
        () => (this.isLoading = false)
      );
  }

  pageChange($event: number) {
    this.page = $event;
    this._getUserQuestions();
  }
}
