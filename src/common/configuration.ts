import * as path from 'path';

const root = path.join.bind(this, __dirname);
// dotenv({ path: root('../../') });

export function getConfiguration() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    isProduction: process.env.NODE_ENV === 'production',
    jwt: {
      accessSecret: `${process.env.JWT_SECRET}`,
      refreshSecret: `${process.env.JWT_SECRET}`,
      accessExpiresIn: '900s',
      refreshExpiresIn: '7d',
      ignoreExpiration: false,
    },
    auth: {
      secret: process.env.SECRET_TO_HASH_PASSWORD,
      cookieAccessExpires: 900,
      cookieRefreshExpires: 7,
    },
    twilio: {
      SID: `${process.env.TwilioSID}`,
      token: `${process.env.TwilioPass}`,
      messageService: `${process.env.TwilioMessageService}`,
      messageVerifyService: `${process.env.TwilioMessageVerifyService}`,
    },
    cookie: { accessExpiresIn: 900, refreshExpiresIn: 604800 },
    origin: { domain: process.env.OriginDomain },
    captcha: { secretKey: process.env.SecretKey },
    aws: {},
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  };
}

export const config = getConfiguration();

export default getConfiguration;
