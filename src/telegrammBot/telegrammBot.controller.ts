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
	}

	public start(): void {

		this.bot.start((ctx) => {
			return ctx.reply('Welcome to Nasa Image Of The Day!')
		});
		this.bot.command('apod', (ctx) => {
			NasaService.getApod().then((apod: NasaApod): void => {
				ctx.replyWithHTML(`<strong>${apod.title}.</strong>${apod.explanation} ${apod.hdurl}`);
			});
		});
		this.bot.startPolling();
	}
}

export default TelegrammBot.Instance;