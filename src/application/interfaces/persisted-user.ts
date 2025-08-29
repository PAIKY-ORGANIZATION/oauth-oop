export type LocalAuthPersistence = { type: 'local'; password: string };
export type OauthPersistence = { type: 'oauth'; providerId: string; oauthProvider: string };
export type AuthPersistence = LocalAuthPersistence | OauthPersistence;


export type UserPersistence = {
  id: string;
  email: string;
  name: string;
  auth: AuthPersistence;
  tierType: string
  credits: number;      // if you persist it; otherwise compute on reconstruct
};

