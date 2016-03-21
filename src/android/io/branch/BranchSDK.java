package io.branch;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;

import io.branch.indexing.BranchUniversalObject;
import io.branch.referral.Branch;
import io.branch.referral.BranchError;
import io.branch.referral.SharingHelper;
import io.branch.referral.util.ShareSheetStyle;

public class BranchSDK extends CordovaPlugin
{

    static class BranchLinkProperties extends io.branch.referral.util.LinkProperties {}

    // Standard Debugging Variables
    private static final String LCAT = "CordovaBranchSDK";

    // Private Method Properties
    private ArrayList<BranchUniversalObject> branchObjects;
    private CallbackContext callbackContext;
    private CallbackContext onShareLinkDialogLaunched;
    private CallbackContext onShareLinkDialogDismissed;
    private CallbackContext onLinkShareResponse;
    private CallbackContext onChannelSelected;
    private Activity activity;
    private Branch instance;

    /**
     * Class Constructor
     */
    public BranchSDK()
    {
        this.activity = null;
        this.instance = null;
        this.callbackContext = null;
        this.onShareLinkDialogLaunched = null;
        this.onShareLinkDialogDismissed = null;
        this.onLinkShareResponse = null;
        this.onChannelSelected = null;
        this.branchObjects = new ArrayList<BranchUniversalObject>();
    }

    /**
     * Called when the activity receives a new intent.
     */
    public void onNewIntent(Intent intent)
    {
        Log.d(LCAT, "start onNewIntent()");

        if (this.activity != null) {
            this.setDebug(true);
            this.initSession();
        }
    }

    /**
     * Called when the activity will start interacting with the user.
     *
     * @param multitasking A {@link boolean} flag indicating if multitasking is turned on for app
     */
    @Override
    public void onResume(boolean multitasking) {

        Log.d(LCAT, "SDK On Resume");

    }

    /**
     * Called when the activity is no longer visible to the user.
     */
    @Override
    public void onStop()
    {

        Log.d(LCAT, "SDK On Stop");

        if (this.instance != null) {
            Log.d(LCAT, "instance.closeSession()");
            this.instance.closeSession();
        }

    }

