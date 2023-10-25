import {Injectable} from '@angular/core';
import {CartItem} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  calculateTaxes(cardItem: CartItem): number {

    if (cardItem.product.isImported) {
      cardItem.taxRate = 5;

    }else {
      cardItem.taxRate = 0;

    }

    if (cardItem.product.category === 'Books') {
      cardItem.taxRate += 10;
    } else if (cardItem.product.category === 'Food' || cardItem.product.category === 'Medecine') {
      cardItem.taxRate += 0;
    }else {
      cardItem.taxRate += 20;
    }
    // @ts-ignore
    const taxAmount = (cardItem.product.price * cardItem.taxRate) / 100;
    return Math.ceil(taxAmount * 20) / 20;
  }
  calculatePriceTTC(cardItem: CartItem): number {
    const taxes = this.calculateTaxes(cardItem);
    // @ts-ignore
    const priceTTC = cardItem.product.price + taxes;
    return Math.ceil(priceTTC * 20) / 20;
  }
  calculateTotalTTC(cardItems: CartItem[]): number {

    let totalPriceTTC = 0;
    cardItems.forEach(cartItem => {

      totalPriceTTC += cartItem.prixUnitaireTTC *cartItem.quantity;

    });
    return Math.ceil(totalPriceTTC * 20) / 20;
  }

}
