import { TELEGRAMM_BOT_TOKEN } from '../app.settings';
import NasaService from '../core/services/nasaService/nasa.service';
import { NasaApod } from '../core/entities/nasa/nasaApod';

const Telegraf = require('telegraf')

export class TelegrammBot {

	private bot: any;
	private static instance: TelegrammBot = null;

	static get Instance() {
		if (TelegrammBot.instance === null) {
			TelegrammBot.instance = new TelegrammBot();
		}
		return TelegrammBot.instance;
	}

	constructor() {
		this.bot = new Telegraf(TELEGRAMM_BOT_TOKEN);
		console.log(TELEGRAMM_BOT_TOKEN);
	}

	public start(): void {

		this.bot.start((ctx) => {
			// console.log(ctx);
			// console.log('started:', ctx.from.id);
			return ctx.reply('Welcome!')
		});
		this.bot.command('help', (ctx) => ctx.reply('Try send a sticker!'));
		this.bot.command('apod', (ctx) => {
			NasaService.getApod().then((apod: NasaApod): void => {
				ctx.reply(apod.explanation);
			});
		});
		this.bot.hears('hi', (ctx) => ctx.reply('Hey there!'));
		this.bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'));
		this.bot.on('sticker', (ctx) => ctx.reply('👍'));

		this.bot.startPolling();
	}
}

export default TelegrammBot.Instance;