const fs = require('fs');

const modalsHTML = fs.readFileSync('modals.html', 'utf-8');

const jsScript = `
<script>
  // Simple script to toggle modals
  document.addEventListener('DOMContentLoaded', () => {
    const loginWrapper = document.getElementById('login-modal-wrapper');
    const createAccountWrapper = document.getElementById('create-account-modal-wrapper');
    const chatWrapper = document.getElementById('chat-widget-wrapper');
    
    // The chat widget HTML actually has both the open and closed state?
    // Wait, the modalsHTML only has the open state for the chat widget!
    // That's fine, we will just use the modals for Login and Create Account
    // and let them handle the chat widget.
    
    // For now, let's just make the modals work.
    
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Log In') || btn.textContent.includes('Already a member')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          loginWrapper.style.display = 'block';
        });
      }
      if (btn.textContent.includes('Create Account') || btn.textContent.includes('Create Free Account') || btn.textContent.includes('Create a free')) {
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
  });
</script>
`;

function inject(file) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Find where to inject: just before </div></body></html>
  // Specifically, find the closing of id="root"
  // The structure is <div id="root">...</div>
  // We can just inject before </body>
  
  // First, remove the old chat-widget if it exists
  content = content.replace(/<div class="chat-widget">.*?<\/svg><\/button><\/div>/, '');
  
  content = content.replace('</body>', modalsHTML + jsScript + '</body>');
  fs.writeFileSync(file, content);
  console.log('Injected into ' + file);
}

inject('index.html');
inject('programs.html');
