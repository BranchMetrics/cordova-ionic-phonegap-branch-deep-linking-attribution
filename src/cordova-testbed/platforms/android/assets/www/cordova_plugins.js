cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/de.appplant.cordova.plugin.email-composer/www/email_composer.js",
        "id": "de.appplant.cordova.plugin.email-composer.EmailComposer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    },
    {
        "file": "plugins/io.branch.sdk/dist/cordova/build.js",
        "id": "io.branch.sdk.branch",
        "clobbers": [
            "branch",
            "Branch"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "de.appplant.cordova.plugin.email-composer": "0.8.2",
    "io.branch.sdk": "1.5.8",
    "org.apache.cordova.console": "0.2.13"
}
// BOTTOM OF METADATA
});