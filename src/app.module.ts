import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { CategoryModule } from './category/category.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ArticleModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
