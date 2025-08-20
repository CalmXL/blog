import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      // 解析用户提交的 Bearer Token header 数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 加密的 secret
      secretOrKey: configService.get('TOKEN_SECRET'),
    })
  }

  // 验证通过后的结果用户资料
  validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }
}
