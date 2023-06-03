import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      type: 'mongodb',
    },
    port : process.env.PORT || 3000,
    ws_port:process.env.WS_PORT || 81,
    jwt:{
      publicKey:process.env.PUBLIC_KEY,
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
      algorithms: process.env.ALGORITHMS
    }
  };
});
