export interface Product {
  id?: number;
  productName?: string;
  price?: number;
  quantity?: number;
  isImported?:boolean,
  category?: string ;
  cartItemCount?:number;
}

