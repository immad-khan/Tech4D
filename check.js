const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const checks = {
  'Login modal exists': html.includes('id="login-modal-wrapper"'),
  'Create Account modal exists': html.includes('id="create-account-modal-wrapper"'),
  'Chat widget open state exists': html.includes('id="chat-widget-wrapper"'),
  'Chat button closed state in page': html.includes('chat-btn'),
  'JS event script present': html.includes('DOMContentLoaded'),
  'Log In button present': html.includes('>Log In<'),
  'Create Account button present': html.includes('>Create Account<'),
  'Modal close buttons present': html.includes('modal-close-btn'),
  '3 plan cards present': (html.match(/class="plan2"/g) || []).length >= 3,
  'Step 2 registration form present': html.includes('modal-register'),
  'Chat conv card present': html.includes('chat-conv-card'),
};

Object.entries(checks).forEach(([name, pass]) => {
  console.log((pass ? 'PASS' : 'FAIL') + ': ' + name);
});
