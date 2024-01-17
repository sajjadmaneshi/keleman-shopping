import { ComponentRef } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';
import { Routing } from '../routing';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: RootHandler } = {};

  //call when component changed ===> if we want to reuse component we shold return true.
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isDetachable(route);
  }

  /*
   * If a route should be detached (shouldDetach returns true) this method will be triggered.
   *  In this method you going to tells Angular
   *  what and how to store the route.
   * */
  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle
  ): void {
    const storeKey = this.getStoreKey(route);
    if (detachedTree) {
      const rootHandler = {
        handle: detachedTree,
        storeTime: +new Date(),
      };
      this.handlers[storeKey] = rootHandler;
    }
  }
  /*When you go back to the previous page by clicking the back button of the browser or using location.back() or history.back().
 This method is triggered and it decides whether the page you are going back to should be attached or not,
 of course you can only attach the page if you have detached it (saved it) before.*/
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const storeKey = this.getStoreKey(route);
    if (this.isAtachable(route, storeKey)) {
      /*// you can retrun true only
      // clearNewerHandlerOnAttach is optional
      // when load the snapshot (attach old route) I only want to keep routes stored before this route
      // and delete routes stored after this route.
      // for exmaple, if i go to product list and then product detail and then saler information
      // if product list, product detail and saler information are all detachable.
      // when I back from saler information to product detail I don't want to store saler information
      // and when I back from product detail to product list I don't want to store product detail route
      // because I when I go back to product list and then go to the same product detail again
      // I want to load new data. Why?
      // I think people rarely go back and fort 2 pages multiple time
      // by deleting unnecessary stored route we save memory.*/
      this.clearNewerHandlerOnAttach(this.handlers[storeKey].storeTime);
      return true;
    }
    return false;
  }

  // This method go to where you saved the snapshot and take it out
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const storeKey = this.getStoreKey(route);
    return this.handlers[storeKey]?.handle;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === current.routeConfig;
  }
  private getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
  }
  private getStoreKey(route: ActivatedRouteSnapshot): string {
    const baseUrl = this.getResolvedUrl(route);

    const childrenParts = [];
    let deepestChild = route;
    while (deepestChild.firstChild) {
      deepestChild = deepestChild.firstChild;
      childrenParts.push(deepestChild.url.join('/'));
    }
    return baseUrl + '-key-' + childrenParts.join('/');
  }
  private isDetachable(route: ActivatedRouteSnapshot): boolean {
    const data = route?.routeConfig?.data;
    if (data) {
      return data['shouldDetach'];
    }
    return false;
  }
  private isAtachable(route: ActivatedRouteSnapshot, storeKey: string) {
    return this.isDetachable(route) && this.handlers[storeKey]?.handle;
  }
  private clearNewerHandlerOnAttach(storeTime: number) {
    const handlerKeys = Object.keys(this.handlers);
    handlerKeys.forEach((k) => {
      if (this.handlers[k].storeTime > storeTime) {
        const componentRef: ComponentRef<any> = (this.handlers[k].handle as any)
          .componentRef;
        if (componentRef) {
          componentRef.destroy();
        }
        delete this.handlers[k];
      }
    });
  }
}

export interface RootHandler {
  handle: DetachedRouteHandle;
  storeTime: number;
}
