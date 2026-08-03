import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'fs';
import { LoginModal, CreateAccountModal, ChatWidget } from './App';

// Render Login modal
const loginHtml = renderToStaticMarkup(
  <LoginModal isOpen={true} onClose={() => {}} onSwitchToSignup={() => {}} />
);

// Render Create Account - Step 1 (Plan picker)
const createAccountStep1Html = renderToStaticMarkup(
  <CreateAccountModal isOpen={true} onClose={() => {}} onSwitchToLogin={() => {}} onGoPrograms={() => {}} />
);

// Render Chat Widget (open state)
const chatWidgetHtml = renderToStaticMarkup(<ChatWidget />);

fs.writeFileSync('../../modals.html', `
<div id="modals-container">
  <!-- LOGIN MODAL -->
  <div id="login-modal-wrapper" style="display: none;">
    ${loginHtml}
  </div>
  <!-- CREATE ACCOUNT MODAL (step 1 = plan selector, step 2 = register form) -->
  <div id="create-account-modal-wrapper" style="display: none;">
    ${createAccountStep1Html}
  </div>
  <!-- CHAT WIDGET PANEL (open state) -->
  <div id="chat-widget-wrapper" style="display: none;">
    ${chatWidgetHtml}
  </div>
</div>
`);
console.log("Extracted modals!");
