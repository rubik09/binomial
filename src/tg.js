import TelegramBot from 'node-telegram-bot-api';
import { BOTID } from './config';

const bot = new TelegramBot(BOTID, { polling: true, filepath: false });

bot.setMyCommands([
    {command: '/start', description: 'Start bot'},
  ])

export default bot;
