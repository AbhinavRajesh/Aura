import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/index";
import "./App.scss";
import { SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./pages/dashboard";
import UserProvider from "./context/UserContext";
import Aura from "./pages/aura";
import Streaks from "./pages/streaks";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ClerkProviderWithNavigate>
        <SignedOut>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Navigate to="/" />} />
          </Routes>
        </SignedOut>
        <SignedIn>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/aura" element={<Aura />} />
              <Route path="/streaks" element={<Streaks />} />
              <Route element={<Navigate to="/" />} />
            </Routes>
          </UserProvider>
        </SignedIn>
      </ClerkProviderWithNavigate>
    </BrowserRouter>
  );
};

const ClerkProviderWithNavigate = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY!}
      frontendApi={undefined}
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
};

export default App;
