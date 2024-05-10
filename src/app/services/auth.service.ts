import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  signUp(
    email: string,
    username: string,
    password: string
  ): Observable<string> {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => response.user.uid
      )
    );
  }

  login(email: string, password: string): Observable<string> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => response.user.uid
      )
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }
}
