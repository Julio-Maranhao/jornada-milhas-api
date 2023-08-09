import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';

config();

const configService: ConfigService = new ConfigService();
@Injectable()
export class GptIntegration {
  public static async GenerateDescription(about: string) {
    const configuration = new Configuration({
      apiKey: configService.get<string>('GPT_API_KEY'),
    });

    const openai = new OpenAIApi(configuration);

    const gptPrompt = `
    Faça um resumo sobre ${about} enfatizando o porque este lugar é incrível. 
    Utilize uma linguagem informal e até 100 caracteres no máximo em cada parágrafo. 
    Crie 2 parágrafos neste resumo.`;
    try {
      const chatCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: gptPrompt,
      });

      return chatCompletion.data.choices[0].text;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
