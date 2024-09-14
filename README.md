# Deploying a Node.js Express Application to Netlify
This guide provides instructions for deploying a Node.js Express application to Netlify using Netlify Functions.

## Prerequisites
Before you start, ensure that you have the following installed on your machine:
- Node.js and npm
- Netlify CLI (`netlify-cli`)

If you don't have Netlify CLI installed globally, you can install it with the following command:

```bash
npm install -g netlify-cli
```

## Setting Up Your Project
### 1. Install Required Packages
Install the necessary npm packages for your project:

```bash
npm install netlify-lambda serverless-http
```

### 2. Create Project Structure
Create `dist` Folder

At the root of your project, create a `dist` folder with a blank `index.html` file inside it:

```bash
dist
  └── index.html
```

Create `functions` Folder

At the root of your project, create a `functions` folder with an `api.js` file inside it:

```javascript
// functions/api.js

const express = require('express');
const serverless = require('serverless-http');
const router = require('../app'); // Import all your routers here

const app = express();
app.use(express.json());
// Use all your express configurations here
// NOTE: You can configure all your routes in a separate file for flexibility with running the project via Netlify Functions as well as a normal Express application
app.use('/', router);

module.exports.handler = serverless(app);

```

### 3. Configure Netlify
Create a `netlify.toml` file at the root of your project with the following content:

```toml
[build]
  functions = "functions"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

This configuration tells Netlify to use the `functions` located in the functions folder and sets up a redirect to your API.

## Deploy Your Application
To deploy your application to Netlify, run the following command:

```bash
netlify deploy --prod
```

This command deploys your application to Netlify's production environment.

## Additional Notes

- Ensure that all your routes and Express configurations are correctly set up in the `router` file you import in `api.js`.
- You may configure your application to run both locally and on Netlify Functions by managing your routes and configurations in a flexible manner.

## Troubleshooting
If you encounter any issues during deployment, check the following:

- Ensure all required packages are installed.
Verify the structure and contents of your `netlify.toml` file.
- Review the Netlify build logs for any errors related to your functions.

For more detailed information on Netlify Functions and deployment, refer to the [Netlify documentation](https://docs.netlify.com/functions/overview/).

## Reference
- [How to create a serveless express app in netlify](https://youtu.be/q1TrsvKdpcU?si=lhT3g68FrmMfrIhP)
- [Deploy NodeJS App on Netlify for Free (Heroku Alternative) | NEW 2023 Tutorial](https://youtu.be/8x0Dty5D6CA?si=SFcjGP_zFrxDPjGY)
- [How to deploy express.js on Netlify](https://youtu.be/hQAu0YEIF0g?si=8f5u0NKFctG-3PWe)