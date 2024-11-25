export interface Pizza {
  nombre: string;
  descripcion: string;
  masa: string;
  descuento: string;
  tipoPizza: string;
  duo: Duo;
  cuatroEstaciones: CuatroEstaciones;
  tamanosPrecios: TamanosPrecios;
}

export interface PizzaDb extends Pizza {
  id: string;
  image: string
}

export interface Duo {
  mitad1: string | null;
  mitad2: string | null;
}

export interface CuatroEstaciones {
  cuarto1: string | null;
  cuarto2: string | null;
  cuarto3: string | null;
  cuarto4: string | null;
}

export interface TamanosPrecios {
  familiar: number;
  mediana: number;
  personal: number;
}

// carrito

// interface CartItem {
//   pizzaId: string;
//   size: PizzaSize;
//   dough: DoughType;
//   quantity: number;
//   price: number;
//   half1?: string;
//   half2?: string;
//   quarters?: string[];
// }

// export interface Cart {
//   id: string;
//   items: CartItem[];
//   totalPrice: number;
// }
