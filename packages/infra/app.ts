import * as cdk from "aws-cdk-lib"
import * as cognito from "aws-cdk-lib/aws-cognito"

const app = new cdk.App()
const stack = new cdk.Stack(app, "DemoAmazonCognitoSso")

const userPool = new cognito.UserPool(stack, "UserPool", {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  signInAliases: {
    username: false,
    email: true,
  },
  selfSignUpEnabled: true,
})

const userPoolDomain = new cognito.UserPoolDomain(stack, "Domain", {
  userPool,
  cognitoDomain: {
    domainPrefix: "demo-mysupercool-sso",
  },
  managedLoginVersion: cognito.ManagedLoginVersion.NEWER_MANAGED_LOGIN,
})

const clientA = new cognito.UserPoolClient(stack, "UserPoolClientA", {
  userPool,
  userPoolClientName: "client-a",
  oAuth: {
    callbackUrls: ["http://localhost:5173"],
    logoutUrls: ["http://localhost:5173"],
  },
})
const clientB = new cognito.UserPoolClient(stack, "UserPoolClientB", {
  userPool,
  userPoolClientName: "client-b",
  oAuth: {
    callbackUrls: ["http://localhost:5174"],
    logoutUrls: ["http://localhost:5174"],
  },
})

new cognito.CfnManagedLoginBranding(stack, "BrandingA", {
  userPoolId: userPool.userPoolId,
  clientId: clientA.userPoolClientId,
  useCognitoProvidedValues: true,
})
new cognito.CfnManagedLoginBranding(stack, "BrandingB", {
  userPoolId: userPool.userPoolId,
  clientId: clientB.userPoolClientId,
  useCognitoProvidedValues: true,
})

new cdk.CfnOutput(stack, "UserPoolId", {
  value: userPool.userPoolId,
})
new cdk.CfnOutput(stack, "UserPoolDomain", {
  value: userPoolDomain.baseUrl().replace(/^https:\/\//, ""),
})
new cdk.CfnOutput(stack, "UserPoolClientAId", {
  value: clientA.userPoolClientId,
})
new cdk.CfnOutput(stack, "UserPoolClientBId", {
  value: clientB.userPoolClientId,
})
