import { Component } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { CommentModel } from '../../../../../../shared/models/comment.model';
import { BehaviorSubject } from 'rxjs';

SwiperCore.use([Navigation]);
@Component({
  selector: 'keleman-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss'],
})
export class ProductCommentsComponent {
  isLoading = new BehaviorSubject(false);
  slides: CommentModel[] = [
    {
      commenter: 'سجاد منشی',
      comment:
        'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-01-01T13:34:45',
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2023-01-01T13:34:45',
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
  ];
}
