import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { jwtRefreshSecret, jwtSecret } from '../env/envoriment';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login (dto: Users) {
    const user = await this.usersService.verifyUserActive(dto.id);
    if(!user) {
      throw new NotFoundException('Usuário inativo');
    }
    const payload = {
      id: user.id,
      profile: user.profile
    }
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: jwtRefreshSecret
    })
    const tokenEconded =await argon.hash(refreshToken);
    await this.usersService.updateRefreshToken(user.id, tokenEconded);
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login realizado com sucesso',
      refresh_token: refreshToken,
      access_token: token
    }
  }

  async studenLogin(dto: Users){
    const user = await this.usersService.verifyUserActive(dto.id);
    if(!user) {
      throw new NotFoundException('Usuário inativo');
    }
    const payload = {
      id: user.id,
      profile: user.profile
    }
    delete user.refreshToken
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: jwtRefreshSecret
    })
    const tokenEconded =await argon.hash(refreshToken);
    await this.usersService.updateRefreshToken(user.id, tokenEconded);
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login realizado com sucesso',
      refresh_token: refreshToken,
      access_token: token
    }
  }
}
