import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FighterRankingsComponent } from './fighter-rankings/fighter-rankings.component';
import { PractiseComponent } from './practise/practise.component';

import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';




const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'practise', component: PractiseComponent, canActivate: [AuthGuard] },
    { path: 'fighter-rankings' , component: FighterRankingsComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
         exports: [RouterModule]
    })

    export class AppRoutingModule {

    }
