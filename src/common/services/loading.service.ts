import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingStates = new Map<ActionType, BehaviorSubject<boolean>>();

  private getLoadingState(action: ActionType): BehaviorSubject<boolean> {
    if (!this.loadingStates.has(action)) {
      this.loadingStates.set(action, new BehaviorSubject<boolean>(false));
    }
    return this.loadingStates.get(action)!;
  }

  getLoadingStateObservable(action: ActionType): Observable<boolean> {
    return this.getLoadingState(action).asObservable();
  }

  private _setLoadingState(action: ActionType, isLoading: boolean): void {
    this.getLoadingState(action).next(isLoading);
  }

  startLoading(action: ActionType): void {
    this._setLoadingState(action, true);
  }

  stopLoading(action: ActionType): void {
    this._setLoadingState(action, false);
  }
}
type ActionType = 'add' | 'delete' | 'update' | 'read'; // Add more action types as needed
