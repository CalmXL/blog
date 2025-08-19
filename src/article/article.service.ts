import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article'
  }

  async findAll(page = 1, size = 10) {
    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * size,
      take: +size,
    })
    const total = await this.prisma.article.count()
    return {
      meta: {
        current_page: page,
        size,
        total,
        total_page: Math.ceil(total / size),
      },
      data: articles,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} article`
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`
  }

  remove(id: number) {
    return `This action removes a #${id} article`
  }
}
