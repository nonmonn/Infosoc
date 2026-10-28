## Instrcciones para levantar el proyecto:

1. instalar Docker y tenerlo integrado con wsl

2. Teniendo el docker abierto (en segundo plano), hay que ejecutar en la terminal:
   - `docker compose up -d --build api` si quieren levantar solo el servidor de la api (backend)  
   - `docker compose up -d --build frontend` si quieren levantar solo el servidor del pwa (frontend)  
   - `docker compose up -d --build` Para levantar el proyecto completo (back y front)  

   Procurando de estar dentro de la carpeta `Infosoc/Proyecto-fuente`.  
    > **NOTA IMPORTANTE:**  esto puede ir cambiando en algun momento, ya que por ahora los servidores no estan conectados (el frontend aun no necesita la logica) pero en algun momento ya no se podra hacer esto  

    > **Nota:** **SIEMPRE** se deben ejecutar `docker compose down -v` si se realizó algún cambio en el código, y `docker compose up --build ...` para volver a levantar el proyecto

3. (CREO QUE ESTE PASO ES IGUAL QUE EN ANALISIS) Si la terminal lanza un mensaje de error, ejecutar: 
    - `sudo usermod -aG docker $USER`  

    y colocar las credenciales de sudo, luego colocar  
    - `newgrp docker`  

    y volver a intentar el paso 2.

## IPs:

- Para el backend la ip que sirve es: http://127.0.0.1:3000  
- Para el front sirve la ip: http://127.0.0.1:4200  
- O tambien corre en el localhost: http://localhost:4200