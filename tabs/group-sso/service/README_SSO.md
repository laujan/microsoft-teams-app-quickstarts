# SSO Service

## Installing

```bash
yarn install
```

### Prerequisites

Before start to use this server complete steps from [Single Sign-On Documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-aad-sso)

### Configure environment

Edit `.env` file at the root of the repository with the following values:

```bash
APPSETTING_AAD_ApplicationId="<AAD App ID>"
APPSETTING_AAD_ApplicationSecret="<AAD App Secret>"
APPSETTING_AAD_BaseUri="<SSL Base Uri>"
```

### Start Express Server
Before starting the server make sure that you have copy of client `build` folder in the root of this project.

```bash
yarn sso-server-start
```

### Start ngrok tunnel

For authentication to work it's recommended to use an ngrok tunnel to hoist the localhost site to an SSL uri:

```bash
ngrok http 3001 --host-header=rewrite [--subdomain=<YOUR_SUBDOMAIN>]
```

### Build React App

```bash
yarn build
```

Now simply visit the Express app at 'http://localhost:3001' and you will see your app served from the 'build' folder. That's all there is to it!