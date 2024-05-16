export const authFeatureKey = 'auth';

export interface AuthState {
  userId: string | null;
  loading: boolean;
}

export const authInitialState: AuthState = {
  userId: "1",
  loading: false,
};