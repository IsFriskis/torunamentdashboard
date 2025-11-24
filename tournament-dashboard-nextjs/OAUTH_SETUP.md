# OAuth Setup Guide

This guide will help you set up OAuth authentication for Google, GitHub, and Facebook.

## Prerequisites

1. Have accounts on Google, GitHub, and Facebook
2. Your application running on `http://localhost:3000`

---

## 1. Generate AUTH_SECRET

Run this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and add it to your `.env` file:

```env
AUTH_SECRET=<your-generated-secret>
NEXTAUTH_URL=http://localhost:3000
```

---

## 2. Google OAuth Setup

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create or Select a Project
- Click the project dropdown at the top
- Click "New Project" or select an existing one

### Step 3: Enable APIs
- Go to "APIs & Services" → "Library"
- Search for "Google+ API" and enable it

### Step 4: Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in app name: "Tournament Dashboard"
   - Add your email as support email
   - Add authorized domains (for production)
   - Click "Save and Continue"
4. Back to creating OAuth client ID:
   - Application type: "Web application"
   - Name: "Tournament Dashboard"
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Click "Create"

### Step 5: Copy Credentials
- Copy the "Client ID" and "Client secret"
- Add to your `.env` file:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## 3. GitHub OAuth Setup

### Step 1: Go to GitHub Developer Settings
Visit: https://github.com/settings/developers

### Step 2: Create New OAuth App
1. Click "OAuth Apps" → "New OAuth App"
2. Fill in the form:
   - **Application name**: Tournament Dashboard
   - **Homepage URL**: `http://localhost:3000`
   - **Application description**: Tournament management system (optional)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Click "Register application"

### Step 3: Generate Client Secret
1. After creation, you'll see your Client ID
2. Click "Generate a new client secret"
3. Copy the secret immediately (you won't see it again!)

### Step 4: Copy Credentials
Add to your `.env` file:

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

## 4. Facebook OAuth Setup

### Step 1: Go to Facebook Developers
Visit: https://developers.facebook.com/apps/

### Step 2: Create a New App
1. Click "Create App"
2. Choose "Consumer" as the app type
3. Fill in:
   - **App name**: Tournament Dashboard
   - **App contact email**: your email
4. Click "Create App"

### Step 3: Add Facebook Login Product
1. In the dashboard, find "Facebook Login"
2. Click "Set Up"
3. Choose "Web" as the platform
4. Enter your site URL: `http://localhost:3000`
5. Click "Save" and "Continue"

### Step 4: Configure OAuth Settings
1. Go to "Facebook Login" → "Settings" in the left sidebar
2. Under "Valid OAuth Redirect URIs", add:
   ```
   http://localhost:3000/api/auth/callback/facebook
   ```
3. Click "Save Changes"

### Step 5: Get App Credentials
1. Go to "Settings" → "Basic" in the left sidebar
2. Copy your "App ID"
3. Click "Show" next to "App Secret" and copy it

### Step 6: Set App Mode
- For development: Your app is in "Development" mode by default
- For production: You'll need to switch to "Live" mode and complete App Review

### Step 7: Copy Credentials
Add to your `.env` file:

```env
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

---

## 5. Database Setup

Make sure your MySQL database is running and update the connection string:

```env
DATABASE_URL="mysql://root:root@localhost:3306/tournament_db"
```

Format: `mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE`

---

## 6. Final Steps

### Create/Update your `.env` file

Create a `.env` file in the root of your project with all the credentials:

```env
# Authentication
AUTH_SECRET=your-generated-32-byte-base64-string
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret

# Database
DATABASE_URL="mysql://root:root@localhost:3306/tournament_db"
```

### Restart your development server

```bash
npm run dev
```

### Test the login

1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Try signing in with Google, GitHub, or Facebook
4. After successful authentication, you'll be redirected to the dashboard

---

## Troubleshooting

### Google: "Error 400: redirect_uri_mismatch"
- Check that your redirect URI exactly matches: `http://localhost:3000/api/auth/callback/google`
- Make sure there are no trailing slashes
- Verify the URI is added in Google Cloud Console

### GitHub: "The redirect_uri MUST match the registered callback URL"
- Verify the callback URL in your GitHub OAuth App settings
- Should be: `http://localhost:3000/api/auth/callback/github`

### Facebook: "Can't Load URL: The domain of this URL isn't included in the app's domains"
- Add `localhost` to your app domains in Settings → Basic → App Domains
- Make sure the redirect URI is added in Facebook Login settings

### "AUTH_SECRET is not set"
- Make sure you generated and added AUTH_SECRET to your `.env` file
- Restart your development server after adding environment variables

### Database Connection Issues
- Verify MySQL is running
- Check username, password, host, and database name in DATABASE_URL
- Make sure the database `tournament_db` exists

---

## Production Deployment

When deploying to production:

1. **Update all OAuth redirect URIs** to use your production domain
2. **Generate a new AUTH_SECRET** for production (don't reuse development secret)
3. **Set NEXTAUTH_URL** to your production URL
4. **Facebook**: Switch app from Development to Live mode
5. **Google**: Update authorized domains in OAuth consent screen
6. **Database**: Update DATABASE_URL to your production database

Example production `.env`:

```env
AUTH_SECRET=<production-secret>
NEXTAUTH_URL=https://yourdomain.com

GOOGLE_CLIENT_ID=<your-google-id>
GOOGLE_CLIENT_SECRET=<your-google-secret>
# Update redirect to: https://yourdomain.com/api/auth/callback/google

GITHUB_CLIENT_ID=<your-github-id>
GITHUB_CLIENT_SECRET=<your-github-secret>
# Update redirect to: https://yourdomain.com/api/auth/callback/github

FACEBOOK_CLIENT_ID=<your-facebook-id>
FACEBOOK_CLIENT_SECRET=<your-facebook-secret>
# Update redirect to: https://yourdomain.com/api/auth/callback/facebook

DATABASE_URL="mysql://user:pass@host:port/database"
```

---

## Security Notes

- **Never commit your `.env` file to git** (it's in `.gitignore`)
- **Keep your client secrets private** - they should never be exposed in client-side code
- **Use environment-specific secrets** - different secrets for dev/staging/prod
- **Rotate secrets regularly** if you suspect they've been compromised
- **Enable 2FA** on your Google, GitHub, and Facebook developer accounts

---

## Need Help?

- NextAuth.js Documentation: https://next-auth.js.org/
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- GitHub OAuth: https://docs.github.com/en/apps/oauth-apps
- Facebook Login: https://developers.facebook.com/docs/facebook-login
