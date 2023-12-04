import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphData = new BehaviorSubject<any>(null);
  private apiUrl = 'http://localhost:8080/api/cytoscape/convert'; // Adjust this URL as needed
  constructor(private http: HttpClient) {}

  // Method to set JSON data
  setJsonData(data: any) {

    this.convertJsonToCytoscape(data).subscribe((response)=>{
      this.graphData.next(response);
    })
    
  }


  convertJsonToCytoscape(jsonString: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, jsonString, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Method to get JSON data as an Observable
  getJsonData() {
    return this.graphData.asObservable();
  }
}

