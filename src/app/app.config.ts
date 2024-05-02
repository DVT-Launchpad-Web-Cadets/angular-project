import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideState, provideStore } from '@ngrx/store';
import { appReducer, tripsFeatureKey } from './store/reducers/reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { TripsEffects } from './store/effects/effects';

const firebaseConfig = environment.firebaseConfig;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ]),
    provideStore(),
    provideState({ name: tripsFeatureKey, reducer: appReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(TripsEffects)
],
};
