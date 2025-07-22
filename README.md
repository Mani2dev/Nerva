# Barnacle

Trap. Monitor. Analyze. Evolve.

Barnacle is a modular honeypot farm and system orchestration suite. It’s designed for security enthusiasts and operators who want to go beyond simple traps — Barnacle aims to provide real-world deployment, full observability, and integrated security controls on modern Linux hosts.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Planned Enhancements](#planned-enhancements)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Security Model](#security-model)
- [Setup](#setup)
- [Usage](#usage)
- [Access Control](#access-control)
- [Operational Guidelines](#operational-guidelines)
- [License](#license)

---

## Overview

Barnacle is a honeypot orchestration framework that deploys multiple isolated traps in containers, collects logs, tracks suspicious activity, and exposes an operator dashboard for full control. Beyond honeypots, Barnacle also monitors system resources, manages services, and integrates role-based security controls.

The long-term goal: real-time threat capture, live system forensics, and AI-assisted log analysis — all controlled through a secure, user-friendly interface.

---

## Key Features

Current core capabilities include:

- Honeypot Spawner — Deploy and manage multiple honeypots in isolated containers.
- Container Orchestration — Full Docker management via programmatic API.
- Resource Monitoring — Observe CPU, RAM, and network traffic in real time.
- Custom Authentication — Custom token system and two-factor authentication.
- Role-Based Access Control (RBAC) — Define granular user roles and permissions.
- Multi-User Support — Manage multiple operators with unique credentials.
- Integrated Logging — Centralized log storage for honeypot activity.
- Frontend Dashboard — Vue-based SPA for easy container management and monitoring.
- Service Management — Manage host services (FTP, SSH, cron) primarily for Linux.
- Pluggable AI Analysis — Framework for integrating models like ChatGPT or Gemini for log parsing.

---

## Planned Enhancements

Future expansions are already mapped out:

- Kubernetes orchestration layer for large-scale deployment.
- Integrated digital forensics tools for live evidence collection.
- CI/CD pipelines for safer updates and rollback.
- Infrastructure-as-Code modules (Terraform).
- Improved system hardening profiles.
- Alert hooks for Discord, Slack, Matrix.
- Advanced audit logging for user actions.
- Dedicated zero-trust agent for privileged host operations.
- Dark mode (non-negotiable).

---

## System Architecture

\`\`\`plaintext
+-------------------------------+
|   Frontend (Vue 3 + Vite)     |
+-------------------------------+
              |
+-------------------------------+
|   Backend (Node.js/Express)   |
| - API for container control   |
| - Custom Auth & 2FA           |
| - RBAC Enforcement            |
| - System Resource Monitor     |
+-------------------------------+
              |
+-------------------------------+
|       Docker Engine API       |
|  (Containers, Networks, Vols) |
+-------------------------------+
              |
+-------------------------------+
|     Honeypot Containers       |
|  (SSH, HTTP, SMB, Custom)     |
+-------------------------------+
              |
+-------------------------------+
|      Centralized Log Store    |
|   + Future DF Tooling Layer   |
+-------------------------------+
\`\`\`

---

## Tech Stack

| Layer             | Tooling                | Purpose                          |
| ----------------- | ---------------------- | -------------------------------- |
| **Frontend**      | Vue 3 + Vite           | Operator dashboard               |
| **Backend**       | Node.js (Express)      | API server, orchestration logic  |
| **Container Ops** | Docker SDK / Compose   | Programmatic container control   |
| **Auth**          | Custom Token + 2FA     | Multi-user auth, RBAC            |
| **Monitoring**    | Custom Resource Checks | CPU, RAM, Network traffic        |
| **AI/DF**         | Optional Integration   | Log parsing, forensics           |

---

## Directory Structure

\`\`\`plaintext
./
├── LICENSE
├── README.md
├── backend/
│   ├── 2fa/
│   │   ├── 2fa.js
│   │   ├── codegen.js
│   │   ├── crypto.js
│   │   └── db_store.js
│   ├── auth/
│   │   └── auth.js
│   ├── docker/
│   │   ├── containers.js
│   │   ├── docker.js
│   │   └── spawner.js
│   ├── factorio/
│   │   ├── phrase.txt
│   │   └── token.js
│   ├── memory/
│   │   ├── heap.js
│   │   └── manager.js
│   ├── routers/
│   │   ├── auth.js
│   │   ├── containers.js
│   │   ├── honeypots.js
│   │   ├── index.js
│   │   ├── network.js
│   │   └── settings/
│   │       ├── settings.js
│   │       ├── user.js
│   │       └── webhooks.js
│   ├── server.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
├── frontend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── index.html
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.vue
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── routers/
│   │   │       └── routes.js
│   │   ├── components/
│   │   │   ├── blocks/
│   │   │   │   ├── Button.vue
│   │   │   │   ├── ChildEl.vue
│   │   │   │   └── Input.vue
│   │   │   └── global/
│   │   │       └── Sidebar.vue
│   │   ├── security/
│   │   │   ├── Auth.js
│   │   │   ├── GetAuthToken.js
│   │   │   └── SetCookie.js
│   │   ├── views/
│   │   │   ├── Auth.vue
│   │   │   ├── Index.vue
│   │   │   └── NotFound.vue
│   │   ├── main.js
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
└── treex.md
\`\`\`

---

## Security Model

- Custom Auth: Proprietary token generation and 2FA. Rotate keys regularly.
- RBAC: Strict per-route access enforcement. Multi-role design.
- Isolation: Honeypots run in locked-down containers with minimal privileges.
- Network Controls: All inbound/outbound rules configurable via the dashboard.
- Secrets: No hardcoded credentials. Use environment variables and secret stores.
- Host Operations: Any privileged host-level operations are gated and logged.

---

## Setup

### Prerequisites

- Docker & Docker Compose
- Node.js >= 20

### Deploy

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/barnacle.git
   cd barnacle
   \`\`\`

2. Build and start containers:
   \`\`\`bash
   docker-compose up --build -d
   \`\`\`

3. Access the frontend via your server’s IP or domain.

---

## Usage

1. Authenticate using your generated token and 2FA.
2. Deploy honeypots or custom traps.
3. Monitor live resource usage.
4. Inspect logs and export for further analysis.
5. Adjust firewall rules or manage host services as needed.
6. Rotate tokens and manage user access securely.

---

## Access Control

| Role   | Description                                      |
|--------|--------------------------------------------------|
| Admin  | Full orchestration, host ops, user management.   |
| DevOps | Container orchestration, network adjustments.    |
| Analyst| Log access, threat hunting, forensics only.      |
| Viewer | Read-only, no deployment privileges.             |

---

## Operational Guidelines

- Use VPN or dedicated subnet for panel access.
- Keep containers updated and rotate secrets.
- Never expose Docker daemon directly.
- Regularly back up logs to immutable storage.
- Review audit logs and user actions.
- Always test new honeypots in isolated environments.

---

## License

MIT License — use it, break it, adapt it. Just don’t blame the author if you poke the bear and get mauled.
