import { Injectable } from '@nestjs/common';

@Injectable()
export class GptIntegration {
  public static GenerateDescription(about: string) {
    const gptPrompt = `
    Faça um resumo sobre ${about} enfatizando o porque este lugar é incrível. 
    Utilize uma linguagem informal e até 100 caracteres no máximo em cada parágrafo. 
    Crie 2 parágrafos neste resumo.`;

    return gptPrompt;
  }
}
