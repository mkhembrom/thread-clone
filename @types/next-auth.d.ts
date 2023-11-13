import { Session } from "inspector";
import { DefaultSession } from "next-auth";

export declare module Session {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      username?: string | null;
      bio?: boolean | null;
      hashPassword?: boolean | null;
    } & DefaultSession["user"];
  }
}

export declare module User {
  interface User {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      username?: string | null;
      bio?: boolean | null;
      hashPassword?: boolean | null;
    } & AdapterUser;
  }
}
