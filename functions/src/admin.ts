import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

if (!admin.apps.length) admin.initializeApp();
const authAdmin = admin.auth();

const ADMIN_EMAILS = [
  "enquiries@integratedwellth.co.za",
  "marcia@integratedwellth.co.za",
];

/**
 * Sets the admin custom claim on a user.
 * Only existing admins (by email or existing claim) can call this.
 */
export const setAdminClaim = onCall(
  { region: "us-central1", cors: ["https://integratedwellthsolutions.web.app", "https://integratedwellthsolutions.firebaseapp.com"] },
  async (request) => {
    const callerUid = request.auth?.uid;
    const targetEmail = (request.data.email as string)?.toLowerCase().trim();

    if (!callerUid) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    }
    if (!targetEmail) {
      throw new HttpsError("invalid-argument", "Target email is required.");
    }

    // Verify caller is an admin
    const caller = await authAdmin.getUser(callerUid);
    const callerIsAdmin =
      ADMIN_EMAILS.includes(caller.email || "") ||
      caller.customClaims?.admin === true;

    if (!callerIsAdmin) {
      throw new HttpsError("permission-denied", "Only admins can assign admin roles.");
    }

    try {
      const targetUser = await authAdmin.getUserByEmail(targetEmail);
      await authAdmin.setCustomUserClaims(targetUser.uid, {
        ...targetUser.customClaims,
        admin: true,
      });

      // Force token refresh on next request
      await authAdmin.revokeRefreshTokens(targetUser.uid);

      return { success: true, uid: targetUser.uid, email: targetEmail };
    } catch (error: any) {
      console.error("setAdminClaim failed:", error);
      throw new HttpsError("internal", error.message || "Failed to set admin claim.");
    }
  }
);

/**
 * Removes the admin custom claim from a user.
 */
export const removeAdminClaim = onCall(
  { region: "us-central1", cors: ["https://integratedwellthsolutions.web.app", "https://integratedwellthsolutions.firebaseapp.com"] },
  async (request) => {
    const callerUid = request.auth?.uid;
    const targetEmail = (request.data.email as string)?.toLowerCase().trim();

    if (!callerUid) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    }
    if (!targetEmail) {
      throw new HttpsError("invalid-argument", "Target email is required.");
    }

    const caller = await authAdmin.getUser(callerUid);
    const callerIsAdmin =
      ADMIN_EMAILS.includes(caller.email || "") ||
      caller.customClaims?.admin === true;

    if (!callerIsAdmin) {
      throw new HttpsError("permission-denied", "Only admins can remove admin roles.");
    }

    // Prevent self-removal if you're the last bootstrap admin
    if (ADMIN_EMAILS.includes(targetEmail)) {
      throw new HttpsError(
        "permission-denied",
        "Cannot remove admin claim from a bootstrap admin account."
      );
    }

    try {
      const targetUser = await authAdmin.getUserByEmail(targetEmail);
      const newClaims = { ...targetUser.customClaims };
      delete (newClaims as any).admin;

      await authAdmin.setCustomUserClaims(targetUser.uid, newClaims);
      await authAdmin.revokeRefreshTokens(targetUser.uid);

      return { success: true, uid: targetUser.uid, email: targetEmail };
    } catch (error: any) {
      console.error("removeAdminClaim failed:", error);
      throw new HttpsError("internal", error.message || "Failed to remove admin claim.");
    }
  }
);

/**
 * Gets the caller's own claims (for client-side admin detection).
 */
export const getMyClaims = onCall(
  { region: "us-central1", cors: ["https://integratedwellthsolutions.web.app", "https://integratedwellthsolutions.firebaseapp.com"] },
  async (request) => {
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    }

    const user = await authAdmin.getUser(callerUid);
    return {
      claims: user.customClaims || {},
      email: user.email,
      admin: user.customClaims?.admin === true || ADMIN_EMAILS.includes(user.email || ""),
    };
  }
);
