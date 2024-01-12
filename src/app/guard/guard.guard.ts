import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { WebsiteServiceService } from '../Service/website-service.service';

export const guardGuard: CanActivateFn = (route, state) => {
  return inject(WebsiteServiceService).checkLogin();
};
