import { Injectable, UnauthorizedException } from '@nestjs/common'
import RegisterDto from './dto/register.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import LoginDto from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
      },
    })

    return user
  }

  private async token({ id, name }) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }),
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      },
    })

    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }

    const passwordValid = await verify(user.password, dto.password)
    if (!passwordValid) {
      throw new UnauthorizedException('密码错误')
    }
    return this.token({
      id: user.id,
      name: user.name,
    })
  }
}
