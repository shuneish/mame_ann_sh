import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyDxUhtDV7osYQfFwCsiJg4y5omBCUsXqtI",
  authDomain: "ar-shooting-11c7d.firebaseapp.com",
  projectId: "ar-shooting-11c7d",
  storageBucket: "ar-shooting-11c7d.firebasestorage.app",
  messagingSenderId: "498997455069",
  appId: "1:498997455069:web:fe27191565fdff19c01334",
  measurementId: "G-P421DF2WGR"
};

// Firebase初期化
let app = null;
let db = null;
let auth = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export { db, auth };

// Analyticsは本番環境でのみ初期化
let analytics = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}
export { analytics };

export default app; 