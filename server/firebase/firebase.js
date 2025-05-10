import admin from 'firebase-admin';

const serviceAccount = {
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_TYPE || "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
    "token_uri": process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN || "googleapis.com"
  }),
};


// Check if Firebase is already initialized to avoid multiple initializations
const initializeFirebaseAdmin = () => {
  if (admin.apps.length === 0) {
    try {
      admin.initializeApp(serviceAccount);
      console.log("Firebase Admin SDK initialized successfully");
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error);
      throw error;
    }
  }  
  return admin;
};

// Authentication middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  //console.log("Server authHeader: ", authHeader);
  const idToken = authHeader.split(' ')[1];
  //console.log("Server idToken: ", idToken);
  
  try {
    // Make sure Firebase is initialized
    const adminAuth = initializeFirebaseAdmin().auth();
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Token is valid
    req.user = decodedToken; // Store user info in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Token is invalid
    console.log("Server error: ", error);
    res.status(401).send('Unauthorized: Invalid token');
  }
};

export { initializeFirebaseAdmin, authenticate };
