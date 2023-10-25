export interface Product {
  id?: number;
  productName?: string;
  price?: number;
  quantity?: number;
  isImported?:boolean,
  category?: string ;
  cartItemCount?:number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalTTC: number;
  taxRate: number ;
  totalTaxes: number;
  prixUnitaireTTC: number;
  taxeUnitaire: number;
}
