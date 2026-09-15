/* DoseCare V2 — PWA bootstrap + cross-platform installation helper. */
(function () {
  'use strict';

  var deferredInstallPrompt = null;

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
      window.navigator.standalone === true;
  }

  function isRTL() {
    return document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
  }

  function addAppleMeta() {
    var tags = [
      ['apple-mobile-web-app-capable', 'yes'],
      ['apple-mobile-web-app-status-bar-style', 'black-translucent'],
      ['apple-mobile-web-app-title', 'DoseCare']
    ];
    tags.forEach(function (pair) {
      if (document.querySelector('meta[name="' + pair[0] + '"]')) return;
      var meta = document.createElement('meta');
      meta.name = pair[0];
      meta.content = pair[1];
      document.head.appendChild(meta);
    });
  }

  function installStyles() {
    if (document.getElementById('dosecare-install-style')) return;
    var style = document.createElement('style');
    style.id = 'dosecare-install-style';
    style.textContent = '#dosecare-install{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9998;border:1px solid rgba(220,230,255,.28);border-radius:999px;padding:11px 18px;background:linear-gradient(135deg,rgba(38,49,135,.94),rgba(104,91,205,.94));color:#fff;font:600 14px Georgia,"Times New Roman",serif;box-shadow:0 12px 34px rgba(5,10,45,.38),0 0 24px rgba(130,120,255,.18);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);cursor:pointer}#dosecare-install:active{transform:translateX(-50%) scale(.97)}#dosecare-install-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(3,7,25,.66);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}.dosecare-install-modal{width:min(430px,92vw);border:1px solid rgba(220,230,255,.24);border-radius:24px;padding:24px;background:linear-gradient(145deg,rgba(13,27,66,.96),rgba(36,35,91,.96));color:#eef4ff;box-shadow:0 24px 70px rgba(0,0,0,.42);font-family:Georgia,"Times New Roman",serif}.dosecare-install-modal h2{margin:0 0 10px;font-size:24px}.dosecare-install-modal p{margin:0 0 16px;line-height:1.55;color:#cdd9ef}.dosecare-install-modal ol{margin:0;padding-inline-start:24px;line-height:1.75}.dosecare-install-modal li{margin:5px 0}.dosecare-install-close{margin-top:20px;width:100%;padding:11px 14px;border:1px solid rgba(220,230,255,.24);border-radius:12px;background:rgba(255,255,255,.08);color:#eef4ff;font:600 14px Georgia,"Times New Roman",serif}';
    document.head.appendChild(style);
  }

  function addInstallButton(kind) {
    if (isStandalone() || document.getElementById('dosecare-install')) return;
    if (kind === 'android' && !deferredInstallPrompt) return;

    installStyles();
    var rtl = isRTL();
    var text = kind === 'android' ?
      (rtl ? { button: 'تثبيت DoseCare', title: 'تثبيت DoseCare', intro: 'ثبّتي DoseCare على جهازك واستخدميه مثل التطبيق.', action: 'تثبيت', close: 'إغلاق' } :
        { button: 'Install DoseCare', title: 'Install DoseCare', intro: 'Install DoseCare on your device and use it like an app.', action: 'Install', close: 'Close' }) :
      (rtl ? { button: 'تثبيت على iPhone', title: 'تثبيت DoseCare على iPhone', intro: 'ثبّتي DoseCare على الشاشة الرئيسية واستخدميه مثل التطبيق.', action: null, close: 'إغلاق' } :
        { button: 'Install on iPhone', title: 'Install DoseCare on iPhone', intro: 'Add DoseCare to your Home Screen and use it like an app.', action: null, close: 'Close' });

    var button = document.createElement('button');
    button.id = 'dosecare-install';
    button.type = 'button';
    button.textContent = text.button;
    button.setAttribute('aria-label', text.button);

    button.addEventListener('click', function () {
      if (kind === 'android' && deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then(function () {
          deferredInstallPrompt = null;
          button.remove();
        }).catch(function () {});
        return;
      }

      var overlay = document.createElement('div');
      overlay.id = 'dosecare-install-overlay';
      var steps = rtl ? [
        'اضغطي زر المشاركة في Safari.',
        'اختاري «إضافة إلى الشاشة الرئيسية».',
        'فعّلي «فتح كتطبيق ويب» إذا ظهر الخيار.',
        'اضغطي «إضافة».'
      ] : [
        'Tap the Share button in Safari.',
        'Choose “Add to Home Screen”.',
        'Turn on “Open as Web App” if shown.',
        'Tap “Add”.'
      ];
      overlay.innerHTML = '<section class="dosecare-install-modal" role="dialog" aria-modal="true" aria-labelledby="dosecare-install-title">' +
        '<h2 id="dosecare-install-title">' + text.title + '</h2>' +
        '<p>' + text.intro + '</p>' +
        '<ol><li>' + steps[0] + '</li><li>' + steps[1] + '</li><li>' + steps[2] + '</li><li>' + steps[3] + '</li></ol>' +
        '<button type="button" class="dosecare-install-close">' + text.close + '</button>' +
        '</section>';
      document.body.appendChild(overlay);
      overlay.querySelector('.dosecare-install-close').addEventListener('click', function () { overlay.remove(); });
      overlay.addEventListener('click', function (event) {
        if (event.target === overlay) overlay.remove();
      });
    });

    document.body.appendChild(button);
  }

  addAppleMeta();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(function (registration) {
          console.info('DoseCare offline mode ready.', registration.scope);
        })
        .catch(function (error) {
          console.warn('DoseCare offline mode could not start:', error);
        });
    });
  }

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (!isIOS() && !isStandalone()) addInstallButton('android');
  });

  window.addEventListener('appinstalled', function () {
    deferredInstallPrompt = null;
    var button = document.getElementById('dosecare-install');
    if (button) button.remove();
  });

  if (isIOS()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { addInstallButton('ios'); });
    } else {
      addInstallButton('ios');
    }
  }
})();
