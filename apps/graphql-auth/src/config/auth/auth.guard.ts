import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
  import { JwtService } from '@nestjs/jwt';

  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const ctx = GqlExecutionContext.create(context)
        const request = ctx.getContext().req;

        const token: string = request.headers['authorization'];
        if (!token) throw new UnauthorizedException();
  
        await this.jwtService.verify(token,{ secret: process.env.JWT_SECRET });
        return true;
      } catch (err: unknown) {
        throw new UnauthorizedException();
      }
    }
}