//production keys are set in the environment on the server
module.exports = {
    googleClientID:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    stripePublicKey:process.env.STRIPE_PUBLI_KEY,
    stripeSecretKey:process.env.STRIPE_SECRET_KEY,
    facebookAppID: process.env.FACEBOOK_APP_ID,
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
    cookieKey: process.env.COOKIE_KEY
};