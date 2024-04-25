import { Auth0Provider} from "@auth0/auth0-react";
import { useNavigate  } from "react-router-dom";

type Props = {
 children: React.ReactNode
}

const Auth0ProvdierWithNavigate = ({children}: Props) => {
  const navigate = useNavigate();
  const domain      = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId    = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALBACK_URL;
  const audience    = import.meta.env.VITE_AUTH0_AUDIENCE;

  if(!domain || !clientId || !redirectUri) {
    throw new Error("unable to initilise auth.");
  };

  const onRedirectCallback = () => {
    navigate("/auth-callback")
  };

  return (
    <Auth0Provider 
      domain={domain} 
      clientId={clientId} 
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{ redirect_uri: redirectUri, audience }}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProvdierWithNavigate;