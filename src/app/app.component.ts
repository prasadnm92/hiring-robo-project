import { Component, OnInit } from '@angular/core';
import { RoboAssistantService } from './roboAssistant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private roboAssistantService: RoboAssistantService) { }

  ngOnInit() {
    this.roboAssistantService.registerSelf();
  }
}
