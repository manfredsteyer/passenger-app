import { PassengerService } from './passenger.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from "@angular/core";
import { Passenger } from "../entities/passenger";

@Component({
    selector: 'passenger-search',
    templateUrl: './passenger-search.component.html',
    providers: [PassengerService]
})
export class PassengerSearchComponent {

    name: string = '';
    firstName: string = '';
    passengers: Array<Passenger> = [];
    selectedPassenger: Passenger;

    message: string;

    constructor(private passengerService: PassengerService) {
    }

    search(): void {

        this
            .passengerService
            .find(this.name, this.firstName)
            .subscribe(
                passengers => { this.passengers = passengers; },
                errResponse => { console.error('Error Loading', errResponse); }
            );

    }

    select(p: Passenger) {
        this.selectedPassenger = p;
    }

    // Nur, falls Bonus-Aufgabe bez. Editieren gemacht wurde
    save(): void {

        this
            .passengerService
            .save(this.selectedPassenger)
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