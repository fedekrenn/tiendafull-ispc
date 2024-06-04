export interface Product {
  id?: number;
  marca: string;
  modelo: string;
  imagen?: string;
  precio: number;
  color: string;
  detalle?: string;
  estilo: string;
  material: string;
  rodado: string;
  stock: number;
}

export interface Cart {
  id_carrito: number;
  fecha_creacion: string;
  email: string;
  items: Item[];
  message?: string;
}

export interface Item {
  id: number;
  cantidad: number;
  producto: Product;
}

export interface NewUser {
  username: string;
  first_name: string;
  last_name: string;
  nro_documento: string;
  telefono: string;
  email: string;
  password: string;
}

export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  is_staff?: boolean;
}

export interface UserResponse {
  user: User;
  token: string;
  is_staff: boolean;
}

export interface LogoutResponse {
  message: string;
}

export interface PurchaseResponse {
  id: number;
  fecha: string;
  email: string;
  modo_pago: string;
  nro_factura: string;
  total: number;
  detalle: PurchaseDetail[];
}

export interface PurchaseDetail {
  cantidad: number;
  precio_compra: number;
  producto: Product;
}
