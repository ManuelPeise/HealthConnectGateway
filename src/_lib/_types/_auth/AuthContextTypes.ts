export type AuthContextModel = {
  tokenModel: TokenStorageModel | null;
  authError: string | null;
  setToken: (model: TokenStorageModel) => void;
  onLogin: (model: LoginData) => Promise<void>;
  onLogout: () => Promise<void>;
};

export type LoginData = {
  email: string;
  password: string;
  remember: boolean;
};

export type LoginStorageModel = Omit<LoginData, 'password'>;

export type TokenStorageModel = {
  token: string;
};
