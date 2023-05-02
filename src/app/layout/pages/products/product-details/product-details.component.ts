import { Component, HostListener } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ArticleModel } from '../../../../shared/models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductViewModel } from '../data/models/view-models/product.view-model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  relatedArticles: ArticleModel[] = [];
  productDetails!: ProductViewModel;
  constructor(
    public applicationState: ApplicationStateService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._initRelatedArticles();
    this._getDataFromUrl().then(() => {});
  }

  private _getDataFromUrl(): Promise<string> {
    return new Promise((resolve) => {
      this._activatedRoute.params.subscribe((params: Params) => {
        resolve(params['name']);
      });
    });
  }

  @HostListener('mousewheel', ['$event'])
  onScroll() {
    const productDetailsNavbar = document.querySelector(
      '.product-details-navbar'
    )!;

    (productDetailsNavbar as HTMLElement).offsetTop > 700
      ? productDetailsNavbar.classList.add('add-shadow')
      : productDetailsNavbar.classList.remove('add-shadow');
  }

  private _initRelatedArticles() {
    this.relatedArticles = [
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود',
        date: '2022/01/12',
        author: 'سجاد منشی',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
        date: '2022/01/12',
        author: 'سجاد منشی',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
        date: '2022/01/12',
        author: 'سجاد منشی',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
        date: '2022/01/12',
        author: 'سجاد منشی',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
        date: '2022/01/12',
        author: 'سجاد منشی',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
        date: '2022/01/12',
        author: 'سجاد منشی',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
        date: '2022/01/12',
        author: 'سجاد منشی',
      },
    ];
  }
}
