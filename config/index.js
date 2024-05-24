import 'dotenv/config';

const config = {
  node_env: process.env.NODE_ENV,
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.DB_CONNECTION_STRING,
  },
  puppeteer: {
    executablePath: process.env.CHROMIUM_PATH,
  },
  telegram: {
    botToken: process.env.BOT_TOKEN,
    chatIdPublic: process.env.CHAT_ID_PUBLIC,
    chatIdPrivate: process.env.CHAT_ID_PRIVATE,
  },
  cubis: {
    username: process.env.CUBIS_USERNAME,
    password: process.env.CUBIS_PASSWORD,
    login_url: process.env.CUBIS_LOGIN_URL,
    courses_url: process.env.CUBIS_COURSES_URL,
  },
  selector: {
    username: process.env.SELECTOR_USERNAME,
    password: process.env.SELECTOR_PASSWORD,
    submit: process.env.SELECTOR_SUBMIT,
    login_success: process.env.SELECTOR_LOGIN_SUCCESS,
  },
};

export default config;