    /**
     * <p>
     * cordova.exec() method reference.
     * All exec() calls goes to this part.
     * </p>
     *
     * @param  action A {@link String} value method to be executed.
     * @param  args   A {@link JSONArray} value parameters passed along with the action param.
     * @param  callbackContext A {@link CallbackContext} function passed for executing callbacks.
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException
    {
        this.callbackContext = callbackContext;

        if (action.equals("setDebug")) {
            if (args.length() == 1) {
                this.setDebug(args.getBoolean(0));
            }
            return true;
        } else if (action.equals("initSession")) {
            this.initSession();
            return true;
        } else {
            if (this.instance != null) {
                if (action.equals("setIdentity")) {
                    this.setIdentity(args.getString(0));
                    return true;
                } else if (action.equals("userCompletedAction")) {
                    if (args.length() < 1 && args.length() > 2) {
                        callbackContext.error(String.format("Parameter mismatched. 1-2 is required but %d is given", args.length()));
                        return false;
                    }
                    if (args.length() == 2) {
                        this.userCompletedAction (args.getString(0), args.getJSONObject(1));
                    } else if (args.length() == 1) {
                        this.userCompletedAction(args.getString(0));
                    }
                    return true;
                } else if (action.equals("getFirstReferringParams")) {
                    this.getFirstReferringParams();
                    return true;
                } else if (action.equals("getLatestReferringParams")) {
                    this.getLatestReferringParams();
                    return true;
                } else if (action.equals("logout")) {
                    this.logout();
                    return true;
                } else if (action.equals("loadRewards")) {
                    this.loadRewards();
                    return true;
                } else if (action.equals("redeemRewards")) {
                    if (args.length() < 1 && args.length() > 2) {
                        callbackContext.error(String.format("Parameter mismatched. 1-2 is required but %d is given", args.length()));
                        return false;
                    }
                    if (args.length() == 1) {
                        this.redeemRewards(args.getInt(0));
                    } else if (args.length() == 2) {
                        this.redeemRewards(args.getInt(0), args.getString(1));
                    }
                    return true;
                } else if (action.equals("getCreditHistory")) {
                    this.getCreditHistory();
                    return true;
                } else if (action.equals("createBranchUniversalObject")) {
                    if (args.length() == 1) {
                        this.createBranchUniversalObject(args.getJSONObject(0));
                        return true;
                    } else {
                        callbackContext.error(String.format("Parameter mismatched. 1 is required but %d is given", args.length()));
                        return false;
                    }
                } else if (action.equals(("generateShortUrl"))) {
                    if (args.length() == 3) {
                        this.generateShortUrl(args.getInt(0), args.getJSONObject(1), args.getJSONObject(2));
                        return true;
                    } else {
                        callbackContext.error(String.format("Parameter mismatched. 3 is required but %d is given", args.length()));
                        return false;
                    }
                } else if (action.equals("registerView")) {
                    if (args.length() == 1) {
                        this.registerView(args.getInt(0));
                    }
                    return true;
                } else if (action.equals("showShareSheet")) {
                    if (args.length() == 3) {
                        this.showShareSheet(args.getInt(0), args.getJSONObject(1), args.getJSONObject(2));
                        return true;
                    } else {
                        callbackContext.error(String.format("Parameter mismatched. 3 is required but %d is given", args.length()));
                        return false;
                    }
                } else if (action.equals("onShareLinkDialogLaunched")) {
                    this.onShareLinkDialogLaunched = callbackContext;
                    return true;
                } else if (action.equals("onShareLinkDialogDismissed")) {
                    this.onShareLinkDialogDismissed = callbackContext;
                    return true;
                } else if (action.equals("onLinkShareResponse")) {
                    this.onLinkShareResponse = callbackContext;
                    return true;
                } else if (action.equals("onChannelSelected")) {
                    this.onChannelSelected = callbackContext;
                    return true;
                }
            } else {
                callbackContext.error("Branch instance not set. Please execute initSession() first.");
            }
        }

        return false;

    }

    //////////////////////////////////////////////////
    //----------- CLASS PRIVATE METHODS ------------//
    //////////////////////////////////////////////////

    /**
     * <p>Initialises a session with the Branch API, assigning a {@link BranchUniversalReferralInitListener}
     * to perform an action upon successful initialisation.</p>
     */
    private void initSession()
    {

        Log.d(LCAT, "start initSession()");

        this.instance = Branch.getAutoInstance(this.activity.getApplicationContext());
        this.instance.initSession(new SessionListener(), activity.getIntent().getData(), activity);


    }

    /**
     * <p>This method should be called if you know that a different person is about to use the app. For example,
     * if you allow users to log out and let their friend use the app, you should call this to notify Branch
     * to create a new user for this device. This will clear the first and latest params, as a new session is created.</p>
     */
    private void logout()
    {

        Log.d(LCAT, "start logout()");

        this.instance.logout();

    }

    /**
     * <p>Redeems the specified number of credits from the "default" bucket, if there are sufficient
     * credits within it. If the number to redeem exceeds the number available in the bucket, all of
     * the available credits will be redeemed instead.</p>
     *
     * @param count A {@link Integer} specifying the number of credits to attempt to redeem from
     *              the bucket.
     */
    private void redeemRewards(final int value)
    {

        Log.d(LCAT, "start redeemRewards()");

        this.instance.redeemRewards(value, new LoadRewardsListener());

    }

