export type LocalAuthPersistence = { type: 'local'; password: string };
export type OauthPersistence = { type: 'oauth'; providerId: string; oauthProvider: string };
export type AuthPersistence = LocalAuthPersistence | OauthPersistence;

export type TierPersistence = { name: string; baseCredits: number; creditLimit: number;};

export type UserPersistence = {
  id: string;
  email: string;
  name: string;
  auth: AuthPersistence;
  tier: TierPersistence
  credits: number;      // if you persist it; otherwise compute on reconstruct
};

