import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Env } from './env.config';

export const validateEnv = (config: Record<string, unknown>) => {
  const transformed = plainToInstance(Env, config, {
    exposeDefaultValues: true,
  });
  const errors = validateSync(transformed, { stopAtFirstError: true });
  if (errors.length > 0) throw new Error(errors.toString());

  return transformed;
};
