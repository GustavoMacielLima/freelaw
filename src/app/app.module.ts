import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { LoginModule } from './modules/external/login/login.module';
import { MainModule } from './modules/internal/main/main.module';
import { UserModule } from './modules/internal/contact/contact.module';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { LitigationModule } from './modules/internal/litigation/litigation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    LoginModule,
    MainModule,
    UserModule,
    LitigationModule
  ],
  providers: [
    provideEnvironmentNgxMask({
      validation:true
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
