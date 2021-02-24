
// Initialize deferredPrompt for use later to show browser install prompt.
var deferredPrompt;
var ua = navigator.userAgent.toLowerCase();

function promotePWAInstallation(){
  // Hide the app provided install promotion
  $("#inAppInstallBannerg").hide().addClass("hidden")
  // Show the install prompt
  deferredPrompt.prompt();
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null;
}

function updateOnlineStatus(){
  $(".offline").toggleClass("display-none")
}

$(function(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  // show pwa popup only on safari - ios
  var isSafari = (
    ua.indexOf("iphone") !== -1 &&
    ua.indexOf("safari") !== -1 &&
    ua.indexOf("crios") === -1 &&
    ua.indexOf("fxios") === -1
  );

  function isIos () {
    return /iphone|ipad|ipod/.test(ua);
  };

  if(isSafari && isIos){
    $("#ios-pwa-modal").show().removeClass("hidden")
  }

  window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI and show the customized install App promotion
    $("#inAppInstallBanner").show().removeClass("hidden")
  });

  window.addEventListener('appinstalled', () => {
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
   });

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
})
