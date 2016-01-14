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
    private Activity activity;
    private Branch instance;

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

        this.callbackContext = callbackContext;

        if (action.equals("initSession")) {
            this.initSession();
            return true;
        } else if (action.equals("setDebug")) {
            this.setDebug(args.getBoolean(0));
            return true;
        } else if (action.equals("setIdentity")) {
            this.setIdentity(args.getString(0));
            return true;
        }

        return false;

    }

    //////////////////////////////////////////////////
    //=-------------- CLASS METHODS ----------------//
    //////////////////////////////////////////////////

    /**
     * Initialize Branch Session.
     */
    private void initSession() {

        Log.d(LCAT, "start initSession()");

        activity = this.cordova.getActivity();
        instance = Branch.getInstance(activity);

        instance.initSession(new SessionListener(), activity.getIntent().getData(), activity);

    }

    /**
     * Enable debug mode for the app.
     * 
     * @param isEnable - Boolean flag value to enable/disable debugging mode
     */
    private void setDebug(boolean isEnable) {

        Log.d(LCAT, "start setDebug()");

        activity = this.cordova.getActivity();
        instance = Branch.getInstance(activity);

        if (isEnable) {
            instance.setDebug();
        }

    }

    /**
     * Set instance identity.
     * 
     * @param newIdentity - The identity name/identity for the current session
     */
    private void setIdentity(string newIdentity) {

        Log.d(LCAT, "start setIdentity()");

        activity = this.cordova.getActivity();
        instance = Branch.getInstance(activity);

        instance.setIdentity(newIdentity);

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
