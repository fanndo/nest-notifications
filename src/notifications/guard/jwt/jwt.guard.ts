import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as xmljs from 'xml-js';
import * as pemjwk from 'pem-jwk';

import * as jwt from 'jsonwebtoken';

import { Observable } from 'rxjs';
import config from 'src/config/config';



@Injectable()
export class JwtGuard implements CanActivate {

  constructor(@Inject(config.KEY) private configService: ConfigType<typeof config>){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest<Request>();

    const authorizationHeader = request.headers['authorization'];

    if (authorizationHeader) {
      const token = authorizationHeader.match(/Bearer (.+)/)[1];
      console.log({token})
      if (token){
        const publicKeyPem = this.DecodeJwtToken(this.configService.jwt.publicKey)

        const options = {
          algorithms: [this.configService.jwt.algorithms],
          audience: this.configService.jwt.audience,
          issuer: this.configService.jwt.issuer,
        };

        try{
          const decodedToken = jwt.verify(token,publicKeyPem,options );
          console.log(decodedToken)
          return true
        }catch(err){
          console.error(err)
          throw new UnauthorizedException('not allow');
        }
      }
    }
    throw new UnauthorizedException('not allow');
  }


  DecodeJwtToken(publicKeyXml:string){
    const publicKeyObject = xmljs.xml2js( publicKeyXml, { compact: true }) as {
      RSAKeyValue: {
        Modulus: { _text: string };
        Exponent: { _text: string };
      };
    };

    const modulus = publicKeyObject.RSAKeyValue.Modulus._text;
    const exponent = publicKeyObject.RSAKeyValue.Exponent._text;

    const publicKeyJwk = {
      kty: 'RSA',
      n: modulus,
      e: exponent,
    };

    return pemjwk.jwk2pem(publicKeyJwk);
  }


}
