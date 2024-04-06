import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from 'src/common/enum/roles.enum';
import * as fs from 'fs';

@Injectable()
export class AuthGuard implements CanActivate {
  private publicKey: string;
  constructor(
    @Inject(I18nService) private i18nService: I18nService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    this.publicKey = fs.readFileSync('src/config/public.pem', 'utf-8');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token =
      request.headers['x-access-token'] || request.headers['authorization'];
    if (token == null) {
      throw new UnauthorizedException(
        this.i18nService.t('default.GUARD_TOKEN_REQUIRED'),
      );
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    let result;
    if (token) {
      try {
        result = await this.validateToken(token);
      } catch (error) {
        throw new UnauthorizedException(
          this.i18nService.t('default.GUARD_TOKEN_INVALID'),
        );
      }

      const roles: RolesEnum[] = this.reflector.get(
        'roles',
        context.getHandler(),
      ); // authorized roles
      if (
        !roles ||
        roles.length === 0 ||
        roles.some((role) => result.role?.roles === role)
      ) {
        request.decoded = result;
      } else {
        throw new UnauthorizedException(
          this.i18nService.t('validation.ROLES_AUTHORIZATION_FAILED'),
        );
      }
    } else {
      throw new UnauthorizedException(
        this.i18nService.t('default.GUARD_TOKEN_INVALID'),
      );
    }
    return true;
  }

  validateToken(token: string) {
    const result = this.jwtService.verify(token, {
      publicKey: this.publicKey,
    });
    return result;
  }
}
