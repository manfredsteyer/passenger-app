import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from "@angular/core";
import { Passenger } from "../entities/passenger";

@Component({
    selector: 'passenger-search',
    templateUrl: './passenger-search.component.html'
})
export class PassengerSearchComponent {

    name: string = '';
    firstName: string = '';
    passengers: Array<Passenger> = [];
    selectedPassenger: Passenger;

    message: string;

    constructor(private http: HttpClient) {
    }

    search(): void {

        let url = 'http://www.angular.at/api/passenger';

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = new HttpParams()
                            .set('name', this.name)
                            .set('firstName', this.firstName)


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

    save(): void {

        let url = 'http://www.angular.at/api/passenger';

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        this.http
            .post<Passenger>(url, this.selectedPassenger, { headers })
            .subscribe(
                passenger => { 
                    this.selectedPassenger = passenger; 
                    this.message = 'Successfully saved!'},
                errResponse => { 
                    console.error('Error saving passenger', errResponse); 
                    this.message = `
                        Error saving passenger. Please keep in mind
                        that records with Ids 1 to 5 cannot be saved
                        and that you can use Id 0 to insert a new one.
                        `
                }
            );

    }


}