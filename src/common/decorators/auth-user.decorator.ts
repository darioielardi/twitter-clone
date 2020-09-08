import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as User;
});

export default AuthUser;