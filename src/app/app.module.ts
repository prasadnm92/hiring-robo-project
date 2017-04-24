import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'detail/:robo_id', component: DetailComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full'}
];


import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import {RoboAssistantService} from './roboAssistant.service';
import {RoboPricePipe} from './robo-price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailComponent,
    RoboPricePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RoboAssistantService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
