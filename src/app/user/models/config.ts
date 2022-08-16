export interface AuthEmailConfig {
  enable: boolean;
  domain: string;
  ldap: boolean;
}

export interface AuthSocialConfig {
  type: string;
  name: string;
  logo: string;
  auth_url: string;
}

export interface AuthConfig {
  email: AuthEmailConfig;
  social: AuthSocialConfig[];
}

export interface SocialLoginLink {
  url: string;
}
