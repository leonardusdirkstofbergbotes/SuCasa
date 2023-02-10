import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private http: HttpClient) { }

  sendMessage (message: string, number: string) {
    console.log(message);
    const url = `https://graph.facebook.com/v15.0/109453638717400/messages`;
      const data = {
        messaging_product: "whatsapp",
        to: 27606056804,
        type: "template",
        template: {
            name: "hello_wosrld",
            language: {
                code: "en_US"
            }
        }
      };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer EAAKPFUQYXcEBAEJ4IluLUjVri9cKquVEd4k3LVSWd06Bvopipmm0jcAfW5Bz3cdGpHpmO0njefVivzJUUUsPBf9inh06m7Uex7lAYbixMk6iTE7N2WZCepO5Evhllob7CF62CgbkOanr0E6NgcduHyVLon59IRCy7udqIOMH0lZBBKDZCxDoacPvXdVCshZBU4s7lfX8DgZDZD'
      })
    }

    this.http.post(url, data, options).subscribe(response => {
      console.log(response);
    });
  }
}
