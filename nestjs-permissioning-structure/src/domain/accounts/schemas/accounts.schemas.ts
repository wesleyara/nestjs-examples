import z from 'zod';

export const accountCreateSchema = z.object({
  name: z
    .string({ error: 'O nome é obrigatório' })
    .min(3, { error: 'O nome deve conter no mínimo 3 caracteres' })
    .max(255, { error: 'O nome deve conter no máximo 255 caracteres' }),
  username: z
    .string({ error: 'O nome de usuário é obrigatório' })
    .min(3, { error: 'O nome de usuário deve conter no mínimo 3 caracteres' })
    .max(255, {
      error: 'O nome de usuário deve conter no máximo 255 caracteres',
    }),
  password: z
    .string({ error: 'A senha é obrigatória' })
    .min(8, { error: 'A senha deve conter no mínimo 8 caracteres' })
    .max(36, { error: 'A senha deve conter no máximo 36 caracteres' }),
});

export const accountLoginSchema = z.object({
  username: z
    .string({ error: 'O nome de usuário é obrigatório' })
    .min(3, { error: 'O nome de usuário deve conter no mínimo 3 caracteres' })
    .max(255, {
      error: 'O nome de usuário deve conter no máximo 255 caracteres',
    }),
  password: z
    .string({ error: 'A senha é obrigatória' })
    .min(8, { error: 'A senha deve conter no mínimo 8 caracteres' })
    .max(36, { error: 'A senha deve conter no máximo 36 caracteres' }),
});
