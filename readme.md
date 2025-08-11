# Amaazon Cognito SSO Demo

This demo contains a CDK app and two Vite React apps to demonstrate how to leverage a single Amazon Cognito User Pool to get SSO across a suite of apps.

1. `pnpm install`
2. `pnpm --filter ./packages/infra run deploy` to deploy backend infrastructure
3. `pnpm --filter "./apps/*" run dev` to run both Vite apps
4. open your browser and navigate to `http://localhost:5173`, select "sign in"
5. create a new user and sign in
6. navigate to `http://localhost:5174`
7. select "sign in"
8. observe you're authenticated to the same account

Looking at the ID token, you can see the difference in tokens between apps:

For app-a

```jsonc
{
  "at_hash": "ZIu8gggMxpXDHHR5aTBppQ",
  "sub": "74287468-8081-70c3-2514-82eedcdc8e6a",
  "email_verified": false,
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_3v8qP2QV4",
  "cognito:username": "74287468-8081-70c3-2514-82eedcdc8e6a",
  "origin_jti": "09e18ae1-01bf-4a73-9e99-c909dc34fbf4",
  // this is your user pool client ID
  "aud": "68bvm02h30qq7r62kcn39ks8es",
  "event_id": "321e9949-2f96-41cc-a860-47b3034a2785",
  "token_use": "id",
  "auth_time": 1754934135,
  "exp": 1754937735,
  "iat": 1754934135,
  "jti": "9ae9a538-425a-4a5e-bd16-5f350a19b502",
  "email": "josef@example.com"
}
```

for app-b

```jsonc
{
  "at_hash": "5Er01k6OUMORRJbahmejWQ",
  // notice it's the same sub
  "sub": "74287468-8081-70c3-2514-82eedcdc8e6a",
  "email_verified": false,
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_3v8qP2QV4",
  "cognito:username": "74287468-8081-70c3-2514-82eedcdc8e6a",
  "origin_jti": "fadac4d4-62c1-4cd7-8451-1a48b0aae157",
  // but a different client ID
  "aud": "56n3t1dkqanvkk4n4f8fjgkove",
  "token_use": "id",
  "auth_time": 1754934144,
  "exp": 1754937744,
  "iat": 1754934144,
  "jti": "a7dedcb3-95a9-4561-9e10-8c1fd42fe44f",
  "email": "josef@example.com"
}
```
