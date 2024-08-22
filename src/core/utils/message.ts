export enum SuccessMessage {
  SIGN_UP = 'Welcome to Analytic . Please check your emails and confirm your account.',
  ACCOUNT_VERIFICATION_COMPLETED = 'Your account has been activated successfully.Please check your email for api key',
  STREAM_REGISTRATION = 'Stream added successfully.',
  STREAM_UPDATED = 'Stream updated successfully.',
  REPORT_CONFIG_SAVED = 'Report structure saved successfully.',
}

export enum ErrorMessage {
  USER_ALREADY_EXIST = 'User already exist.',
  USER_EMAIL_ALREADY_EXIST = 'Email already exist.',
  UNABLE_TO_SERVE = 'Unable to serve your request',
  ACCOUNT_LINK_EXPIRED = 'Invalid activation link',
  ACCOUNT_ALREADY_VERIFIED = 'Account is already verified',
  INVALID_ID_PASSWORD = 'Invalid id or password',
  USER_NOT_FOUND = 'User not found',
  WRONG_CREDENTIALS = 'Invalid password',
  USER_BLOCKED = 'You are currently blocked by admin, please contact support.',
  ACCOUNT_VERIFICATION_PENDING = 'Your account verification is pending',
  INVALID_STREAM_OR_APIKEY = 'Invalid stream or API key',
  STREAM_ALREADY_EXIST = 'STREAM already exist',
  STREAM_NOT_FOUND = 'STREAM not found',
  REPORT_CONFIG_NOT_FOUND = 'Report structure not found',
  UNABLE_TO_SAVE_REPORT = 'Unable to save report structure please try again later',
  BASE_COLUMNS_EMPTY = 'Base columns must not be empty',
  CHART_CONFIG_KEY_NOT_FOUND = 'Config key {key} not exist in stream',
  BASE_COLUMN_NOT_FOUND = "Custom key {baseColumn} passed in chart config of key {key} doesn't exist",
}

export function buildDynamicMessage(message: string, replacements: any) {
  for (const key in replacements) {
    message = message.replace(`{${key}}`, replacements[key]);
  }
  return message;
}
