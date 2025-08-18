import { PrismaClient } from '@prisma/client'
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

const prisma = new PrismaClient()

// 表字段是否唯一
export function IsNotExistsRule(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNotExistsRule', // 规则名字
      target: object.constructor, // 装饰的类
      propertyName: propertyName, // 装饰的字段名
      constraints: [table], // 额外参数，validator 中可以使用
      options: validationOptions, // 可选配置，如 message
      validator: {
        // 具体的效验规则
        async validate(value: string, args: ValidationArguments) {
          const res = await prisma[table].findFirst({
            where: {
              [args.property]: value,
            },
          })
          return !Boolean(res)
        },
        // defaultMessage(args: ValidationArguments) {
        //   console.log('🚀 ~ defaultMessage ~ args:', args)
        //   return '默认错误提示'
        // },
      },
    })
  }
}
