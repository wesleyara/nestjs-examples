import z from 'zod';

export const clientCreateSchema = z.object({
  name: z
    .string({ error: 'O nome é obrigatório' })
    .min(3, { error: 'O nome deve conter no mínimo 3 caracteres' })
    .max(255, { error: 'O nome deve conter no máximo 255 caracteres' }),
  document: z
    .string({ error: 'O documento é obrigatório' })
    .min(14, { error: 'O documento deve conter no mínimo 11 caracteres' })
    .max(14, { error: 'O documento deve conter no máximo 14 caracteres' }),
  phone: z
    .string({ error: 'O telefone é obrigatório' })
    .min(11, { error: 'O telefone deve conter no mínimo 10 caracteres' })
    .max(11, { error: 'O telefone deve conter no máximo 11 caracteres' }),
  address: z
    .string({ error: 'O endereço é obrigatório' })
    .min(3, { error: 'O endereço deve conter no mínimo 3 caracteres' })
    .max(255, { error: 'O endereço deve conter no máximo 255 caracteres' }),
  email: z.string().email({ error: 'O email deve ser válido' }),
});
