import { IsNotEmpty } from 'class-validator'
import { IsConfirm } from 'src/common/rules/is-confirm.rule'
import { IsNotExistsRule } from 'src/common/rules/is-not-exists.rule'

export default class RegisterDto {
  @IsNotEmpty({
    message: '用户名不能确定',
  })
  @IsNotExistsRule('user', { message: '用户已经存在' })
  name: string

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @IsConfirm({
    message: '两次密码输入不一致',
  })
  password: string

  @IsNotEmpty({
    message: '确认密码不能为空',
  })
  password_confirm: string
}
