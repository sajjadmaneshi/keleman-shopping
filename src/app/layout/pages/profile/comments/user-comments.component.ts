import { Component } from '@angular/core';
import { CommentModel } from '../../../../shared/data/models/comment.model';

@Component({
  selector: 'keleman-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
})
export class UserCommentsComponent {
  comments: CommentModel[] = [
    {
      commenter: 'سجاد منشی',
      comment:
        'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-01-01T13:34:45',
      status: 1,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2023-01-01T13:34:45',
      status: 0,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 2,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 1,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 2,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 0,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 2,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 1,
    },
  ];
}
