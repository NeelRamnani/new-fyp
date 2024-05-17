import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc, getDoc, doc, limit } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const firebaseConfig = {
  apiKey: "AIzaSyCKw2By4KofFtrDqTc1_dUymZJJZ_cO-YQ",
  authDomain: "imaginai-590e4.firebaseapp.com",
  projectId: "imaginai-590e4",
  storageBucket: "imaginai-590e4.appspot.com",
  messagingSenderId: "1068422445669",
  appId: "1:1068422445669:web:0f7daa5bfd9034176ae48c"
};
const notify = () => toast("Login Successful");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    // Redirect to dashboard page
    window.location.href = '/dashboard';
  } catch (err) {
    console.error("Error during Google sign in:", err.message);
  }
};


const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

function Example() {
  const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: "top-center"
    });
  }};

// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error("Error during email/password login:", err.message);
//   }
// };
const logInWithEmailAndPassword = async (email, password) => {
 
  try {
    // console.log(email, password);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential?.user;
    // Check if the user exists in your Firebase authentication database
    // console.log(user, "test");
    const userDoc = await getUserDoc(user.uid);
    if (!userDoc) {
      throw new Error('User not found');
    }
   notify();
    // Login successful, redirect to dashboard page
    window.alert('Login successful:', user);
    // Redirect to dashboard page
    // window.location.href = '/dashboard';
  } catch (error) {
    throw new Error(error?.message);
    console.log(error);
    console.log(error?.message);
  }
};

const getUserDoc = async (userId) => {
  console.log("1");
  const usersCollection = collection(db, 'users');

  // Query documents where the 'email' field equals the specified emailValue
  const q = query(usersCollection, where('uid', '==', userId), limit(1));

  // Retrieve the matching document
  let querySnapshot = await getDocs(q)
  console.log(querySnapshot.size);
  if (querySnapshot?.size) {
    localStorage.setItem("user",JSON.stringify(querySnapshot.docs[0].data()))
    return querySnapshot.docs[0].data()
  }
  return null
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
  //   const docRef = doc(db, "users", userId);
  //  let test = await getDoc(docRef)
  // const userRef = collection(db,'users',userId);
  // console.log("2",userRef,userId);
  // const userDoc = await userRef.get();
  // console.log("3");
  // return userDoc.exists ? userDoc.data() : null;
  // return test.exists() ? test.data() : null;

};


const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // return user;

    let test = await addDoc(collection(db, "users"), {

      uid: user.uid,
      name: name,
      authProvider: "local",
      email: user.email,
    });
    return test;
  } catch (err) {
    console.error("Error during registration:", err.message);
  }
};


// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;

//     // Set custom claims for the user
//     await setCustomUserClaims(user.uid, { name: name });

//     window.alert("User registered successfully:", user);
//   } catch (err) {
//     window.alert("Error during registration:", err.message);
//   }
// };


const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Error during sign out:", err.message);
  }
};

export { auth, db, signInWithGoogle, googleProvider, sendPasswordReset, logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
