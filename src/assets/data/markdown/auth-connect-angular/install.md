# Install AuthConnect

```bash
npm i @ionic-enterprise/auth
ionic g s core/authentication --skipTests
```

## Environment

```TypeScript
import { IonicAuthOptions } from '@ionic-enterprise/auth';

const baseConfig = {
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  scope: 'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  audience: 'https://api.myapp.com',
  authConfig: 'azure' as 'azure'
};

export const mobileAzureConfig: IonicAuthOptions = {
  ...baseConfig,
  redirectUri: 'myapp://callback',
  logoutUrl: 'myapp://callback?logout=true',
  platform: 'cordova',
  iosWebView: 'private',
  androidToolbarColor: 'Red'
};

export const webAzureConfig: IonicAuthOptions = {
  ...baseConfig,
  redirectUri: 'http://localhost:8100/login',
  logoutUrl: 'http://localhost:8100/login',
  platform: 'web'
};
```

## Authentication Service

```TypeScript
import { Injectable } from '@angular/core';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { mobileAzureConfig, webAzureConfig } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends IonicAuth {
  constructor(platform: Platform) {
    const config = platform.is('hybrid') ? mobileAzureConfig : webAzureConfig;
    super(config);
  }

  async getUserInfo(): Promise<User | undefined> {
    const idToken = await this.getIdToken();
    if (!idToken) {
      return;
    }

    let email = idToken.email;
    if (idToken.emails instanceof Array) {
      email = idToken.emails[0];
    }

    return {
      id: idToken.sub,
      email,
      firstName: idToken.given_name,
      lastName: idToken.family_name
    };
  }
}
```
