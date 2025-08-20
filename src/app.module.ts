import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, PrismaModule, ArticleModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
