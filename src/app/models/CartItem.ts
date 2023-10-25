import {Product} from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
  totalTTC: number;
  taxRate: number ;
  totalTaxes: number;
  prixUnitaireTTC: number;
  taxeUnitaire: number;
}
