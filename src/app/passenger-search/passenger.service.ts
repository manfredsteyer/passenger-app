import { first } from 'rxjs/operator/first';
import { Passenger } from '../entities/passenger';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PassengerService {

    constructor(private http: HttpClient) {
    }
            
    find(name: string, firstName: string): Observable<Passenger[]> {
        
        let url = 'http://www.angular.at/api/passenger';

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = new HttpParams()
                            .set('name', name)
                            .set('firstName', firstName);

        return this.http
            .get(url, { headers, params});

    }

    // Nur, falls Bonusaufgabe bez. Speichern gemacht wurde
    save(passenger: Passenger): Observable<Passenger> {
    
        let url = 'http://www.angular.at/api/passenger';
        
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.post<Passenger>(url, passenger, { headers });
        
    }

}