/* DoseCare V2 — PWA bootstrap + iPhone installation helper. */
(function () {
  'use strict';

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function isStandalone() {
    return window.matchMedia && window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
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

  function addIOSInstallUI() {
    if (!isIOS() || isStandalone()) return;
    if (document.getElementById('dosecare-ios-install')) return;

    var rtl = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
    var text = rtl ? {
      button: 'تثبيت على iPhone',
      title: 'تثبيت DoseCare على iPhone',
      intro: 'ثبّتي DoseCare على الشاشة الرئيسية واستخدميه مثل التطبيق.',
      step1: 'اضغطي زر المشاركة في Safari.',
      step2: 'اختاري «إضافة إلى الشاشة الرئيسية».',
      step3: 'فعّلي «فتح كتطبيق ويب» إذا ظهر الخيار.',
      step4: 'اضغطي «إضافة».',
      close: 'إغلاق'
    } : {
      button: 'Install on iPhone',
      title: 'Install DoseCare on iPhone',
      intro: 'Add DoseCare to your Home Screen and use it like an app.',
      step1: 'Tap the Share button in Safari.',
      step2: 'Choose “Add to Home Screen”.',
      step3: 'Turn on “Open as Web App” if shown.',
      step4: 'Tap “Add”.',
      close: 'Close'
    };

    var style = document.createElement('style');
    style.id = 'dosecare-ios-install-style';
    style.textContent = '#dosecare-ios-install{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9998;border:1px solid rgba(220,230,255,.28);border-radius:999px;padding:11px 18px;background:linear-gradient(135deg,rgba(38,49,135,.94),rgba(104,91,205,.94));color:#fff;font:600 14px Georgia,"Times New Roman",serif;box-shadow:0 12px 34px rgba(5,10,45,.38),0 0 24px rgba(130,120,255,.18);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);cursor:pointer}#dosecare-ios-install:active{transform:translateX(-50%) scale(.97)}#dosecare-ios-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:22px;background:rgba(3,7,25,.66);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}.dosecare-ios-modal{width:min(430px,92vw);border:1px solid rgba(220,230,255,.24);border-radius:24px;padding:24px;background:linear-gradient(145deg,rgba(13,27,66,.96),rgba(36,35,91,.96));color:#eef4ff;box-shadow:0 24px 70px rgba(0,0,0,.42);font-family:Georgia,"Times New Roman",serif}.dosecare-ios-modal h2{margin:0 0 10px;font-size:24px}.dosecare-ios-modal p{margin:0 0 16px;line-height:1.55;color:#cdd9ef}.dosecare-ios-modal ol{margin:0;padding-inline-start:24px;line-height:1.75}.dosecare-ios-modal li{margin:5px 0}.dosecare-ios-close{margin-top:20px;width:100%;padding:11px 14px;border:1px solid rgba(220,230,255,.24);border-radius:12px;background:rgba(255,255,255,.08);color:#eef4ff;font:600 14px Georgia,"Times New Roman",serif}';
    document.head.appendChild(style);

    var button = document.createElement('button');
    button.id = 'dosecare-ios-install';
    button.type = 'button';
    button.textContent = text.button;
    button.setAttribute('aria-label', text.button);

    button.addEventListener('click', function () {
      var overlay = document.createElement('div');
      overlay.id = 'dosecare-ios-overlay';
      overlay.innerHTML = '<section class="dosecare-ios-modal" role="dialog" aria-modal="true" aria-labelledby="dosecare-ios-title">' +
        '<h2 id="dosecare-ios-title">' + text.title + '</h2>' +
        '<p>' + text.intro + '</p>' +
        '<ol><li>' + text.step1 + '</li><li>' + text.step2 + '</li><li>' + text.step3 + '</li><li>' + text.step4 + '</li></ol>' +
        '<button type="button" class="dosecare-ios-close">' + text.close + '</button>' +
        '</section>';
      document.body.appendChild(overlay);
      var close = overlay.querySelector('.dosecare-ios-close');
      close.addEventListener('click', function () { overlay.remove(); });
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

  if (isIOS()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addIOSInstallUI);
    } else {
      addIOSInstallUI();
    }
  }
})();
