import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";

import 'rxjs/add/operator/toPromise'; // !!!!! NOTE: import this in any file you need to add `toPromise` to !!!!!

@Injectable()
export class RoboAssistantService {

  constructor(private http: Http) { }

  registerSelf() {
    let requestBody = {
      'name' : 'Jyothi Prasad',
      'email': 'robo-email@gmail.com'
    };
    let headers = new Headers(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
    let options = new RequestOptions(
      {
        headers: headers
      });
    return this.http.post('http://robo.nyllab.com/register', requestBody, options)
      .toPromise()
      .then((response: any) => {
        let res:any = response.json();
        if(!res.error && res.info){
          sessionStorage.setItem('authToken',res.info.token);
        }
      })
      .catch(function(err) {
        /* when /register is called with an already registered email, then the server
         * returns a 400 Error saying that the email already exists. In that case, use
         * this pre-registered token.
         */
        sessionStorage.setItem('authToken','58fc32da884edb320127f44b');
        /* More tokens to use:
         * 58fbd8f8884edb320127f40e
         * 58fc0b73884edb320127f430*/
      });
  }

  getAuthToken() {
    if(!sessionStorage.getItem('authToken')) {
      return this.registerSelf()
        .then(() => {
          return sessionStorage.getItem('authToken');
        });
    }
    return new Promise((resolve, reject) => {
      let token = sessionStorage.getItem('authToken');
      resolve(token);
    });
  }

  getAllRoboAssistants(searchName: string) {
    return this.getAuthToken()
      .then((token: string) => {
        let headers = new Headers(
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
          });
        let params = new URLSearchParams();
        if(searchName) params.set('filter', searchName);
        let options = new RequestOptions({
          headers: headers,
          search: params
        });

        return this.http.get('http://robo.nyllab.com/bots', options)
          .toPromise()
          .then(res => res.json())
          .catch(function(err) {
            console.log('err: \n'+err);
          });
      });
  }

  getRoboAssistant(roboId: string) {
    return this.getAuthToken()
      .then((token: string) => {
        let headers = new Headers(
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
          });
        let options = new RequestOptions({
          headers: headers
        });

        return this.http.get('http://robo.nyllab.com/bots/'+roboId, options)
          .toPromise()
          .then(res => res.json())
          .catch(function(err) {
            console.log('getRoboAssistant err: \n'+err);
          });
      });
  }

  getRoboReviews(reviewId: string) {
    return this.getAuthToken()
      .then((token: string) => {
        let headers = new Headers(
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
          });
        let options = new RequestOptions({
          headers: headers
        });

        return this.http.get('http://robo.nyllab.com/reviews/'+reviewId, options)
          .toPromise()
          .then(res => res.json())
          .catch(function(err) {
            console.log('getRoboReviews err: \n'+err);
          });
      });
  }
}
