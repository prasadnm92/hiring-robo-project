import {Component, OnInit} from "@angular/core";
import {RoboAssistantService} from "../roboAssistant.service";

import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit  {

  constructor(private roboAssistantService: RoboAssistantService,
              private route: ActivatedRoute) { }

  roboDetails: any;

  reviews: any[];

  ngOnInit() {
    let service = this.roboAssistantService;
    this.route.params
      .subscribe((params: Params) => {
        service.getRoboAssistant(params['robo_id'])
          .then((res: any) => {
            this.roboDetails = res;
            service.getRoboReviews(this.roboDetails.reviews)
              .then((reviews: any) => {
                this.reviews = reviews.content;
              });
          })
          .catch((err: any) => {
            console.log("ERROR: in detail component init");
            console.dir(err);
          });
      });
  }
}
