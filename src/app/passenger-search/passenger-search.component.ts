import { Component } from "@angular/core";
import { Passenger } from "../entities/passenger";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
    selector: 'passenger-search',
    templateUrl: './passenger-search.component.html'
})
export class PassengerSearchComponent {

    name: string = '';
    firstName: string = '';
    passengers: Array<Passenger> = [];
    selectedPassenger: Passenger;

    constructor(private http: HttpClient) {
    }

    search(): void {

        let url = 'http://www.angular.at/api/passenger';

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = new HttpParams()
                            .set('name', this.name)
                            .set('firstName', this.firstName);

        this.http
            .get<Passenger[]>(url, { headers, params})
            .subscribe(
                passengers => { this.passengers = passengers; },
                errResponse => { console.error('Fehler beim Laden', errResponse); }
            );
    }

    select(p: Passenger) {
        this.selectedPassenger = p;
    }

}
