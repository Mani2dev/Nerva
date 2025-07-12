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
│   │   └── auth.js
│   ├── docker/
│   │   ├── containers.js
│   │   ├── docker.js
│   │   └── spawner.js
│   ├── docker-compose.yml
│   ├── factorio/
│   │   ├── phrase.txt
│   │   └── token.js
│   ├── memory/
│   │   ├── heap.js
│   │   └── manager.js
│   ├── package.json
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
│   └── server.js
├── frontend/
│   ├── Dockerfile
│   ├── docker-compose.yml
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
└── treex.md
