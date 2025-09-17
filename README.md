# Nerva

**Nerva** is an extensible, self-hosted security observability and threat detection platform designed for modern DevOps, security teams, and independent operators.
Nerva enables rapid deployment of honeypots, comprehensive network and system monitoring, advanced log analysis, and real-time incident detection—all within a modular, API-driven architecture that prioritizes performance, reliability, and developer usability.

---

## Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Architecture](#architecture)
* [Modules](#modules)
* [Security Model](#security-model)
* [Roadmap](#roadmap)
* [Quick Start](#quick-start)
* [Contributing](#contributing)
* [License](#license)

---

## Overview

Nerva provides organizations and individuals with a unified platform for threat detection, security observability, and cyber defense automation.
By combining programmable honeypots, real-time log ingestion, and rule-based alerting, Nerva offers actionable visibility across distributed environments—without cloud vendor lock-in or proprietary black boxes.

Nerva is built for environments where control, transparency, and extensibility are mandatory.
Whether deployed in a homelab, enterprise network, or research setting, Nerva integrates seamlessly with existing infrastructure, enabling advanced security workflows while remaining lightweight and adaptable.

---

## Key Features

* **Self-Hosted & Vendor-Neutral:**
  Deploy on bare metal, VMs, or containers. No external dependencies, no forced cloud components.

* **Modular Control Plane:**
  FastAPI-based backend, Postgres storage, Redis Streams for async/event processing.

* **Pluggable Agent System:**
  Lightweight agents deployable over SSH/bootstrap scripts, maintaining secure, persistent pull connections for log and event forwarding.

* **Flexible Log Ingestion:**
  Native support for Suricata EVE JSON, custom log sources, and structured event pipelines.

* **Rule-Based Detection & Alerting:**
  Customizable rules engine for correlation, alerting, and automated response.

* **Content-Addressable Storage:**
  Immutable storage of logs, events, and artifacts—ensuring data integrity and auditability.

* **Role-Based Access Control (RBAC):**
  Multi-user authentication, teams, permission scopes, and data yanking (revocation) built-in.

* **Extensible API:**
  All functionality is API-driven—enabling integration with SIEM, SOAR, custom dashboards, and automation workflows.

---

## Architecture

Nerva’s architecture is designed for scalability, reliability, and developer extensibility.

### Control Plane

* **API Backend:** FastAPI (Python) providing REST/gRPC endpoints.
* **Database:** PostgreSQL for relational data (users, teams, configs, events).
* **Event Backbone:** Redis Streams (or RabbitMQ for large-scale deployments) for decoupled processing and event propagation.
* **Object Storage:** Content-addressable, supports log retention, audit, and replay.

### Agents

* **Deployment:** Installable via single bootstrap script or container image.
* **Connection:** Secure, persistent pull model (WebSocket/SSE).
* **Transport:** HTTPS for event/log shipping; local spooling with HMAC for reliability and tamper evidence.
* **Extensibility:** Supports custom modules (honeypots, collectors, integrations).

### Modules

* **Core Modules:**

  * HTTP Honeypot
  * Suricata EVE Ingestion
  * Log Forwarding
  * Health/Status Monitoring
* **Custom Modules:**
  Developers can build and deploy Python modules for custom detection, enrichment, or integrations.

### Security Model

* **Authentication:**

  * Username/password with JWT or session-based tokens.
  * HttpOnly cookies for session integrity.

* **Authorization:**

  * RBAC with permissions on teams, environments, data scopes.
  * Support for tagging, yanking (revoking) data, and fine-grained audit logging.

* **Data Integrity:**

  * All shipped logs/events signed (HMAC), ensuring authenticity and traceability.

---

## Roadmap (MVP to v1.0)

1. **Initial Release**

   * Control plane (FastAPI, Postgres, Redis)
   * Bootstrap agent (Python CLI)
   * HTTP honeypot and Suricata EVE ingestion
   * Basic rules engine (pattern-based)
   * User/team authentication, RBAC

2. **Planned Features**

   * Advanced alerting (notifications, integrations)
   * Rich web UI (Vue/React, FastAPI backend)
   * Agent auto-updates and health reporting
   * More honeypot modules (SSH, SMB, etc.)
   * Customizable dashboards and reporting
   * API clients/SDKs (Python, Go, etc.)

---

## Quick Start

> **Note:** This section will be updated as soon as the public release and documentation are available.

1. Clone the repository and set up the control plane:

   ```bash
   git clone https://github.com/yourorg/nerva.git
   cd nerva
   # Follow installation guide (coming soon)
   ```
2. Configure database and environment settings:

   * Set `DATABASE_URL`, `REDIS_URL`, and authentication parameters.
3. Launch the control plane server:

   ```bash
   uvicorn nerva.api:app --host 0.0.0.0 --port 8000
   ```
4. Deploy agents to desired hosts via provided bootstrap script.
5. Access the API/UI and begin configuration.

---

## Contributing

Nerva is currently in active development.
Contributions, issues, and feedback are welcome—see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Contact / Links

* Project Lead: Emanuel Rajic Miskovic
* Email: \[[your-email@domain.com](mailto:your-email@domain.com)]
* GitHub: [https://github.com/yourorg/nerva](https://github.com/yourorg/nerva)

---

### Final Notes: Critical Review

* **Don’t oversell until you have a working MVP and at least 1-2 full-featured modules.**
* **Docs should be 100% accurate, no vaporware or promises you can’t demo.**
* **If targeting real companies, add an architecture diagram and a “Security Considerations” section next.**
* **If you have a dev public roadmap or Discord, link it.**
* **Revisit naming—if Nerva is taken or there’s confusion with existing projects, pick a unique, brandable alternative early.**