    /**
     * <p>Redeems the specified number of credits from the "default" bucket, if there are sufficient
     * credits within it. If the number to redeem exceeds the number available in the bucket, all of
     * the available credits will be redeemed instead.</p>
     *
     * @param count A {@link Integer} specifying the number of credits to attempt to redeem from
     *              the bucket.
     */
    private void redeemRewards(int value, String bucket) {

        Log.d(LCAT, "start redeemRewards()");

        this.instance.redeemRewards(bucket, value, new LoadRewardsListener());

    }

    /**
     * <p>Retrieves rewards for the current session, with a callback to perform a predefined
     * action following successful report of state change. You'll then need to call getCredits
     * in the callback to update the credit totals in your UX.</p>
     */
    private void loadRewards()
    {

        Log.d(LCAT, "start loadRewards()");

        this.instance.loadRewards(new LoadRewardsListener());

    }

    /**
     * <p>Returns the parameters associated with the link that referred the session. If a user
     * clicks a link, and then opens the app, initSession will return the paramters of the link
     * and then set them in as the latest parameters to be retrieved by this method. By default,
     * sessions persist for the duration of time that the app is in focus. For example, if you
     * minimize the app, these parameters will be cleared when closeSession is called.</p>
     *
     * @return A {@link JSONObject} containing the latest referring parameters as
     * configured locally.
     */
    private void getLatestReferringParams()
    {

        Log.d(LCAT, "start getLatestReferringParams()");

        JSONObject sessionParams = this.instance.getLatestReferringParams();

        if (sessionParams == null) {
            Log.d(LCAT, "return is null");
        } else {
            Log.d(LCAT, "return is not null");
            Log.d(LCAT, sessionParams.toString());
        }

        this.callbackContext.success(sessionParams);

    }

    /**
     * <p>Returns the parameters associated with the link that referred the user. This is only set once,
     * the first time the user is referred by a link. Think of this as the user referral parameters.
     * It is also only set if isReferrable is equal to true, which by default is only true
     * on a fresh install (not upgrade or reinstall). This will change on setIdentity (if the
     * user already exists from a previous device) and logout.</p>
     */
    private void getFirstReferringParams()
    {

        Log.d(LCAT, "start getFirstReferringParams()");

        JSONObject installParams = this.instance.getFirstReferringParams();

        if (installParams == null) {
            Log.d(LCAT, "return is null");
        } else {
            Log.d(LCAT, "return is not null");
            Log.d(LCAT, installParams.toString());
        }

        this.callbackContext.success(installParams);

    }

