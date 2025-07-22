./
├── LICENSE
├── README.md
├── backend/
│   ├── 2fa/
│   │   ├── 2fa.js
│   │   ├── codegen.js
│   │   ├── crypto.js
│   │   └── db_store.js
│   ├── Dockerfile
│   ├── auth/
│   ├── build/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   ├── docker/
│   │   ├── containers.js
│   │   ├── docker.js
│   │   └── spawner.js
│   ├── factorio/
│   │   ├── phrase.txt
│   │   └── token.js
│   ├── image/
│   ├── memory/
│   │   ├── heap.js
│   │   └── manager.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routers/
│   │   ├── auth.js
│   │   └── settings/
│   │       ├── settings.js
│   │       ├── user.js
│   │       └── webhooks.js
│   └── server.js
├── docker-compose.yaml
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
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
│   │   ├── main.js
│   │   ├── security/
│   │   │   ├── Auth.js
│   │   │   ├── GetAuthToken.js
│   │   │   └── SetCookie.js
│   │   └── views/
│   │       ├── Auth.vue
│   │       ├── Index.vue
│   │       └── NotFound.vue
│   └── vite.config.js
├── infra/
│   └── Caddyfile/
└── treex.md
