import { useUser, useAuth } from "@clerk/clerk-react";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
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

  const { getToken } = useAuth();

  const { user: clerkUser } = useUser();

  const getUser = async () => {
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress as string;
    const customToken = await getToken({ template: "integration_firebase" });
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

  useEffect(() => {
    if (user === null) {
      getUser!();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserContext.Provider value={{ user, getUser, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
