package io.branch;

import android.app.Activity;
import android.net.LinkAddress;
import android.util.Log;

import io.branch.referral.Branch;
import io.branch.referral.BranchError;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class BranchSDK extends CordovaPlugin {

    // Standard Debugging Variables
    private static final String LCAT = "CordovaBranchSDK";

    // Private Method Properties
    private CallbackContext callbackContext;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        // Initialization codes here
    }

    /**
     * cordova.exec() method reference.
     * All exec() calls goes to this part.
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals("initSession")) {
            this.callbackContext = callbackContext;
            this.initSession();
            return true;
        }

        return false;

    }

    //////////////////////////////////////////////////
    //=-------------- CLASS METHODS ----------------//
    //////////////////////////////////////////////////

    private void initSession() {

        Log.d(LCAT, "start initSession()");

        final Activity activity = this.cordova.getActivity();
        final Branch instance = Branch.getInstance(activity);

        instance.initSession(new SessionListener(), activity.getIntent().getData(), activity);

    }

    //////////////////////////////////////////////////
    //----------- INNER CLASS LISTENERS ------------//
    //////////////////////////////////////////////////

    protected class SessionListener implements Branch.BranchReferralInitListener
    {

        /**
         * Listener that implements BranchReferralInitListener for initSession
         * */
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {

            Log.d(LCAT, "SessionListener onInitFinished()");

            if (error == null) {

                // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
                //  params will be empty if no data found.
                if (referringParams == null) {
                    Log.d(LCAT, "return is null");
                    return;
                } else {
                    Log.d(LCAT, "return is not null");
                    Log.d(LCAT, referringParams.toString());
                }

                callbackContext.success("initialize success");

            } else {
                String errorMessage = error.getMessage();

                Log.d(LCAT, errorMessage);

                callbackContext.error(errorMessage);
            }

        }

    }

}
