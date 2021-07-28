import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./pages/index";
import "./App.scss";
import { SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./pages/dashboard";
import UserProvider from "./context/UserContext";
import Aura from "./pages/aura";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ClerkProviderWithNavigate>
          <SignedOut>
            <Route exact path="/" component={Home} />
          </SignedOut>
          <SignedIn>
            <UserProvider>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/aura" component={Aura} />
            </UserProvider>
          </SignedIn>
          <Route render={() => <Redirect to="/" />} />
        </ClerkProviderWithNavigate>
      </Switch>
    </BrowserRouter>
  );
};

const ClerkProviderWithNavigate = ({ children }: { children: any }) => {
  const { push } = useHistory();
  return (
    <ClerkProvider
      frontendApi={process.env.REACT_APP_CLERK_FRONTEND_API}
      navigate={(to) => {
        return push(to);
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default App;
