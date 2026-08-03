const fs = require('fs');

const jsScript = `
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const loginWrapper = document.getElementById('login-modal-wrapper');
    const createAccountWrapper = document.getElementById('create-account-modal-wrapper');
    
    // Auth modals toggle
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim();
      if (text === 'Log In' || text.includes('Already a member')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          loginWrapper.style.display = 'block';
        });
      }
      if (text === 'Create Account' || text.includes('Create Free Account') || text.includes('Create a free')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          createAccountWrapper.style.display = 'block';
        });
      }
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        loginWrapper.style.display = 'none';
        createAccountWrapper.style.display = 'none';
      });
    });
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          loginWrapper.style.display = 'none';
          createAccountWrapper.style.display = 'none';
        }
      });
    });

    // Chat widget toggle
    // original chat (closed state) is directly in body/root
    const originalChat = document.querySelector('#root > .chat-widget') || Array.from(document.querySelectorAll('.chat-widget')).find(el => !el.closest('#chat-widget-wrapper'));
    const openChatWrapper = document.getElementById('chat-widget-wrapper');
    
    if (originalChat && openChatWrapper) {
      const openBtn = originalChat.querySelector('.chat-btn');
      if (openBtn) {
        openBtn.addEventListener('click', () => {
          originalChat.style.display = 'none';
          openChatWrapper.style.display = 'block';
        });
      }
      
      const closeBtn = openChatWrapper.querySelector('.chat-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          openChatWrapper.style.display = 'none';
          originalChat.style.display = 'block';
        });
      }
      
      // close bubble
      const closeBubble = originalChat.querySelector('.chat-bubble .close');
      if (closeBubble) {
        closeBubble.addEventListener('click', (e) => {
          e.stopPropagation();
          originalChat.querySelector('.chat-bubble').style.display = 'none';
        });
      }
    }
  });
</script>
`;

function update(file) {
  let content = fs.readFileSync(file, 'utf-8');
  // replace the old script
  content = content.replace(/<script>[\s\S]*?<\/script>/, jsScript);
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}

update('index.html');
update('programs.html');
