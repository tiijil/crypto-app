export const API_ENDPOINTS = {
  LISTINGS: 'listings',
  CONVERT: 'convert'
} as const;

export const DEFAULT_CONVERSION = {
  FROM: 'BTC',
  TO: 'ETH',
  AMOUNT: '1'
} as const;

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch cryptocurrency data. Please try again later.',
  CONVERSION_FAILED: 'Failed to convert. Please check your inputs and try again.',
  MISSING_FIELDS: 'Please fill in all fields'
} as const; 