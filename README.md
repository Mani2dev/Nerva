# 🍯 Vue + FastAPI Honeypot Farm

**Trap. Study. Adapt. Automate.**  
A real-world honeypot farm orchestration framework for folks who want to do more than just *play security* — built with real tools, real risks, real learning.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Planned Enhancements](#planned-enhancements)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Security Notes](#security-notes)
- [Setup](#setup)
- [Usage](#usage)
- [Role-Based Access](#role-based-access)
- [Operational Best Practices](#operational-best-practices)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🧩 Overview

This is a **multi-container honeypot farm**, built for:
- **Deploying traps** that mimic real services
- **Orchestrating containers** through FastAPI + Docker SDK
- **Monitoring suspicious traffic**
- **Centralizing logs** for threat intel and forensics
- **Managing everything** through a secure Vue dashboard

All containers are isolated, logs are centralized, network activity is traceable — and you stay in control with **custom token auth** and your own **RBAC** rules.

---

## ⚙️ Core Features

✅ **Vue 3 Frontend** with Vue Router + Pinia  
✅ **FastAPI Backend** with your own custom token-based auth system (no JWT fad hype)  
✅ **PostgreSQL** for user sessions, tokens, RBAC configs, honeypot metadata  
✅ **Docker SDK** — you’re not just `docker-compose`-ing, you’re programmatically managing traps  
✅ **Centralized Logging** — shared volume or plug into Loki/Promtail/ELK later  
✅ **Web UI Controls** — spawn, kill, inspect, monitor containers  
✅ **Firewall Rules** — block IPs and tweak network rules from the panel (handle with care)  
✅ **Host Tool Installer** — deploy nginx, fail2ban, or other essentials directly (highly privileged ops, so isolate carefully)  
✅ **Custom RBAC** — fine-grained roles for devs, devops, admins, and cybersec researchers

---

## 🚧 Planned Enhancements

- Kubernetes orchestration layer
- Terraform IAC for spinning up infra consistently
- CI/CD pipelines for safe deployments (GitHub Actions, GitLab CI, etc.)
- Logging upgrade — fully integrated Loki or ELK
- Webhooks for Discord/Slack/Matrix alerts
- Zero-trust privileged agent for firewall/package ops
- Audit logging for every admin action
- Dark mode (non-negotiable)

---

## 🏗️ System Architecture

```plaintext
+-------------------------------+
|     Vue 3 Frontend Panel      |
|  (Vue Router + Pinia + Vite)  |
+---------------+---------------+
                |
+---------------v---------------+
|           FastAPI             |
|  - Custom Token Auth Layer    |
|  - RBAC Enforcement           |
|  - PostgreSQL DB              |
|  - Docker SDK                 |
+---------------+---------------+
                |
+---------------v---------------+
|       Docker Engine API       |
|    (Direct container ops)     |
+---------------+---------------+
                |
+---------------v---------------+
|  Honeypot Containers (SSH/HTTP/SMB/Custom) |
+---------------+---------------+

+-------------------------------+
|   Shared Log Volume or Loki   |
+-------------------------------+
````

---

## 🧱 Tech Stack

| Layer             | Tool                          | Purpose                           |
| ----------------- | ----------------------------- | --------------------------------- |
| **Frontend**      | Vue 3 + Router + Pinia + Vite | SPA Dashboard                     |
| **Backend**       | FastAPI                       | Core API logic                    |
| **DB**            | PostgreSQL                    | Auth, RBAC, config, logs metadata |
| **Orchestration** | Docker SDK                    | Direct container mgmt             |
| **Auth**          | Custom Token System           | DIY token flow                    |
| **RBAC**          | Custom Roles                  | Dev, DevOps, Admin, CySec         |
| **Logging**       | Shared Vol or Loki            | Logs aggregator                   |
| **Future**        | K8s, Terraform, CI/CD         | Infra as Code, pipelines          |

---

## 🗂️ Directory Structure

```plaintext
.
├── backend/
│   ├── main.py
│   ├── api/                # Endpoints
│   ├── auth/               # Token logic
│   ├── models/             # SQLAlchemy ORM
│   ├── rbac/               # Custom RBAC utils
│   ├── docker_sdk/         # Container ops
│   ├── core/               # Settings, logging
│   ├── utils/              # Helpers
│   ├── alembic/            # DB migrations
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── router/         # Vue Router config
│   │   ├── store/          # Pinia store
│   │   ├── views/          # Pages
│   │   ├── components/     # UI parts
│   ├── public/
│   ├── vite.config.js
│   └── Dockerfile
├── honeypots/
│   ├── ssh_honeypot/
│   ├── http_honeypot/
│   └── smb_honeypot/
├── docker-compose.yml
├── .env
├── README.md
└── docs/
```

---

## 🔐 Security Notes

* **Custom Token Auth:** Rotate, expire, hash in DB. Don’t hardcode.
* **RBAC:** Enforce at every route. No silent fails.
* **Docker SDK:** DO NOT expose `docker.sock` to the world.
* **Host Ops:** Package installs & firewall edits run as root — use an isolated agent with tight comms.
* **Container Hardening:** Run as non-root, use `seccomp`, `AppArmor`, drop caps.
* **Logs:** Store off-site or in append-only mode.
* **Access:** VPN or private admin subnet only.
* **SSL:** Nginx or Caddy in front of FastAPI. No raw HTTP.

---

## ⚙️ Setup

### Prerequisites

* Docker + Docker Compose
* Python 3.11+
* Node.js 20+
* PostgreSQL running somewhere

### Clone & Configure

```bash
git clone https://github.com/yourusername/honeypot-farm.git
cd honeypot-farm
cp .env.example .env
# Edit DB creds, tokens, secrets here!
```

### Launch

```bash
docker-compose up --build -d
```

---

## 🚀 Usage

1. **Login**
   Open `https://your.server.ip` → sign in with your admin token creds.

2. **Deploy**
   Pick a honeypot template — SSH, HTTP, SMB, custom — and spawn containers.

3. **Monitor**
   Inspect logs in real-time. Flag suspicious IPs. Export logs.

4. **Block/Allow**
   Add IP block rules or tweak firewall configs (⚠️ don’t brick yourself).

5. **Host Ops**
   Run safe package installs — nginx, fail2ban — carefully.

---

## 🗝️ Role-Based Access

| Role       | Capabilities                                        |
| ---------- | --------------------------------------------------- |
| **Dev**    | View traps, logs. Limited spawn. No firewall.       |
| **DevOps** | Full container orchestration. Limited firewall ops. |
| **Admin**  | Everything. Full orchestration + root ops.          |
| **CySec**  | Logs, threat intel, forensics. No orchestration.    |

---

## 🧩 Operational Best Practices

✅ Rotate tokens & DB creds quarterly.
✅ Keep FastAPI & frontend updated.
✅ Don’t expose the `docker.sock` without a proxy.
✅ Keep honeypots on an isolated network/subnet.
✅ Regular off-site backups for logs.
✅ Use CI/CD for rolling updates — no cowboy deploys.
✅ Harden containers & drop all unnecessary capabilities.
✅ Pen-test your panel as if you were the attacker.

---

## 🗺️ Roadmap

* [ ] K8s integration for scale
* [ ] Terraform modules for IAC
* [ ] CI/CD pipeline (GitHub Actions / GitLab)
* [ ] Loki/Promtail log pipelines
* [ ] Slack/Discord/Matrix alert hooks
* [ ] Automated IP intel feeds
* [ ] Zero-trust agent for root ops
* [ ] Proper audit logging & rollback
* [ ] Dark mode, obviously

---

## 🤝 Contributing

1. Fork the repo
2. Make a feature branch (`git checkout -b feature/thing`)
3. Commit changes, push
4. PR with clear explanation
5. Don’t break main. Don’t push raw secrets. Seriously.

---

## 📄 License

MIT — do your worst, just don’t blame me when shady folks fight back.

---

## 🏴‍☠️ Final Word

You break it, you fix it. You trap them, you learn. Keep your logs safe, your keys rotated, your containers isolated — and your curiosity ruthless.

**Happy hunting.** 🐍✨
