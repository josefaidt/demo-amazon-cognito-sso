import { useAuthenticator } from "@aws-amplify/ui-react"
import { signInWithRedirect, signOut } from "aws-amplify/auth"
import "./App.css"

function App() {
  const { user } = useAuthenticator()

  return (
    <>
      <h1>Amazon Cognito SSO Demo: App A</h1>
      {user ? (
        <>
          <p>hello {user.userId}</p>
          <button type="button" onClick={() => signOut()}>
            sign out
          </button>
        </>
      ) : (
        <button type="button" onClick={() => signInWithRedirect()}>
          sign in
        </button>
      )}
    </>
  )
}

export default App
