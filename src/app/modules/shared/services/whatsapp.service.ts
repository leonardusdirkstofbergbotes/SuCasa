import { DeliveryMethod } from './../../../enums/DeliveryMethod';
import { MealForWhatsApp } from './../../../models/mealForWhatsApp';
import { WHATSAPP } from 'src/app/configs/keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WhatsAppCTA } from 'src/app/enums/WhatsappCTA';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WHATSAPP.TempToken}`,
    }),
  };
  private url = `https://graph.facebook.com/v15.0/${WHATSAPP.TestNumberId}/messages`;

  constructor(private http: HttpClient) {}

  sendMessage(data: object) {

    this.http.post(this.url, data, this.options).subscribe((response) => {
      console.log(response);
    });
  }

  orderRecieved(
    meals: MealForWhatsApp[],
    deliveryMethod: DeliveryMethod,
    orderId: string
  ) {
    const totalMeals = meals.length;
    const mealOrderCombined = '';

    const data = {
      messaging_product: 'whatsapp',
      to: WHATSAPP.ClientNumber,
      type: 'template',
      template: {
        name: 'order_recieved',
        language: {
          code: 'en_US',
        },
        components: [
          {
            type: 'body',
            parameters: [
              this.addTextVariable(totalMeals.toString()),
              this.addTextVariable(deliveryMethod),
              this.addTextVariable(mealOrderCombined),
            ],
          },
          this.buildButton(
            WhatsAppCTA.URL,
            1,
            `https://pasta-chief.web.app/orders/${orderId}`
          ),
        ],
      },
    };

    this.sendMessage(data);
  }

  private buildMessageHeading(type: string, headerText: string) {
    return {
      type: 'header',
      parameters: [
        {
          type: 'text',
          text: headerText,
        },
      ],
    };
  }

  private addTextVariable(text: string) {
    return {
      type: 'text',
      text: text,
    };
  }

  private buildButton(subType: WhatsAppCTA, index: number, payload: string) {
    return {
      type: 'button',
      sub_type: subType,
      index: index,
      parameters: [
        {
          type: 'payload',
          payload: payload,
        },
      ],
    };
  }
}
