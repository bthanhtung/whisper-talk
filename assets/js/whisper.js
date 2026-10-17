/* Whisper Talk - hành vi giao diện, không phụ thuộc thư viện */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  /* --- header đổ bóng khi cuộn, thanh tiến độ đọc --- */
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('[data-progress]');
  var post = document.querySelector('[data-post]');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      if (bar && post) {
        var r = post.getBoundingClientRect();
        var total = r.height - window.innerHeight * 0.6;
        var p = Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1)));
        bar.style.transform = 'scaleX(' + p + ')';
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- sáng / tối --- */
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('wt-theme', next);
    });
  });

  /* --- menu điện thoại --- */
  var nav = document.querySelector('.nav');
  var menuBtn = document.querySelector('[data-menu-toggle]');
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* --- cỡ chữ bài viết --- */
  var sizes = ['1.0625rem', '1.1875rem', '1.3125rem', '1.4375rem'];
  var fontBtns = document.querySelectorAll('[data-font]');
  if (fontBtns.length) {
    var cur = sizes.indexOf(store('wt-font'));
    if (cur < 0) cur = 1;
    fontBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var d = +b.getAttribute('data-font');
        cur = d === 0 ? 1 : Math.min(sizes.length - 1, Math.max(0, cur + d));
        root.style.setProperty('--prose-size', sizes[cur]);
        store('wt-font', cur === 1 ? null : sizes[cur]);
        if (cur === 1) root.style.removeProperty('--prose-size');
      });
    });
  }

  /* --- chia sẻ ---
     Máy tính: mở link chia sẻ Facebook như thường.
     Điện thoại: dùng bảng chia sẻ của máy (chọn Facebook, Zalo, Messenger... là mở thẳng app).
     Trình duyệt nhúng trong app (Facebook, Zalo...) thường không có bảng chia sẻ:
     khi đó chép sẵn đường dẫn và nhắc người đọc dán vào, thay vì mở trang Facebook mobile. */
  function isMobile() {
    var ua = navigator.userAgent || '';
    return /Android|iPhone|iPad|iPod|Mobile|FBAN|FBAV|Zalo|Instagram|Line\//i.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  }
  function toast(msg) {
    var t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('is-on'); }, 3800);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, fail) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? ok() : fail(); } catch (e) { fail(e); }
      document.body.removeChild(ta);
    });
  }
  function shareFallback(url) {
    copyText(url).then(function () {
      toast('Đã chép đường dẫn bài viết. Mở Facebook, Zalo hoặc Messenger rồi dán vào để chia sẻ nhé.');
    }, function () {
      window.prompt('Chép đường dẫn này để chia sẻ:', url);
    });
  }
  document.querySelectorAll('[data-share]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!isMobile()) return; // máy tính: đi theo link Facebook
      e.preventDefault();
      var url = a.getAttribute('data-share-url');
      var title = a.getAttribute('data-share-title');
      if (navigator.share) {
        navigator.share({ title: title, text: title, url: url }).catch(function (err) {
          if (err && err.name === 'AbortError') return; // người đọc tự đóng bảng chia sẻ
          shareFallback(url);
        });
      } else {
        shareFallback(url);
      }
    });
  });

  /* --- lên đầu trang --- */
  document.querySelectorAll('[data-to-top]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* --- ủng hộ từ thiện: hộp thoại + mã VietQR --- */
  // Chuỗi VietQR theo chuẩn EMVCo của Napas: mã ngân hàng (BIN) + số tài khoản.
  function tlv(id, v) { return id + (v.length < 10 ? '0' : '') + v.length + v; }
  function crc16(str) {
    var crc = 0xFFFF;
    for (var i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
    return ('0000' + crc.toString(16).toUpperCase()).slice(-4);
  }
  function vietQR(bin, acc) {
    var merchant = tlv('00', 'A000000727') + tlv('01', tlv('00', bin) + tlv('01', acc)) + tlv('02', 'QRIBFTTA');
    var p = tlv('00', '01') + tlv('01', '11') + tlv('38', merchant) + tlv('53', '704') + tlv('58', 'VN') +
      tlv('62', tlv('08', 'UNG HO TU THIEN')) + '6304';
    return p + crc16(p);
  }
  window.WT.vietQR = vietQR;
  var qrLib = null;
  function loadQR() {
    if (qrLib) return qrLib;
    qrLib = new Promise(function (ok, fail) {
      var sc = document.createElement('script');
      sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
      sc.onload = ok; sc.onerror = fail;
      document.head.appendChild(sc);
    });
    return qrLib;
  }
  var donate = document.querySelector('[data-donate]');
  if (donate) {
    var lastF = null;
    var openD = function () {
      lastF = document.activeElement;
      donate.hidden = false;
      document.body.style.overflow = 'hidden';
      donate.querySelector('.donate-x').focus();
      loadQR().then(function () {
        donate.querySelectorAll('[data-qr]').forEach(function (el) {
          if (el.firstChild) return;
          var q = window.qrcode(0, 'M');
          q.addData(vietQR(el.getAttribute('data-bin'), el.getAttribute('data-acc')));
          q.make();
          el.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
        });
      }, function () {
        donate.querySelectorAll('[data-qr]').forEach(function (el) { el.textContent = 'Không tải được mã QR, bạn dùng số tài khoản bên cạnh nhé.'; });
      });
    };
    var closeD = function () {
      donate.hidden = true;
      document.body.style.overflow = '';
      if (lastF) lastF.focus();
    };
    document.querySelectorAll('[data-donate-open]').forEach(function (b) { b.addEventListener('click', openD); });
    donate.querySelectorAll('[data-donate-close]').forEach(function (b) { b.addEventListener('click', closeD); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !donate.hidden) closeD(); });
  }

  /* --- chép đường dẫn --- */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var label = b.querySelector('[data-copy-label]');
      var done = function () {
        if (!label) return;
        var old = label.textContent;
        label.textContent = 'Đã chép';
        setTimeout(function () { label.textContent = old; }, 1600);
      };
      var text = b.getAttribute('data-copy');
      copyText(text).then(done, function () { window.prompt('Chép:', text); });
    });
  });

  /* --- hiện dần khi cuộn tới --- */
  var items = document.querySelectorAll('.card, .lead, .topic, .pick-list li');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* --- chỉ mục bài viết (tìm kiếm + mở bài ngẫu nhiên) --- */
  var index = null;
  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch(window.WT.searchUrl).then(function (r) { return r.json(); }).then(function (d) {
      index = d.map(function (p) {
        p.nt = fold(p.t); p.nx = fold(p.x);
        return p;
      });
      return index;
    });
  }
  // bỏ dấu để gõ "ma" vẫn ra "má", "mẹ" ra "me"
  function fold(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }

  document.querySelectorAll('[data-random]').forEach(function (b) {
    b.addEventListener('click', function () {
      loadIndex().then(function (list) {
        var here = location.pathname;
        var pool = list.filter(function (p) { return p.u !== here; });
        var pick = pool[Math.floor(Math.random() * pool.length)];
        if (pick) location.href = pick.u;
      });
    });
  });

  /* --- tìm kiếm --- */
  var box = document.querySelector('[data-search]');
  if (!box) return;
  var input = box.querySelector('[data-search-input]');
  var list = box.querySelector('[data-search-results]');
  var hint = box.querySelector('[data-search-hint]');
  var active = -1;
  var lastFocus = null;

  function openSearch() {
    lastFocus = document.activeElement;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    input.focus();
    input.select();
    loadIndex();
  }
  function closeSearch() {
    box.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // so khớp trọn âm tiết: "ma" khớp "má" nhưng không khớp "màn"
  function wordRe(w) {
    return new RegExp('(^|[^a-z0-9])(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?=[^a-z0-9]|$)');
  }
  function findWord(text, w) {
    var m = wordRe(w).exec(text);
    return m ? m.index + m[1].length : -1;
  }

  function snippet(p, q) {
    var i = findWord(p.nx, q);
    if (i < 0) return esc(p.x.slice(0, 140)) + '…';
    var s = Math.max(0, i - 60), e = Math.min(p.x.length, i + q.length + 80);
    return (s > 0 ? '…' : '') + esc(p.x.slice(s, i)) + '<mark>' + esc(p.x.slice(i, i + q.length)) + '</mark>' + esc(p.x.slice(i + q.length, e)) + '…';
  }

  function render() {
    var raw = input.value.trim();
    var q = fold(raw);
    active = -1;
    if (q.length < 2) {
      list.innerHTML = '';
      hint.hidden = false;
      hint.textContent = 'Gõ không dấu cũng được, "ma" vẫn ra "má".';
      return;
    }
    loadIndex().then(function (all) {
      var words = q.split(/\s+/);
      var phrase = words.length > 1 ? q : null;
      var res = all.map(function (p) {
        var score = 0;
        for (var i = 0; i < words.length; i++) {
          var w = words[i];
          var inT = findWord(p.nt, w) > -1, inX = findWord(p.nx, w) > -1;
          if (!inT && !inX) return null;
          score += (inT ? 10 : 0) + (inX ? 1 : 0);
        }
        if (phrase) {
          if (findWord(p.nt, phrase) > -1) score += 40;
          if (findWord(p.nx, phrase) > -1) score += 20;
        }
        return { p: p, s: score };
      }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 8);

      if (!res.length) {
        list.innerHTML = '';
        hint.hidden = false;
        hint.textContent = 'Chưa có bài nào nhắc tới "' + raw + '". Thử một chữ khác xem.';
        return;
      }
      hint.hidden = true;
      list.innerHTML = res.map(function (r) {
        return '<li><a href="' + r.p.u + '"><span class="sr-title">' + esc(r.p.t) + '</span><span class="sr-meta">' + r.p.d + '</span><span class="sr-snip">' + snippet(r.p, phrase && findWord(r.p.nx, phrase) > -1 ? phrase : words[0]) + '</span></a></li>';
      }).join('');
    });
  }

  function move(d) {
    var links = list.querySelectorAll('a');
    if (!links.length) return;
    if (active > -1) links[active].classList.remove('is-active');
    active = (active + d + links.length) % links.length;
    links[active].classList.add('is-active');
    links[active].scrollIntoView({ block: 'nearest' });
  }

  var t;
  input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(render, 90); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') {
      var links = list.querySelectorAll('a');
      var target = links[active > -1 ? active : 0];
      if (target) location.href = target.href;
    }
  });
  document.querySelectorAll('[data-search-open]').forEach(function (b) { b.addEventListener('click', openSearch); });
  box.querySelectorAll('[data-search-close]').forEach(function (b) { b.addEventListener('click', closeSearch); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !box.hidden) closeSearch();
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && box.hidden && tag !== 'input' && tag !== 'textarea') { e.preventDefault(); openSearch(); }
  });
})();
