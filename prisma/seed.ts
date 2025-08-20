import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { random } from 'lodash'
import { Random } from 'mockjs'
import { title } from 'process'

const prisma = new PrismaClient()
async function run() {
  // await prisma.user.create({
  //   data: {
  //     name: 'admin',
  //     password: await hash('admin888'),
  //   },
  // })
  // for (let i = 0; i < 6; i++) {
  //   await prisma.category.create({
  //     data: {
  //       title: Random.ctitle(3, 6),
  //     },
  //   })
  // }
  // for (let i = 1; i < 55; i++) {
  //   await prisma.article.update({
  //     where: {
  //       id: i,
  //     },
  //     data: {
  //       categoryId: i % 6,
  //     },
  //   })
  // }
  // const categories = await prisma.category.findMany()
  // const articles = await prisma.article.findMany()
  // for (let i = 0; i < articles.length; i++) {
  //   const article = articles[i]
  //   const category = categories[i % categories.length] // 取出真实存在的分类
  //   await prisma.article.update({
  //     where: { id: article.id },
  //     data: { categoryId: category.id }, // 使用 category.id
  //   })
  // }
  await prisma.user.update({
    where: {
      name: 'xulei',
    },
    data: {
      role: 'admin',
    },
  })
}

run()
