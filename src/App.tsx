import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
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
        </ClerkProviderWithNavigate>
      </Switch>
    </BrowserRouter>
  );
};

const ClerkProviderWithNavigate = ({ children }: { children: any }) => {
  const { push } = useHistory();
  return (
    <ClerkProvider
      frontendApi="clerk.d3lk2.twegb.lcl.dev"
      navigate={(to) => {
        return push(to);
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default App;
