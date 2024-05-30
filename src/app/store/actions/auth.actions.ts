import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[AUTH] Login',
    props<{ email: string; password: string }>()
  );
  
  export const loginComplete = createAction(
    '[Auth] LoginComplete',
    props<{ userId: string }>()
  );

  export const logout = createAction('[Auth] Logout');

  export const logoutComplete = createAction('[Auth] LogoutComplete');
  
  export const signUp = createAction(
    '[Auth] SignUp',
    props<{ email: string; password: string }>()
  );
  
  export const signUpComplete = createAction(
    '[SignUp Page] SignUpComplete',
    props<{ userId: string }>()
  );

  export const authLoading = createAction(
    '[Auth] AuthLoading',
    props<{ loading: boolean }>()
  );
  