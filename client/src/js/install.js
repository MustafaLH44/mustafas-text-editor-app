const butInstall = document.getElementById('buttonInstall');



// Logic for installing the PWA
let deferredPrompt;

// Save the event & show the install button when the `beforeinstallprompt` event is fired
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing
  event.preventDefault();

  // Save the event so it can be triggered later
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;

  // Hide the install button after the user makes a choice
  butInstall.style.display = 'none';

  // Clear the deferred prompt variable, since it can only be used once
  deferredPrompt = null;

  console.log(`User response to the install prompt: ${outcome}`);
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed', event);

  // Optionally, hide the install button after the app is installed
  butInstall.style.display = 'none';
});

