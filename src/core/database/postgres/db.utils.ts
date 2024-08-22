import { logger } from '@core/utils';

export async function handleError<T>(
  callback: any,
  defaultResp?: any,
): Promise<T> {
  try {
    return await callback();
  } catch (e) {
    logger.error(e);
    return defaultResp;
  }
}
