import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export const fb = () => {
  const fb = inject(FormBuilder);

  return fb.group({
    nombre: fb.control('', [Validators.required]),
    descripcion: fb.control('', [Validators.required]),
    masa: fb.control('artesanal', [Validators.required]),
    descuento: fb.control('0.0', [Validators.required]),
    tipoPizza: fb.control('sencilla'),
    duo: fb.group({
      mitad1: fb.control<string | null>(null, [Validators.required]),
      mitad2: fb.control<string | null>(null, [Validators.required]),
    }),
    cuatroEstaciones: fb.group({
      cuarto1: fb.control<string | null>(null, [Validators.required]),
      cuarto2: fb.control<string | null>(null, [Validators.required]),
      cuarto3: fb.control<string | null>(null, [Validators.required]),
      cuarto4: fb.control<string | null>(null, [Validators.required]),
    }),
    tamanosPrecios: fb.group({
      familiar: fb.control<number | null>(null, Validators.required),
      mediana: fb.control<number | null>(null, Validators.required),
      personal: fb.control<number | null>(null, Validators.required),
    }),
  });
};
