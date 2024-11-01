import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sendDiscordMessage } from './utils/discord.util';
import { Logger } from '@nestjs/common';
import { discordFailureUrl, nestjsUrl } from './env/envoriment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Escola API')
    .setDescription('API para uma faculdade de desenvolvimento web')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(nestjsUrl, () => {
    console.log(`Aplicação iniciada em http://localhost:${nestjsUrl}/api`);
  });
}
bootstrap().catch(async (e) => {
  new Logger('main.ts').error(e);

  const url = discordFailureUrl
  const msg = typeof e?.message === 'string' ? e.message : '';

  await sendDiscordMessage(
    url,
    `Aplicação Falhou ao Iniciar: ${msg}\nSinto Muito ( u.u)`,
    isProd,
    false,
  );
  if (isProd) await new Promise((r) => setTimeout(r, 3600_000));
  else throw e;
});
