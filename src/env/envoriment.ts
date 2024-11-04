

export const discordFailureUrl = process.env.DISCORD_FAILURE_WEBHOOK || '';
export const discordSuccessUrl = process.env.DISCORD_SUCCESS_WEBHOOK || '';
export const nestjsUrl = process.env.APP_URL || '';
export const jwtSecret = process.env.JWT_SECRET || '';
export const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME || '1d';
export const jwtRefreshExpirationTime= process.env.JWT_REFRESH_EXPIRATION_TIME || '1d';
export const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || '';