import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { TripsEffects } from './store/effects/trip.effects';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AuthEffects } from './store/effects/auth.effects';
import { EventsEffects } from './store/effects/event.effects';
import { tripsFeatureKey } from './store/state/trip.state';
import { tripReducer } from './store/reducers/trip.reducers';
import { authFeatureKey } from './store/state/auth.state';
import { authReducer } from './store/reducers/auth.reducers';
import { eventsFeatureKey } from './store/state/event.state';
import { eventReducer } from './store/reducers/event.reducers';

registerLocaleData(en);

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
    provideState({ name: tripsFeatureKey, reducer: tripReducer }),
    provideState({ name: authFeatureKey, reducer: authReducer }),
    provideState({ name: eventsFeatureKey, reducer: eventReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideEffects(TripsEffects),
    provideEffects(AuthEffects),
    provideEffects(EventsEffects),
  ],
};
