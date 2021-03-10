# Generating the Base Application

Before we begin, we will need an application that requires authentication.

```bash
ionic start training-lab-ac tabs --type=angular --capacitor
npm run build
cd training-lab-ac
npm run build
ionic cap add android
ionic cap add ios
ionic g page login
ionic g s core/tea --skipTests
ionic g service core/unauth-interceptor --skipTests
ionic g interface models/tea
ionic g interface models/user
```

That was a lot of stuff we just created. Let's go through it and fill it out a bit.

## The `package.json` File

For reasons that will b3 apparent later, we want to serve the app from port `8100`. When we build this for installation on a device we should also do so using the production environment, and automatically copy our build to the native projects.

```JSON
  "scripts": {
    "ng": "ng",
    "start": "ng serve --port=8100",
    "build": "ng build --prod && cap copy",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```

Start the app using the development server at this point so we can see the changes as we make them.

## Environments

We will bo connecting to a backend service to get some data. Let's add the base URL for that data service to the `src/environments/environment.ts` and `src/environments/environment.prod.ts` files.

Here is the development environment file:

```TypeScript
export const environment = {
  production: false,
  dataService: 'https://cs-demo-api.herokuapp.com'
};
```

The `environment.prod.ts` file will be similar except `production` will be `true`

## Models

We have a couple of models to define the shape of our data.

**src/app/models/tea.ts**

```TypeScript
export interface Tea {
  id: number;
  name: string;
  description: string;
}
```

**src/app/models/user.ts**

```TypeScript
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
```

Let's create a barrel file to export our two interfaces:

**src/app/models/index.ts**

```TypeScript
export * from './tea';
export * from './user';
```

## Core Service

Right now, we only have two core service, the tea service and an HTTP interceptor.

**src/app/core/tea.service.ts**

All that we need it to do is get some simple Tea data for us.

```TypeScript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tea } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Tea>> {
    return this.http.get<Array<Tea>>(`${environment.dataService}/tea-categories`);
  }
}
```

**src/app/core/unauth-interceptor.service.ts**

For this interceptor, we need to catch 401 errors and bounce the user over to the login page.

```TypeScript
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UnauthInterceptor implements HttpInterceptor {
  constructor(private navController: NavController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.navController.navigateRoot(['/', 'login']);
          }
        }
      )
    );
  }
}
```

Let's create a barrel file here too:

**src/app/models/index.ts**

```TypeScript
export * from './tea.service';
export * from './unauth-interceptor.service';
```

## Configure the Application

In order to effectively make HTTP calls, we need to import the HTTP Client Module and provide our 401 interceptor. This is done via the `src/app/app.module.ts` file.

- Add `HttpClientModule` to the `imports`
- Add `UnauthInterceptor` to the `providers`

```TypeScript
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UnauthInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
```

Be sure and add the ES6 imports as well if your editor did not do so for you automatically.

## Get Tea Data

At this point, we can get to each page in our application, but we aren't trying to fetch data from the backend. Let's see what happens when we try that. We will use `tab2` for that.

**src/app/tab2/tab2.page.ts**

```TypeScript
import { Component } from '@angular/core';
import { TeaService } from '../core';
import { Tea } from '../models/tea';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  teas: Array<Tea> = [];

  constructor(private teaService: TeaService) {}

  ionViewDidEnter() {
    this.teaService.getAll().subscribe(t => (this.teas = t));
  }
}
```

In the view, replace the `app-explore-container` with the following markup:

**src/app/tab2/tab2.page.html**

```html
<ion-list>
  <ion-item *ngFor="let tea of teas">
    <ion-label>{{ tea.name }}</ion-label>
  </ion-item>
</ion-list>
```

## Conclusion

At this point, you should be able to navigate to tabs 1 and 3, but as soon as you attempt to navigate to tab 2 you should get a 401 error and get redirected to the login page. At this point you are stuck unless you do a little URL hacking.

Build the app for your mobile device and try running it there. Verify that you get the same results.

The problem is that we need to authenticate the user and then give the access token to our backend when we try to get the teas. Let's do that next.'
