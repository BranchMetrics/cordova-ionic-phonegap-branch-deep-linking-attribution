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

import java.util.HashMap;
import java.util.Map;

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
     * <p>
     * cordova.exec() method reference.
     * All exec() calls goes to this part.
     * </p>
     *
     * @param  action [Action name/label to execute]
     * @param  args [Action parameters to pass]
     * @param  callbackContext [Callback function]
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
        } else if (action.equals("userCompletedAction")) {
            this.userCompletedAction(args.getString(0));
            return true;
        }

        return false;

    }

    //////////////////////////////////////////////////
    //=-------------- CLASS METHODS ----------------//
    //////////////////////////////////////////////////

    /**
     * <p>
     * Initialize Branch Session.
     * </p>
     */
    private void initSession() {

        Log.d(LCAT, "start initSession()");

        activity = this.cordova.getActivity();
        instance = Branch.getInstance(activity);

        instance.initSession(new SessionListener(), activity.getIntent().getData(), activity);

    }

    /**
     * <p>
     * Enable debug mode for the app.
     * </p>
     *
     * @param isEnable [Boolean flag value to enable/disable debugging mode]
     *
     */
    private void setDebug(boolean isEnable) {

        Log.d(LCAT, "start setDebug()");

        activity = this.cordova.getActivity();
        instance = Branch.getInstance(activity);

        if (isEnable) {
            instance.setDebug();
        }

        callbackContext.success("Success");

    }

    /**
     * <p>
     * Set instance identity.
     * </p>
     *
     * @param newIdentity [The identity name/identity for the current session]
     */
    private void setIdentity(String newIdentity) {

        Log.d(LCAT, "start setIdentity()");

        activity = this.cordova.getActivity();
        instance = Branch.getInstance(activity);

        instance.setIdentity(newIdentity);

        callbackContext.success("Success");

    }

    /**
     * <p>
     * Set user completed action
     * </p>
     *
     * @param action [Name of the completed user action]
     */
    private void userCompletedAction(String action) {

        Log.d(LCAT, "start userCompletedAction()");

        activity = this.cordova.getActivity();
        instance = Branch.getInstance(activity);

        instance.userCompletedAction(action);

        callbackContext.success("Success");

    }
    
    /**
     * <p>
     * Creates a dictionary for session returns.
     * </p>
     */
    private Map createSessionDict(JSONObject data) {
        Log.d(LCAT, "start createSessionDict()");

        Map<String, String> sessionDict = new HashMap<String, String>();

        if (data.has("~channel")) {
            sessionDict.put("~channel", data.optString("~channel"));
        }
        if (data.has("~feature")) {
            sessionDict.put("~feature", data.optString("~feature"));
        }
        if (data.has("~tags")) {
            sessionDict.put("~tags", data.optString("~tags"));
        }
        if (data.has("~campaign")) {
            sessionDict.put("~campaign", data.optString("~campaign"));
        }
        if (data.has("~stage")) {
            sessionDict.put("~stage", data.optString("~stage"));
        }
        if (data.has("~creation_source")) {
            sessionDict.put("~creation_source", data.optString("~creation_source"));
        }
        if (data.has("+match_guaranteed")) {
            sessionDict.put("+match_guaranteed", data.optString("+match_guaranteed"));
        }
        if (data.has("+referrer")) {
            sessionDict.put("+referrer", data.optString("+referrer"));
        }
        if (data.has("+phone_number")) {
            sessionDict.put("+phone_number", data.optString("+phone_number"));
        }
        if (data.has("+is_first_session")) {
            sessionDict.put("+is_first_session", data.optString("+is_first_session"));
        }
        if (data.has("+clicked_branch_link")) {
            sessionDict.put("+clicked_branch_link", data.optString("+clicked_branch_link"));
        }
        if (data.has("+click_timestamp")) {
            sessionDict.put("+click_timestamp", data.optString("+click_timestamp"));
        }

        return sessionDict;

    }

    //////////////////////////////////////////////////
    //----------- INNER CLASS LISTENERS ------------//
    //////////////////////////////////////////////////

    protected class SessionListener implements Branch.BranchReferralInitListener
    {

        /**
         * Listener that implements BranchReferralInitListener for initSession
         */
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
