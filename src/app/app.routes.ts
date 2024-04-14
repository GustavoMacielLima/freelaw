import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/external/login/login.component';
import { NgModule } from '@angular/core';
import { MainComponent } from './modules/internal/main/main.component';
import { ContactComponent } from './modules/internal/contact/contact.component';
import { LitigationComponent } from './modules/internal/litigation/litigation.component';

export const routes: Routes = [
    {
        path: '', component: MainComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'main', component: MainComponent
    },
    {
        path: 'user', component: ContactComponent
    },
    {
        path: 'litigation', component: LitigationComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
  