import { generate, verify } from "password-hash";

const password = {
  hash: async (password: string): Promise<string> => {
    const hashedPassword = generate(password, { saltLength: 10 });
    return hashedPassword;
  },

  verify: async (password: string, passwordHash: string): Promise<boolean> => {
    return verify(password, passwordHash);
  },
};

export default password;
