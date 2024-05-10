export const authFeatureKey = 'auth';

export interface AuthState {
  userId: string | null;
  loading: boolean;
}

export const authInitialState: AuthState = {
  userId: null,
  loading: false,
};