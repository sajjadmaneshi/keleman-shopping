import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { HttpClientResult } from '../models/http/http-client.result';
import { StatesViewModel } from '../models/view-models/states.view-model';
import { CityViewModel } from '../models/view-models/city.view-model';
import { SearchViewModel } from '../models/search.view-model';
import { FooterViewModel } from '../models/view-models/footer.view-model';
import { ProductCommentViewModel } from '../../../layout/pages/products/data/models/view-models/product-comment.view-model';
import { ArticleCategoryViewModel } from '../../../layout/pages/magazine/data/view-models/article-category.view-model';
import { AddProductCommentDto } from '../../../layout/pages/products/data/models/dto/add-product-comment.dto';
import { ArticleCommentViewModel } from '../models/article-comment.view-model';
import { AddArticleCommentDto } from '../../../layout/pages/magazine/components/comment/data/add-article-comment.dto';

@Injectable({ providedIn: 'root' })
export class CommentRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('comment', _http);
  }

  getProductComments(
    id: number
  ): Observable<HttpClientResult<ProductCommentViewModel[]>> {
    return this._http.get(`${this._getUrl}/product/${id}`) as Observable<
      HttpClientResult<ProductCommentViewModel[]>
    >;
  }

  addProductComment(
    dto: AddProductCommentDto
  ): Observable<HttpClientResult<boolean>> {
    return this._http.post(`${this._getUrl}/product`, dto) as Observable<
      HttpClientResult<boolean>
    >;
  }
  getArticleComments(
    id: number
  ): Observable<HttpClientResult<ArticleCommentViewModel[]>> {
    return this._http.get(`${this._getUrl}/article/${id}`) as Observable<
      HttpClientResult<ArticleCommentViewModel[]>
    >;
  }

  addArticleComment(
    dto: AddArticleCommentDto
  ): Observable<HttpClientResult<boolean>> {
    return this._http.post(`${this._getUrl}/article`, dto) as Observable<
      HttpClientResult<boolean>
    >;
  }
}
