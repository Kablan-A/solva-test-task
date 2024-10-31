export const paths = {
  auth: {
    signIn: "/auth/sign-in",
  },
  home: "/",
  people: "/people",
  planets: "/planets",
  starships: "/starships",
};

export type TPaths = keyof typeof paths;
