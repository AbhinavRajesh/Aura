import { useUser } from "@clerk/clerk-react";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { User } from "../types";
import firebase, { db } from "../utils/firebase";

interface ContextProps {
  user: User | null;
  getUser?: () => void;
  setUser?: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<ContextProps>({
  user: null,
});

const UserProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null);

  const clerkUser = useUser();

  const getUser = async () => {
    const email: string = clerkUser.emailAddresses[0].emailAddress;
    const customToken = await clerkUser.getToken("firebase");
    await firebase.auth().signInWithCustomToken(customToken as any);

    if (email) {
      db.collection("users")
        .doc(email)
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) {
            db.collection("users")
              .doc(email)
              .set({
                email: email,
                [new Date().getFullYear()]: {},
              });
            setUser({
              email: email,
              [new Date().getFullYear()]: [],
            });
          } else {
            setUser(snapshot.data() as any);
          }
        });
    } else {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, getUser, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
