const fs = require('fs');

// Read the extracted modals
const modalsHtml = fs.readFileSync('modals.html', 'utf-8');

// The full vanilla JS interactivity script
const vanillaJS = `
<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var loginWrapper = document.getElementById('login-modal-wrapper');
    var createAccountWrapper = document.getElementById('create-account-modal-wrapper');
    var chatWrapper = document.getElementById('chat-widget-wrapper');

    /* ─── HELPER: open / close modals ─── */
    function openLogin() { loginWrapper.style.display = 'block'; document.body.style.overflow = 'hidden'; }
    function openCreateAccount() { createAccountWrapper.style.display = 'block'; document.body.style.overflow = 'hidden'; }
    function closeAll() {
      loginWrapper.style.display = 'none';
      createAccountWrapper.style.display = 'none';
      document.body.style.overflow = '';
    }

    /* ─── Wire ALL Log In buttons ─── */
    document.querySelectorAll('button').forEach(function(btn) {
      var t = btn.textContent.trim();
      if (t === 'Log In' || t === 'Already a member? Log In' || t === 'Open My Learning') {
        btn.addEventListener('click', function(e) { e.preventDefault(); openLogin(); });
      }
      if (
        t === 'Create Account' ||
        t === 'Create Free Account' ||
        t === 'Explore Membership Options' ||
        t === 'Choose Premium Monthly' ||
        t === 'Choose Premium Yearly' ||
        t === 'Explore Certificate Programs' ||
        t === 'Browse Individual Courses'
      ) {
        btn.addEventListener('click', function(e) { e.preventDefault(); openCreateAccount(); });
      }
    });

    /* ─── Modal overlay click-outside-to-close ─── */
    [loginWrapper, createAccountWrapper].forEach(function(wrapper) {
      if (!wrapper) return;
      wrapper.addEventListener('click', function(e) {
        if (e.target === wrapper || e.target.classList.contains('modal-overlay')) closeAll();
      });
    });

    /* ─── Close buttons (✕) inside modals ─── */
    document.querySelectorAll('.modal-close-btn').forEach(function(btn) {
      btn.addEventListener('click', closeAll);
    });

    /* ─── Switch links inside modals ─── */
    var switchToSignupBtn = loginWrapper ? loginWrapper.querySelector('.new-account-box button') : null;
    if (switchToSignupBtn) {
      switchToSignupBtn.addEventListener('click', function() { closeAll(); openCreateAccount(); });
    }

    /* ─── Escape key closes modals ─── */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeAll();
    });

    /* ─── CHAT WIDGET ─── */
    // The closed/bubble state is the .chat-widget rendered in the page body
    // The open panel state is inside #chat-widget-wrapper
    var allChatWidgets = document.querySelectorAll('.chat-widget');
    var closedChatWidget = null;
    allChatWidgets.forEach(function(w) {
      if (!w.closest('#chat-widget-wrapper')) closedChatWidget = w;
    });

    if (closedChatWidget) {
      var openBtn = closedChatWidget.querySelector('.chat-btn');
      var bubble = closedChatWidget.querySelector('.chat-bubble');
      var closeX = bubble ? bubble.querySelector('.close') : null;

      if (openBtn) {
        openBtn.addEventListener('click', function() {
          closedChatWidget.style.display = 'none';
          chatWrapper.style.display = 'block';
        });
      }
      if (closeX) {
        closeX.addEventListener('click', function(e) {
          e.stopPropagation();
          if (bubble) bubble.style.display = 'none';
        });
      }
    }

    if (chatWrapper) {
      var minimizeBtn = chatWrapper.querySelector('.chat-btn');
      if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
          chatWrapper.style.display = 'none';
          if (closedChatWidget) closedChatWidget.style.display = 'block';
        });
      }

      // Chat nav: home / messages view toggle
      var chatPanel = chatWrapper.querySelector('.chat-panel');
      var navBtns = chatWrapper.querySelectorAll('.chat-nav-btn');
      navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          navBtns.forEach(function(b) { b.classList.remove('active'); b.classList.add('dim'); });
          btn.classList.remove('dim'); btn.classList.add('active');
        });
      });

      // New Conversation button inside chat panel
      var convCards = chatWrapper.querySelectorAll('.chat-conv-card');
      convCards.forEach(function(card) {
        card.addEventListener('click', function() {
          // Show a simple input in the chat body
          var body = chatWrapper.querySelector('.chat-body');
          if (body) {
            body.innerHTML = '<div class="chat-thread"><div class="chat-empty" style="padding:40px 20px">No messages yet — start the conversation below.</div></div>';
            var inputBar = document.createElement('div');
            inputBar.className = 'chat-input-bar';
            inputBar.innerHTML = '<input placeholder="If our AI IT Assistant can\\'t answer your question, leave a message with your email in this box." /><div class="chat-input-icons"><button aria-label="Rate"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.3a2 2 0 0 0 2-1.7l1.4-9a2 2 0 0 0-2-2.3z"></path><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></button></div>';
            chatPanel.appendChild(inputBar);
            var inp = inputBar.querySelector('input');
            inp.addEventListener('keydown', function(e) {
              if (e.key === 'Enter' && inp.value.trim()) {
                var thread = body.querySelector('.chat-thread');
                var msg = document.createElement('div');
                msg.className = 'chat-msg user';
                msg.textContent = inp.value.trim();
                thread.appendChild(msg);
                inp.value = '';
                setTimeout(function() {
                  var reply = document.createElement('div');
                  reply.className = 'chat-msg bot';
                  reply.textContent = 'Thanks for reaching out! Our AI IT Assistant is reviewing your question and will reply in a few minutes.';
                  thread.appendChild(reply);
                  thread.scrollTop = thread.scrollHeight;
                }, 700);
              }
            });
          }
        });
      });
    }
  });
})();
</script>
`;

function inject(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // 1. Remove any existing <script> block we added previously
  content = content.replace(/<script>[\s\S]*?<\/script>\s*<\/body>/, '</body>');

  // 2. Remove old modals-container if re-injecting
  content = content.replace(/<div id="modals-container">[\s\S]*?<\/div>\s*(<\/body>)/, '$1');

  // 3. Inject before </body>
  content = content.replace('</body>', modalsHtml + '\n' + vanillaJS + '\n</body>');

  fs.writeFileSync(file, content);
  console.log('Injected into ' + file);
}

inject('index.html');
inject('programs.html');
console.log('Done!');
