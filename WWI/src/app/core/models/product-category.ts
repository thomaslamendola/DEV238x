export interface Item {
    name: string;
    description: string;
    price: number;
    imagelink: string;
    rating: string;
    stock: string;
    category: string;
    subcategory: string;
  }
  
  export interface SubCategory {
    name: string;
    items: Item[]
  }
  
  export interface ProductCategory {
    category: string;
    subcategories: SubCategory[]
  }