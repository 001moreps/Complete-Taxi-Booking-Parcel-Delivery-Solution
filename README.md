# MoRepS — Mobile Repairs & Sales

MoRepS is an on-the-go technology repair and sales platform being built for Ghana.

## Current build

The `moreps-production-build` branch contains the first production architecture foundation:

- Ionic + Angular customer application
- Home / Store / History / Profile navigation
- Guided repair-request flow
- Dynamic Firestore catalogue service layer
- Repair job and quote models
- Callable Cloud Functions for repair-request creation, job transitions and quote acceptance
- Firestore security rules with server-controlled job/quote mutations
- Firebase Functions project structure
- MoRepS Capacitor identity

## Product architecture

Business-state writes follow:

**UI → Angular service → Callable Cloud Function → Firestore**

Read-only catalogue and job data can use Firestore real-time listeners.

The platform is designed around:

- Customer, repairer and admin roles
- Category → brand → family → model → service catalogue
- Immutable quote versions and quote line items
- Separate payment and job status
- Configurable transport pricing
- Inventory lifecycle management
- Active repairer GPS only while travelling
- Repair chat and structured quote creation
- Separate Store and repair catalogue
- Historical records that remain intact when catalogue items are discontinued

## Firebase configuration

Firebase credentials are placeholders in source control. Configure the Firebase project and environment values before deployment. Never commit private service-account keys or payment secrets.

## Development

```bash
npm install --legacy-peer-deps
npm run start
```

Build:

```bash
npm run build
```

Functions:

```bash
cd functions
npm install
npm run build
```

## Branching

The original repository remains untouched. MoRepS development is isolated on `moreps-production-build` until the application and backend are fully tested.
