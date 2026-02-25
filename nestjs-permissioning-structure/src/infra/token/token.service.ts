import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpError } from 'src/app.interface';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateTokens = (id: string) => {
    const accessToken = this.createToken(id, '2h');
    const refreshToken = this.createToken(id, '5h');

    return { accessToken, refreshToken };
  };

  createToken = (id: string, expires: string) => {
    const jwtToken = this.jwtService.sign(
      { id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: expires,
      },
    );

    return jwtToken;
  };

  verifyToken = (token: string) => {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return decoded;
    } catch (error) {
      const err = error as HttpError;
      return err.message.includes('expired')
        ? { message: 'Token expired' }
        : { message: 'Invalid token' };
    }
  };
}
