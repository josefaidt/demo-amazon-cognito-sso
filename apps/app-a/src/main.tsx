import { StrictMode } from "react"
import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import outputs from "infra/outputs"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

Amplify.configure({
  Auth: {
    Cognito: {
      // note that this uses UserPoolClientAId, for "app-a"
      userPoolClientId: outputs.DemoAmazonCognitoSso.UserPoolClientAId,
      userPoolId: outputs.DemoAmazonCognitoSso.UserPoolId,
      loginWith: {
        oauth: {
          domain: outputs.DemoAmazonCognitoSso.UserPoolDomain,
          redirectSignIn: ["http://localhost:5173"],
          redirectSignOut: ["http://localhost:5173"],
          responseType: "code",
          scopes: ["openid", "email"],
        },
      },
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
)
