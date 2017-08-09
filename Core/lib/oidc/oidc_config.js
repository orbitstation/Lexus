(function () {
    var config = {
        authority: "https://sso.monster.com/core",
        client_id: "Lexus", 
        login_hint: function() {
            return window.localStorage.getItem('login_hint');
        },
        redirect_uri: window.location.protocol + "//" + window.location.host + '/Account/LoginCallback',
        post_logout_redirect_uri: window.location.protocol + "//" + window.location.host,
        persist: true,
        load_user_profile: true,
        scope: "openid",
        response_type: "code id_token token",
        // these two will be done dynamically from the buttons clicked
        //response_type: "id_token token",

        // we're not using these in this sample
        silent_redirect_uri: window.location.protocol + "//" + window.location.host + '/Account/RenewCallback',
        silent_renew: true,

        // this will allow all the OIDC protocol claims to vbe visible in the window. normally a client app
        // wouldn't care about them or want them taking up space
        filter_protocol_claims: false
    };
    window.mgr = new OidcTokenManager(config);
})();