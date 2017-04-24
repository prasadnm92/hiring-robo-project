import { Component, OnInit } from '@angular/core';
import {RoboAssistantService} from "../roboAssistant.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  constructor(private roboAssistantService: RoboAssistantService) { }

  searchResults: any[]; // You can update the search results array as data is fetched.

  searchText: string = ""; // You can two-way bind this to the textbox input for searches

  sendSearch() {
    this.roboAssistantService.getAllRoboAssistants(this.searchText)
    .then((res:any) => { this.searchResults = res; });
  }

}