    /**
     * <p>
     * Create a BranchUniversalObject with the given content.
     * </p>
     *
     * @param options A {@link JSONObject} value to set for the branch universal object properties.
     *
     * @return A {@link JSONObject} value of BranchUniversalObject instance.
     */
    private void createBranchUniversalObject(JSONObject options) throws JSONException
    {

        Log.d(LCAT, "start createBranchUniversalObject()");

        BranchUniversalObject branchObj = new BranchUniversalObject();

        // Set object properties
        // Facebook Properties
        if (options.has("canonicalIdentifier")) {
            Log.d(LCAT, "set canonical identifier");
            branchObj.setCanonicalIdentifier(options.getString("canonicalIdentifier"));
        }
        if (options.has("title")) {
            Log.d(LCAT, "set title");
            branchObj.setTitle(options.getString("title"));
        }
        if (options.has("contentDescription")) {
            Log.d(LCAT, "set content description");
            branchObj.setContentDescription(options.getString("contentDescription"));
        }
        if (options.has("contentImageUrl")) {
            Log.d(LCAT, "set content image url");
            branchObj.setContentImageUrl(options.getString("contentImageUrl"));
        }

        // Set content visibility
        if (options.has("contentIndexingMode")) {
            Log.d(LCAT, "set content indexing mode");

            if (options.getString("contentIndexingMode").equals("private")) {
                Log.d(LCAT, "set private");
                branchObj.setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE);
            } else {
                Log.d(LCAT, "set public");
                branchObj.setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC);
            }
        }

        // Add custom keys/values to the deep link data
        if (options.has("contentMetadata")) {
            Log.d(LCAT, "add content meta data");

            JSONObject contentMetaData = options.getJSONObject("contentMetadata");
            Iterator<?> keys = contentMetaData.keys();

            while (keys.hasNext()) {
                String key = (String) keys.next();
                String value = contentMetaData.optString(key);
                Log.d(LCAT, contentMetaData.getString(key));
                branchObj.addContentMetadata(key, value);
            }
        }

        this.branchObjects.add(branchObj);

        JSONObject response = new JSONObject();

        response.put("message", "Success");
        response.put("branchUniversalObjectId", this.branchObjects.size() - 1);

        this.callbackContext.success(response);

    }

    /**
     * Display a popup of the share sheet.
     *
     * @param instanceIdx The instance index from branchObjects array
     * @param options A {@link JSONObject} value to set URL options.
     * @param controlParams A {@link JSONObject} value to set the URL control parameters.
     */
    private void showShareSheet(int instanceIdx, JSONObject options, JSONObject controlParams) throws JSONException
    {

        Log.d(LCAT, "start showShareSheet()");

        ShareSheetStyle shareSheetStyle = new ShareSheetStyle(this.activity, "Check this out!", "This stuff is awesome: ")
                .setCopyUrlStyle(this.activity.getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                .setMoreOptionStyle(this.activity.getResources().getDrawable(android.R.drawable.ic_menu_search), "Show More")
                .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL);

        BranchLinkProperties linkProperties = createLinkProperties(options, controlParams);

        BranchUniversalObject branchObj = (BranchUniversalObject)this.branchObjects.get(instanceIdx);

        branchObj.showShareSheet(this.activity, linkProperties, shareSheetStyle, new ShowShareSheetListener());

    }

    /**
     * Generates a share link.
     *
     * @param options A {@link JSONObject} value to set URL options.
     * @param controlParams A {@link JSONObject} value to set the URL control parameters.
     *
     * @return A {@link io.branch.referral.util.LinkProperties} value.
     */
    private BranchLinkProperties createLinkProperties(JSONObject options, JSONObject controlParams) throws JSONException
    {

        Log.d(LCAT, "start createLinkProperties()");

        BranchLinkProperties linkProperties = new BranchLinkProperties();

        if (options.has("feature")) {
            linkProperties.setFeature(options.getString("feature"));
        } else if (options.has("alias")) {
            linkProperties.setFeature(options.getString("alias"));
        } else if (options.has("channel")) {
            linkProperties.setFeature(options.getString("channel"));
        } else if (options.has("stage")) {
            linkProperties.setFeature(options.getString("stage"));
        } else if (options.has("duration")) {
            linkProperties.setFeature(options.getString("duration"));
        }

        if (options.has("tags")) {
            ArrayList<String> tags = (ArrayList<String>) options.get("tags");

            for (String tag : tags) {
                linkProperties.addTag(tag);
            }
        }

        if (controlParams.has("$fallback_url")) {
            Log.d(LCAT, "addControlParameter $fallback_url");
            linkProperties.addControlParameter("$fallback_url", controlParams.getString("$fallback_url"));
        }
        if (controlParams.has("$desktop_url")) {
            Log.d(LCAT, "addControlParameter $desktop_url");
            linkProperties.addControlParameter("$desktop_url", controlParams.getString("$desktop_url"));
        }
        if (controlParams.has("$android_url")) {
            Log.d(LCAT, "addControlParameter $android_url");
            linkProperties.addControlParameter("$android_url", controlParams.getString("$android_url"));
        }
        if (controlParams.has("$ios_url")) {
            Log.d(LCAT, "addControlParameter $ios_url");
            linkProperties.addControlParameter("$ios_url", controlParams.getString("$ios_url"));
        }
        if (controlParams.has("$ipad_url")) {
            Log.d(LCAT, "addControlParameter $ipad_url");
            linkProperties.addControlParameter("$ipad_url", controlParams.getString("$ipad_url"));
        }
        if (controlParams.has("$fire_url")) {
            Log.d(LCAT, "addControlParameter $fire_url");
            linkProperties.addControlParameter("$fire_url", controlParams.getString("$fire_url"));
        }
        if (controlParams.has("$blackberry_url")) {
            Log.d(LCAT, "addControlParameter $blackberry_url");
            linkProperties.addControlParameter("$blackberry_url", controlParams.getString("$blackberry_url"));
        }
        if (controlParams.has("$windows_phone_url")) {
            Log.d(LCAT, "addControlParameter $windows_phone_url");
            linkProperties.addControlParameter("$windows_phone_url", controlParams.getString("$windows_phone_url"));
        }

        return linkProperties;

    }

    /**
     * Mark the content referred by this object as viewed. This increment the view count of the contents referred by this object.
     *
     * @param instanceIdx The instance index from branchObjects array
     */
    private void registerView(int instanceIdx)
    {

        Log.d(LCAT, "start registerView()");

        BranchUniversalObject branchObj = (BranchUniversalObject)this.branchObjects.get(instanceIdx);

        branchObj.registerView();

    }

    /**
     * Generate a URL.
     *
     * @param instanceIdx The instance index from branchObjects array
     * @param options A {@link JSONObject} value to set URL options.
     * @param controlParams A {@link JSONObject} value to set the URL control parameters.
     */
    private void generateShortUrl(int instanceIdx, JSONObject options, JSONObject controlParams) throws JSONException
    {

        Log.d(LCAT, "start generateShortUrl()");

        BranchLinkProperties linkProperties = new BranchLinkProperties();

        if (options.has("feature")) {
            linkProperties.setFeature(options.getString("feature"));
        } else if (options.has("alias")) {
            linkProperties.setAlias(options.getString("alias"));
        } else if (options.has("channel")) {
            linkProperties.setChannel(options.getString("channel"));
        } else if (options.has("stage")) {
            linkProperties.setStage(options.getString("stage"));
        } else if (options.has("duration")) {
            linkProperties.setDuration(options.getInt("duration"));
        }

        if (options.has("tags")) {
            ArrayList<String> tags = (ArrayList<String>) options.get("tags");

            for (String tag : tags) {
                linkProperties.addTag(tag);
            }
        }

        if (controlParams.has("$fallback_url")) {
            Log.d(LCAT, "addControlParameter $fallback_url");
            linkProperties.addControlParameter("$fallback_url", controlParams.getString("$fallback_url"));
        }
        if (controlParams.has("$desktop_url")) {
            Log.d(LCAT, "addControlParameter $desktop_url");
            linkProperties.addControlParameter("$desktop_url", controlParams.getString("$desktop_url"));
        }
        if (controlParams.has("$android_url")) {
            Log.d(LCAT, "addControlParameter $android_url");
            linkProperties.addControlParameter("$android_url", controlParams.getString("$android_url"));
        }
        if (controlParams.has("$ios_url")) {
            Log.d(LCAT, "addControlParameter $ios_url");
            linkProperties.addControlParameter("$ios_url", controlParams.getString("$ios_url"));
        }
        if (controlParams.has("$ipad_url")) {
            Log.d(LCAT, "addControlParameter $ipad_url");
            linkProperties.addControlParameter("$ipad_url", controlParams.getString("$ipad_url"));
        }
        if (controlParams.has("$fire_url")) {
            Log.d(LCAT, "addControlParameter $fire_url");
            linkProperties.addControlParameter("$fire_url", controlParams.getString("$fire_url"));
        }
        if (controlParams.has("$blackberry_url")) {
            Log.d(LCAT, "addControlParameter $blackberry_url");
            linkProperties.addControlParameter("$blackberry_url", controlParams.getString("$blackberry_url"));
        }
        if (controlParams.has("$windows_phone_url")) {
            Log.d(LCAT, "addControlParameter $windows_phone_url");
            linkProperties.addControlParameter("$windows_phone_url", controlParams.getString("$windows_phone_url"));
        }

        BranchUniversalObject branchObj = (BranchUniversalObject)this.branchObjects.get(instanceIdx);

        branchObj.generateShortUrl(this.activity, linkProperties, new GenerateShortUrlListener());

    }

    /**
     * <p>Sets the library to function in debug mode, enabling logging of all requests.</p>
     * <p>If you want to flag debug, call this <b>before</b> initUserSession</p>
     *
     * @param isEnable A {@link Boolean} value to enable/disable debugging mode for the app.
     */
    private void setDebug(boolean isEnable)
    {

        Log.d(LCAT, "start setDebug()");

        this.activity = this.cordova.getActivity();


        Branch debugInstance = Branch.getAutoInstance(this.activity.getApplicationContext());

        if (isEnable) {
            debugInstance.setDebug();
        }

    }

    /**
     * <p>Identifies the current user to the Branch API by supplying a unique
     * identifier as a {@link String} value.</p>
     *
     * @param newIdentity A {@link String} value containing the unique identifier of the user.
     */
    private void setIdentity(String newIdentity)
    {

        Log.d(LCAT, "start setIdentity()");

        this.instance.setIdentity(newIdentity);
        this.callbackContext.success("Success");

    }

    /**
     * <p>A void call to indicate that the user has performed a specific action and for that to be
     * reported to the Branch API.</p>
     *
     * @param action A {@link String} value to be passed as an action that the user has carried out.
     *               For example "logged in" or "registered".
     */
    private void userCompletedAction(String action)
    {

        Log.d(LCAT, "start userCompletedAction()");

        this.instance.userCompletedAction(action);

    }

    /**
     * <p>A void call to indicate that the user has performed a specific action and for that to be
     * reported to the Branch API.</p>
     *
     * @param action    A {@link String} value to be passed as an action that the user has carried
     *                  out. For example "logged in" or "registered".
     * @param metaData  A {@link JSONObject} containing app-defined meta-data to be attached to a
     *                  user action that has just been completed.
     */
    private void userCompletedAction(String action, JSONObject metaData)
    {

        Log.d(LCAT, "start userCompletedAction()");

        this.instance.userCompletedAction(action, metaData);
        this.callbackContext.success("Success");

    }

    /**
     * <p>Gets the credit history of the specified bucket and triggers a callback to handle the
     * response.</p>
     */
    private void getCreditHistory()
    {

        Log.d(LCAT, "start creditHistory()");

        this.instance.getCreditHistory(new CreditHistoryListener());

    }

    //////////////////////////////////////////////////
    //----------- INNER CLASS LISTENERS ------------//
    //////////////////////////////////////////////////

    protected class SessionListener implements Branch.BranchReferralInitListener
    {

        //Listener that implements BranchReferralInitListener for initSession
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

                String out = String.format("DeepLinkHandler(%s)", referringParams.toString());

                webView.sendJavascript(out);
                callbackContext.success(referringParams);

            } else {
                String errorMessage = error.getMessage();

                Log.d(LCAT, errorMessage);

                String out = String.format("DeepLinkHandler(%s)", referringParams.toString());

                webView.sendJavascript(out);
                callbackContext.error(errorMessage);

            }

        }

    }

    protected class LoadRewardsListener implements Branch.BranchReferralStateChangedListener
    {

        // Listener that implements BranchReferralStateChangedListener for loadRewards
        @Override
        public void onStateChanged(boolean changed, BranchError error) {

            Log.d(LCAT, "LoadRewardsListener onStateChanged()");

            if (error == null) {

                int credits = instance.getCredits();

                Log.d(LCAT, "LoadRewards success");

                callbackContext.success(credits);

            } else {

                String errorMessage = error.getMessage();

                Log.d(LCAT, errorMessage);

                callbackContext.error(errorMessage);

            }

        }
    }

    protected class GenerateShortUrlListener implements Branch.BranchLinkCreateListener
    {
        @Override
        public void onLinkCreate(String url, BranchError error) {

            Log.d(LCAT, "inside onLinkCreate");

            JSONObject response = new JSONObject();

            if (error == null) {

                Log.d(LCAT, "link to share: " + url);

                try {
                    response.put("url", url);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }

                Log.d(LCAT, response.toString());
                callbackContext.success(response);

            } else {

                String errorMessage = error.getMessage();

                Log.d(LCAT, errorMessage);

                try {
                    response.put("error", errorMessage);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }

                Log.d(LCAT, response.toString());
                callbackContext.error(response);

            }

        }

    }

    protected class ShowShareSheetListener implements Branch.BranchLinkShareListener
    {
        @Override
        public void onShareLinkDialogLaunched() {
            Log.d(LCAT, "inside onShareLinkDialogLaunched");

            if (onShareLinkDialogLaunched != null) {
                PluginResult result = new PluginResult(PluginResult.Status.OK);

                result.setKeepCallback(true);

                onShareLinkDialogLaunched.sendPluginResult(result);
            }

        }

        @Override
        public void onShareLinkDialogDismissed() {
            Log.d(LCAT, "inside onShareLinkDialogDismissed");

            if (onShareLinkDialogDismissed != null) {
                PluginResult result = new PluginResult(PluginResult.Status.OK);

                result.setKeepCallback(true);

                onShareLinkDialogDismissed.sendPluginResult(result);
            }

        }

        @Override
        public void onLinkShareResponse(String sharedLink, String sharedChannel, BranchError error) {

            Log.d(LCAT, "inside onLinkCreate");

            JSONObject response = new JSONObject();

            if (error == null) {

                try {
                    response.put("sharedLink", sharedLink);
                    response.put("sharedChannel", sharedChannel);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }

                Log.d(LCAT, "sharedLink: " + sharedLink);
                Log.d(LCAT, "sharedChannel: " + sharedChannel);
            } else {
                String errorMessage = error.getMessage();

                Log.d(LCAT, errorMessage);

                try {
                    response.put("error", errorMessage);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }
            }

            Log.d(LCAT, response.toString());

            if (onLinkShareResponse != null) {
                PluginResult result = new PluginResult(PluginResult.Status.OK, response);

                result.setKeepCallback(true);

                onLinkShareResponse.sendPluginResult(result);
            }

        }

        @Override
        public void onChannelSelected(String channelName) {

            Log.d(LCAT, "inside onChannelSelected");
            Log.d(LCAT, "channelName: " + channelName);

            JSONObject response = new JSONObject();

            try {
                response.put("channelName", channelName);
            } catch (JSONException e) {
                e.printStackTrace();
                return;
            }

            Log.d(LCAT, response.toString());

            if (onChannelSelected != null) {
                PluginResult result = new PluginResult(PluginResult.Status.OK, response);

                result.setKeepCallback(true);

                onChannelSelected.sendPluginResult(result);
            }

        }
    }

    protected class CreditHistoryListener implements Branch.BranchListResponseListener
    {
        // Listener that implements BranchListResponseListener for getCreditHistory()
        @Override
        public void onReceivingResponse(JSONArray list, BranchError error) {

            Log.d(LCAT, "inside onReceivingResponse");

            JSONObject response = new JSONObject();

            if (error == null) {

                JSONArray data = new JSONArray();

                if (list != null) {

                    for (int i = 0, limit = list.length(); i < limit; ++i) {

                        JSONObject entry;

                        try {
                            entry = list.getJSONObject(i);
                            data.put(entry);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            return;
                        }

                    }

                }

                callbackContext.success(data);

            } else {

                response = new JSONObject();

                String errorMessage = error.getMessage();

                Log.d(LCAT, errorMessage);

                callbackContext.error(errorMessage);

            }
        }
    }

}
