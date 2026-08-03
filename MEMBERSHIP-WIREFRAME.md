# Week 5 Membership Page Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ JOIN JOBSKILLSHARE                                                        │
│ Choose how you want to learn                                              │
│  1 Choose a plan ───── 2 Secure checkout ───── 3 Start learning          │
├─────────────────────────────────────────────────────────────────────────┤
│ Select your membership                                                    │
│ [ 60,000+ members ] [ 120+ countries ] [ Secure Stripe checkout ]        │
│                                                                         │
│ ┌ Free Access ┐  ┌ Premium Monthly ┐  ┌ Premium Yearly / Best Value ┐    │
│ │ $0 / 3 mo   │  │ $50 / month     │  │ $549 / year                 │    │
│ │ • courses   │  │ • all programs  │  │ • all programs              │    │
│ │ • portal    │  │ • labs          │  │ • labs + AI tools           │    │
│ │ [Create]    │  │ [Choose]        │  │ [Choose]                    │    │
│ └─────────────┘  └─────────────────┘  └─────────────────────────────────┘
├─────────────────────────────────────────────────────────────────────────┤
│ Step 2: Full name | Email | Password | Terms                             │
│         Paid plan only: payment information                              │
│                         [Continue to Secure Enrollment]                  │
└─────────────────────────────────────────────────────────────────────────┘
```

The implemented version is the existing **Create Account** membership modal in `index.html` / `replicate-landing-page-from-images/src/App.tsx`. The wireframe retains its three-step flow, while making trust information and plan benefits visible before users begin registration.
