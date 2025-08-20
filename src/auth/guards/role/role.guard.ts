import { Role } from '@/auth/enum'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { user } from '@prisma/client'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as user
    console.log('🚀 ~ RoleGuard ~ canActivate ~ user:', user)

    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    console.log('🚀 ~ RoleGuard ~ canActivate ~ roles:', roles)
    return roles ? roles.some((role) => user.role === role) : true
  }
}
