import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./pages/index";
import "./App.scss";
import { SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./pages/dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ClerkProviderWithNavigate>
          <SignedOut>
            <Route exact path="/" component={Home} />
          </SignedOut>
          <SignedIn>
            <Route exact path="/" component={Dashboard} />
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
