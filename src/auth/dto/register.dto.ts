import { IsNotEmpty } from 'class-validator'

export default class RegisterDto {
  @IsNotEmpty({
    message: '用户名不能确定',
  })
  name: string
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string
}
