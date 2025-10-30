// import { loadStripe, type Stripe as StripeJS } from "@stripe/stripe-js";  (unneccessary with new firestore extension)

// ********(unneccessary with new firestore extension)***********
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );
// **************************************************************

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; 

export async function createCheckoutSession(priceId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in to start checkout.");

  // Step 1: Add a new checkout session document to Firestore
  const checkoutSessionRef = await addDoc(
    collection(db, "customers", user.uid, "checkout_sessions"),
    {
      price: priceId,
      success_url: window.location.origin + "/for-you",
      cancel_url: window.location.origin + "/choose-plan?canceled=true",
      allow_promotion_codes: true,
    }
  );

  // Step 2: Listen for the sessionId field to be added by the Stripe extension
  onSnapshot(checkoutSessionRef, async (snap) => {
     console.log("🔥 Snapshot update:", snap.data());
  const { sessionId, error } = snap.data() || {};

  if (error) {
    alert(`An error occurred: ${error.message}`);
    return;
  }

  if (sessionId) {
  // Stripe's new Checkout redirect (v2025+)
  const snapData = snap.data();
  const checkoutUrl = snapData?.url; 

  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  } else {
    console.warn("No checkout URL found; using fallback sessionId");
    window.location.href = `http://checkout.stripe.com/c/pay/${sessionId}`;
  }
}
});
}