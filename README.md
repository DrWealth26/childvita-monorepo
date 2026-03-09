# ChildVita

### A Transparent System for Supporting Children's Education

ChildVita is a blockchain-based platform designed to ensure that education support reaches the children who need it most — transparently, verifiably, and without intermediaries that dilute trust.

At its core, ChildVita connects **education support to verified school attendance**, using smart contracts to release micro-grants only after participation is confirmed.

This transforms how educational assistance can be distributed:
**accountable, traceable, and built on trustless infrastructure.**

---

# Why ChildVita Exists

Around the world, millions of children struggle to stay in school due to financial barriers faced by their caregivers.

Many well-intentioned programs attempt to help. But too often:

* Funds disappear into administrative layers
* Accountability is difficult to verify
* Trust between donors, organizations, and families breaks down

ChildVita approaches the problem differently.

Instead of relying solely on institutional trust, the system relies on **transparent technology**.

Every grant:

• is created on-chain
• requires verified participation
• is released automatically by a smart contract
• remains publicly auditable

The result is a system where **support reaches families exactly when it should — and everyone can verify that it happened.**

ChildVita is built on a simple belief:

> Technology should remove friction from doing good.

---

# The Core Idea

ChildVita introduces a new model for education assistance:

**Attendance-Linked Micro-Grants**

1. A caregiver becomes eligible for support tied to a child's school participation.

2. Authorized institutions verify attendance.

3. A cryptographic proof of verification is recorded.

4. A smart contract automatically releases the grant.

Every step is transparent and traceable.

No manual approvals.
No opaque processes.
No delays once verification happens.

---

# How It Works

### 1. Grant Creation

A grant is created for a caregiver tied to a registered child ID.

The grant includes:

* caregiver wallet
* child identifier
* micro-grant amount
* timestamp
* verification status

---

### 2. Attendance Verification

Authorized verifiers confirm school attendance.

Verification produces a cryptographic proof reference stored on-chain.

This ensures the system can confirm participation **without exposing sensitive student data**.

---

### 3. Automated Grant Release

Once attendance is verified, the smart contract allows the grant to be released to the caregiver.

This process is:

* transparent
* automated
* irreversible
* publicly auditable

---

# Platform Architecture

ChildVita is designed as a lightweight decentralized system.

### Smart Contracts

* **Solidity**
* Manages grant lifecycle
* Verifies attendance proofs
* Releases payments

### Blockchain Environment

* **Hardhat development network**
* Simulates real on-chain transactions

### Frontend

* **Next.js**
* Dashboard for viewing grant activity

### Blockchain Interaction

* **Ethers.js**
* Reads grant data directly from the smart contract

---

# Example Grant Transaction

```
Grant #1
Child ID: CHV-10001
Caregiver: 0x7099...
Amount: 0.02 ETH
Attendance Verified: true
Grant Paid: true
```

Each transaction is permanently recorded and verifiable.

---

# What Makes ChildVita Different

ChildVita does not attempt to replace institutions.

Instead, it **strengthens trust around them**.

By combining:

* transparent smart contracts
* cryptographic verification
* automated payments

the platform creates a system where **support flows efficiently and accountability becomes effortless.**

---

# Current Prototype

The prototype demonstrates:

* smart contract grant creation
* attendance verification workflow
* automated grant release
* on-chain transaction logging
* dashboard visualization of grant activity

The system simulates **20 micro-grant disbursements** with verified attendance proofs.

---

# Repository Structure

```

childvita-monorepo/                  # Root monorepo (push this entire folder to GitHub)
├── .gitignore
├── README.md
├── LICENSE                          # MIT license from day 1
├── package.json                     # Root workspaces config
├── turbo.json                       # Optional Turborepo for fast builds (recommended)
├── .github/
│   └── workflows/
│       └── deploy.yml               # Optional CI/CD
│
├── contracts/                       # Solidity + Hardhat (Polygon testnet)
│   ├── contracts/
│   │   └── ChildVitaGrant.sol
│   ├── scripts/
│   │   ├── deploy.ts
│   │   └── verify.ts
│   ├── test/
│   │   └── ChildVitaGrant.test.ts
│   ├── hardhat.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                         # Voice agent backend (Node.js/TS + Groq + Whisper + ZK)
│   ├── src/
│   │   ├── agents/
│   │   │   └── voiceGuardian.ts     # Main LLM + Whisper logic (Yoruba/Hausa/English)
│   │   ├── zk/
│   │   │   └── attendanceProof.ts   # zk-SNARK proof generation & verification
│   │   ├── ussd/
│   │   │   └── simulator.ts         # USSD fallback + mobile-money mock
│   │   ├── payout/
│   │   │   └── mockMobileMoney.ts
│   │   └── server.ts                # Express/Fastify server or serverless handler
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                        # Next.js (dashboard + voice UI) → Deploy to Vercel
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Landing / pitch page
│   │   ├── dashboard/
│   │   │   └── page.tsx             # On-chain dashboard (transactions, metrics)
│   │   └── api/
│   │       └── voice/
│   │           └── route.ts         # Serverless API route (calls backend logic)
│   ├── components/
│   │   ├── VoiceInterface.tsx       # Mic button, language selector, real-time transcript
│   │   ├── TransactionTable.tsx
│   │   ├── ZKProofViewer.tsx
│   │   └── MetricsCards.tsx
│   ├── public/
│   │   └── logo.svg
│   ├── lib/
│   │   └── wagmi.ts                 # Wallet connection (viem + wagmi)
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── packages/
│   └── shared/                      # Shared types & utils (optional but clean)
│       ├── types.ts
│       └── constants.ts
│
└── docs/
    └── architecture.md              # For UNICEF application reference

```

---

# Vision

ChildVita imagines a world where **every act of support can be verified.**

Where families receive help without navigating complex systems.

Where technology quietly ensures fairness behind the scenes.

Where trust is not requested —
it is **designed into the system.**

---

# The Message

ChildVita is not only a platform.

It is a statement:

**When transparency meets compassion, support becomes unstoppable.**

---
