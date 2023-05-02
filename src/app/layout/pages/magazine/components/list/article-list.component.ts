import { Component } from '@angular/core';
import { ArticleModel } from '../../../../../shared/models/article.model';

@Component({
  selector: 'app-magazine-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  articles: ArticleModel[] = [
    {
      title: 'کابین آساسنسور چیست',
      description:
        'همیشه این احتمال وجود دارد که پس از تکمیل و اتمام ساخت و ساز ساختمان، نیاز به نصب آسانسور احساس شود. اما آیا این امر امکان پذیر است؟ آیا به استحکام ساختمان صدمه ای وارد نمی شود؟ آیا آسانسور نصب شده ایمنی لازم را تامین می کند؟ این موضوع تا چه اندازه هزینه بر است؟ آسانسور خانگی که به هوم لیفت معروف است قابلیت نصب در ساختمان هایی که پروسه ساخت آن ها تکمیل شده است را دارد و در ساختمان هایی که از قبل جایی برای نصب آن ها در نظر گرفته نشده است بسیار مناسب اند. آسانسور خانگی نوعی بالابر است که که امکاناتی شبیه آسانسور را دارد. ولی یک آسانسور کامل نیست اما دارای امکاناتی فراتر از یک بالابر است. در اصطلاح به آسانسورهای خانگی، مینی آسانسور نیز گفته می شود. برای آشنایی بیشتر با جزئیات و ویژگی های هوم لیفت ها با کلمان همراه شوید و ادامه مقاله را از دست ندهید.',
      image: 'assets/media/temp/2.jpg',
      date: '2022/01/02',
      author: 'سجاد منشی',
    },
    {
      title: 'آسانسور چیست؟ | بررسی قیمت، قطعات و تاریخچه آسانسور',
      description:
        'همیشه این احتمال وجود دارد که پس از تکمیل و اتمام ساخت و ساز ساختمان، نیاز به نصب آسانسور احساس شود. اما آیا این امر امکان پذیر است؟ آیا به استحکام ساختمان صدمه ای وارد نمی شود؟ آیا آسانسور نصب شده ایمنی لازم را تامین می کند؟ این موضوع تا چه اندازه هزینه بر است؟ آسانسور خانگی که به هوم لیفت معروف است قابلیت نصب در ساختمان هایی که پروسه ساخت آن ها تکمیل شده است را دارد و در ساختمان هایی که از قبل جایی برای نصب آن ها در نظر گرفته نشده است بسیار مناسب اند. آسانسور خانگی نوعی بالابر است که که امکاناتی شبیه آسانسور را دارد. ولی یک آسانسور کامل نیست اما دارای امکاناتی فراتر از یک بالابر است. در اصطلاح به آسانسورهای خانگی، مینی آسانسور نیز گفته می شود. برای آشنایی بیشتر با جزئیات و ویژگی های هوم لیفت ها با کلمان همراه شوید و ادامه مقاله را از دست ندهید.',
      image: 'assets/media/temp/2.jpg',
      date: '2022/01/02',
      author: 'سجاد منشی',
    },
    {
      title: 'آسانسور چیست؟ | بررسی قیمت، قطعات و تاریخچه آسانسور',
      description:
        'همیشه این احتمال وجود دارد که پس از تکمیل و اتمام ساخت و ساز ساختمان، نیاز به نصب آسانسور احساس شود. اما آیا این امر امکان پذیر است؟ آیا به استحکام ساختمان صدمه ای وارد نمی شود؟ آیا آسانسور نصب شده ایمنی لازم را تامین می کند؟ این موضوع تا چه اندازه هزینه بر است؟ آسانسور خانگی که به هوم لیفت معروف است قابلیت نصب در ساختمان هایی که پروسه ساخت آن ها تکمیل شده است را دارد و در ساختمان هایی که از قبل جایی برای نصب آن ها در نظر گرفته نشده است بسیار مناسب اند. آسانسور خانگی نوعی بالابر است که که امکاناتی شبیه آسانسور را دارد. ولی یک آسانسور کامل نیست اما دارای امکاناتی فراتر از یک بالابر است. در اصطلاح به آسانسورهای خانگی، مینی آسانسور نیز گفته می شود. برای آشنایی بیشتر با جزئیات و ویژگی های هوم لیفت ها با کلمان همراه شوید و ادامه مقاله را از دست ندهید.',
      image: 'assets/media/temp/2.jpg',
      date: '2022/01/02',
      author: 'سجاد منشی',
    },
    {
      title: 'آسانسور چیست؟ | بررسی قیمت، قطعات و تاریخچه آسانسور',
      description:
        'همیشه این احتمال وجود دارد که پس از تکمیل و اتمام ساخت و ساز ساختمان، نیاز به نصب آسانسور احساس شود. اما آیا این امر امکان پذیر است؟ آیا به استحکام ساختمان صدمه ای وارد نمی شود؟ آیا آسانسور نصب شده ایمنی لازم را تامین می کند؟ این موضوع تا چه اندازه هزینه بر است؟ آسانسور خانگی که به هوم لیفت معروف است قابلیت نصب در ساختمان هایی که پروسه ساخت آن ها تکمیل شده است را دارد و در ساختمان هایی که از قبل جایی برای نصب آن ها در نظر گرفته نشده است بسیار مناسب اند. آسانسور خانگی نوعی بالابر است که که امکاناتی شبیه آسانسور را دارد. ولی یک آسانسور کامل نیست اما دارای امکاناتی فراتر از یک بالابر است. در اصطلاح به آسانسورهای خانگی، مینی آسانسور نیز گفته می شود. برای آشنایی بیشتر با جزئیات و ویژگی های هوم لیفت ها با کلمان همراه شوید و ادامه مقاله را از دست ندهید.',
      image: 'assets/media/temp/2.jpg',
      date: '2022/01/02',
      author: 'سجاد منشی',
    },
    {
      title: 'آسانسور چیست؟ | بررسی قیمت، قطعات و تاریخچه آسانسور',
      description:
        'همیشه این احتمال وجود دارد که پس از تکمیل و اتمام ساخت و ساز ساختمان، نیاز به نصب آسانسور احساس شود. اما آیا این امر امکان پذیر است؟ آیا به استحکام ساختمان صدمه ای وارد نمی شود؟ آیا آسانسور نصب شده ایمنی لازم را تامین می کند؟ این موضوع تا چه اندازه هزینه بر است؟ آسانسور خانگی که به هوم لیفت معروف است قابلیت نصب در ساختمان هایی که پروسه ساخت آن ها تکمیل شده است را دارد و در ساختمان هایی که از قبل جایی برای نصب آن ها در نظر گرفته نشده است بسیار مناسب اند. آسانسور خانگی نوعی بالابر است که که امکاناتی شبیه آسانسور را دارد. ولی یک آسانسور کامل نیست اما دارای امکاناتی فراتر از یک بالابر است. در اصطلاح به آسانسورهای خانگی، مینی آسانسور نیز گفته می شود. برای آشنایی بیشتر با جزئیات و ویژگی های هوم لیفت ها با کلمان همراه شوید و ادامه مقاله را از دست ندهید.',
      image: 'assets/media/temp/2.jpg',
      date: '2022/01/02',
      author: 'سجاد منشی',
    },
    {
      title: 'آسانسور چیست؟ | بررسی قیمت، قطعات و تاریخچه آسانسور',
      description:
        'همیشه این احتمال وجود دارد که پس از تکمیل و اتمام ساخت و ساز ساختمان، نیاز به نصب آسانسور احساس شود. اما آیا این امر امکان پذیر است؟ آیا به استحکام ساختمان صدمه ای وارد نمی شود؟ آیا آسانسور نصب شده ایمنی لازم را تامین می کند؟ این موضوع تا چه اندازه هزینه بر است؟ آسانسور خانگی که به هوم لیفت معروف است قابلیت نصب در ساختمان هایی که پروسه ساخت آن ها تکمیل شده است را دارد و در ساختمان هایی که از قبل جایی برای نصب آن ها در نظر گرفته نشده است بسیار مناسب اند. آسانسور خانگی نوعی بالابر است که که امکاناتی شبیه آسانسور را دارد. ولی یک آسانسور کامل نیست اما دارای امکاناتی فراتر از یک بالابر است. در اصطلاح به آسانسورهای خانگی، مینی آسانسور نیز گفته می شود. برای آشنایی بیشتر با جزئیات و ویژگی های هوم لیفت ها با کلمان همراه شوید و ادامه مقاله را از دست ندهید.',
      image: 'assets/media/temp/2.jpg',
      date: '2022/01/02',
      author: 'سجاد منشی',
    },
    {
      title: 'آسانسور چیست؟ | بررسی قیمت، قطعات و تاریخچه آسانسور',
      description:
        'همیشه این احتمال وجود دارد که پس از تکمیل و اتمام ساخت و ساز ساختمان، نیاز به نصب آسانسور احساس شود. اما آیا این امر امکان پذیر است؟ آیا به استحکام ساختمان صدمه ای وارد نمی شود؟ آیا آسانسور نصب شده ایمنی لازم را تامین می کند؟ این موضوع تا چه اندازه هزینه بر است؟ آسانسور خانگی که به هوم لیفت معروف است قابلیت نصب در ساختمان هایی که پروسه ساخت آن ها تکمیل شده است را دارد و در ساختمان هایی که از قبل جایی برای نصب آن ها در نظر گرفته نشده است بسیار مناسب اند. آسانسور خانگی نوعی بالابر است که که امکاناتی شبیه آسانسور را دارد. ولی یک آسانسور کامل نیست اما دارای امکاناتی فراتر از یک بالابر است. در اصطلاح به آسانسورهای خانگی، مینی آسانسور نیز گفته می شود. برای آشنایی بیشتر با جزئیات و ویژگی های هوم لیفت ها با کلمان همراه شوید و ادامه مقاله را از دست ندهید.',
      image: 'assets/media/temp/2.jpg',
      date: '2022/01/02',
      author: 'سجاد منشی',
    },
  ];
}
