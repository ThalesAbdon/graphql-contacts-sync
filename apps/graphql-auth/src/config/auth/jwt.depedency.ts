import { JwtModule } from '@nestjs/jwt';

export const jwtDepedency = JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '48h' },
});
