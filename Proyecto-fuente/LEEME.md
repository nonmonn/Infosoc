# Cambios para usar la app sin internet

## 1. Copiar archivos
Copia el contenido de esta carpeta **encima** de tu `Proyecto-fuente/`, aceptando reemplazar:

- `docker-compose.yml`  (se agregó el servicio `web`)
- `app-hospital-pwa/angular.json`  (sin SSR + Service Worker en producción)
- `app-hospital-pwa/tsconfig.app.json`
- `app-hospital-pwa/src/index.html`
- `app-hospital-pwa/src/app/app.config.ts`

Archivos nuevos:

- `app-hospital-pwa/ngsw-config.json`
- `app-hospital-pwa/Dockerfile.prod`
- `app-hospital-pwa/nginx.conf`
- `app-hospital-pwa/public/manifest.webmanifest`
- `app-hospital-pwa/public/icons/icon-192.png` y `icon-512.png`  (PROVISORIOS: cambiarlos por el logo oficial)

## 2. Instalar el paquete del Service Worker (una sola vez)
```bash
docker compose run --rm frontend npm install @angular/service-worker
```
Esto actualiza `package.json` y `package-lock.json`.

## 3. Levantar todo
```bash
docker compose up -d --build web api db
```
Abre http://localhost:8080 para ver que funciona.

## 4. Link para el celular
```bash
cloudflared tunnel --url http://localhost:8080
```

## 5. Probar sin internet
1. En el celular abre el link con internet y espera a que cargue.
2. Entra a una ruta y mírala.
3. Activa modo avión y vuelve a abrir la página.

Nota: si reinicias cloudflared el link cambia y hay que cargarlo otra vez con internet.
