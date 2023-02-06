export interface IUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    isAnonymous: boolean;
    photoURL: string;
    providerData: [
      {
        providerId: string;
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: string | null;
        photoURL: string;
      }
    ];
    stsTokenManager: {
      refreshToken: string;
      accessToken: string;
    };
  }
  