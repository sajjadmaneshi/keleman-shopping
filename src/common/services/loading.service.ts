import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingStates = new Map<string, BehaviorSubject<boolean>>();

  private getLoadingState(
    action: ActionType,
    actionName?: string
  ): BehaviorSubject<boolean> {
    const key = this.getKey(action, actionName);
    if (!this.loadingStates.has(key)) {
      this.loadingStates.set(key, new BehaviorSubject<boolean>(false));
    }
    return this.loadingStates.get(key)!;
  }

  private getKey(action: ActionType, actionName?: string): string {
    return `${action}_${actionName || ''}`;
  }
  getLoadingStateObservable(
    action: ActionType,
    actionName?: string
  ): Observable<boolean> {
    return this.getLoadingState(action, actionName).asObservable();
  }

  private _setLoadingState(
    action: ActionType,
    isLoading: boolean,
    actionName?: string
  ): void {
    this.getLoadingState(action, actionName).next(isLoading);
  }

  startLoading(action: ActionType, actionName?: string): void {
    this._setLoadingState(action, true, actionName);
  }

  stopLoading(action: ActionType, actionName?: string): void {
    this._setLoadingState(action, false, actionName);
  }
}

type ActionType = 'add' | 'delete' | 'update' | 'read'; // Add more action types as needed
