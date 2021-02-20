
// Initialize deferredPrompt for use later to show browser install prompt.
var deferredPrompt;

function promotePWAInstallation(){
  // Hide the app provided install promotion
  $(".pwa-banner").addClass("hidden")
  // Show the install prompt
  deferredPrompt.prompt();
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null;
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

  window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI and show the customized install App promotion
  $(".pwa-banner").removeClass("hidden")
  });
})
