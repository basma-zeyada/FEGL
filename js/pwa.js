
// Initialize deferredPrompt for use later to show browser install prompt.
var deferredPrompt;
var ua = navigator.userAgent;

function promotePWAInstallation(){
  // Hide the app provided install promotion
  $(".pwa-banner").addClass("hidden")
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
    ua.indexOf("iPhone") !== -1 &&
    ua.indexOf("Safari") !== -1 &&
    ua.indexOf("CriOS") === -1 &&
    ua.indexOf("FxiOS") === -1
  );

  if(isSafari){
    $(".ios-pwa-modal").removeClass("hidden")
  }

  window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI and show the customized install App promotion
  if(!isSafari){
    $(".pwa-banner").removeClass("hidden")
  }
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
