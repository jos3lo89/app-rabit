// export interface Pizza {
//   nombre: string;
//   descripcion: string;
//   masa: string;
//   descuento: string;
//   tipoPizza: string;
//   duo: Duo;
//   cuatroEstaciones: CuatroEstaciones;
//   tamanosPrecios: TamanosPrecios;
// }

// export interface Duo {
//   mitad1: string | null;
//   mitad2: string | null;
// }

// export interface CuatroEstaciones {
//   cuarto1: string | null;
//   cuarto2: string | null;
//   cuarto3: string | null;
//   cuarto4: string | null;
// }

// export interface TamanosPrecios {
//   familiar: number;
//   mediana: number;
//   personal: number;
// }

// export interface PizzaDb extends Pizza {
//   id: string;
//   image: string;
// }

export interface Pizza {
  nombre: string;
  descripcion: string;
  masa: string;
  tipoPizza: string;
  tamanosPrecios: TamanosPrecios;
  opciones: OpcionesPizza;
}

export interface TamanosPrecios {
  familiar: number;
  mediana: number;
  personal: number;
}

export interface OpcionesPizza {
  tipo: 'dulce' | 'salada';
  masa: 'artesanal' | 'clasica';
  configuracion: 'completa' | 'duo' | 'cuatroEstaciones';
  duo?: Duo;
  cuatroEstaciones?: CuatroEstaciones;
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

export interface PizzaDb extends Pizza {
  id: string;
  image: string;
}
