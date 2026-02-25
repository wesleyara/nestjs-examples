import z from 'zod';

export const clientCreateSchema = z
  .object({
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
    birthDate: z
      .string({ error: 'A data de nascimento é obrigatória' })
      .min(10, {
        error: 'A data de nascimento deve conter no mínimo 10 caracteres',
      })
      .max(10, {
        error: 'A data de nascimento deve conter no máximo 10 caracteres',
      }),
    officeId: z.uuid({ error: 'O ID do escritório é obrigatório' }),
    email: z.string().email({ error: 'O email deve ser válido' }).optional(),
    status: z.string().optional(),
    profit: z.string().optional(),
    cost: z.string().optional(),
    type: z.string({ message: 'O tipo de aposentadoria é obrigatório' }),
    dueDate: z
      .string()
      .min(10, {
        error: 'A data de exigência deve conter no mínimo 10 caracteres',
      })
      .max(10, {
        error: 'A data de exigência deve conter no máximo 10 caracteres',
      })
      .optional(),
    audienceDate: z
      .string()
      .min(10, {
        error:
          'A data de audiência/perícia deve conter no mínimo 10 caracteres',
      })
      .max(10, {
        error:
          'A data de audiência/perícia deve conter no máximo 10 caracteres',
      })
      .optional(),
    report: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'BPC' && !data.report) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O campo Laudo é obrigatório para o tipo BPC',
        path: ['report'],
      });
    }

    if (data.status === 'Exigência' && !data.dueDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'O campo Data de Exigência é obrigatório quando o status for Exigência',
        path: ['dueDate'],
      });
    }
  });
