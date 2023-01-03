import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserInfoComponent } from './side-bar/user-info/user-info.component';
import { MatIconModule } from '@angular/material/icon';
import { UserWalletComponent } from './side-bar/user-wallet/user-wallet.component';
import { SideBarMenuComponent } from './side-bar/side-bar-menu/side-bar-menu.component';

@NgModule({
  declarations: [ProfileComponent, UserInfoComponent, UserWalletComponent, SideBarMenuComponent],
  imports: [ProfileRoutingModule, MatIconModule, DecimalPipe],
})
export class ProfileModule {}
