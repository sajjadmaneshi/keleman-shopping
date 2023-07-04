import { DataService } from '../../../../services/data.service';
import { CommentModel } from '../../../../data/models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class CommentRepository extends DataService<CommentModel> {
  constructor(_http: HttpClient) {
    super('comments', _http);
  }
}
