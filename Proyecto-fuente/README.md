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

4. Si quieren abrir el prisma studio, tienen que estar en la carpeta api-hospital y ejecutar:
    - `npx prisma studio`

si hacen cambios en el modelo para que en el studio este actualizado el modelo hay que hacer:
    - `npx prisma db push`
luego:
    -`npx prisma generate`
y realizar el primer comando para hacer el servidor.

## IPs:

- Para el backend la ip que sirve es: http://127.0.0.1:3000  
- Para el front sirve la ip: http://127.0.0.1:4200  
- O tambien corre en el localhost: http://localhost:4200
- Para el Prisma Studio ip (manejar y ver la bd): http://localhost:51212 


npx prisma studio, para ver la bd

## Para abrirlo en el celu:

OJITOOO: 

esto no es 100% seguro de hacerlo en redes de wifi públicas o semi públicas (como la de la U), es más seguro en redes privadas (como las de la casa)

Como requisito el pc y el celu deben estar conectadas a la misma red

Por ahora, esto funciona solo para el front, ya cuando conectemos las rutas con el backend parece que no va a funcionar :c


ahora si las instrucciones :p

- En el archivo angular.json agregar la dirección de ip del wifi a los "alowedHost" (aprox en la línea 67)

    ejemplo: "allowedHosts": ["localhost", "127.0.0.1", "192.XXX.X.85"] 
    (no voy a poner mi ip completa en el readme lol)

    - HAY QUE ACORDARSE DE ELIMINAR ESA IP DE LOS ALLOWEDHOST ANTES DE HACER PUSH!!!!!

- En el archivo docker-compose.yml descomentar esta línea
    command: npx ng serve --host 0.0.0.0

- Abrir Powershel como administrador (OJO, abrir POWERSHEL!!! no el CMD, ya me paso upsi) y ejecutar (es como una regla para abrir acceso al puerto o algo así no se):
    New-NetFirewallRule -DisplayName "App Hospital (Docker)" -Direction Inbound -LocalPort 4200,3000 -Protocol TCP -Action Allow

- Luego, hacer correr  la pag con el docker compose y en el celu meterse al link:
    http://192.XXX.X.85:4200 (esto es: http://[Direccion IP wifi]:4200)

- dsp de hacer todo, ejecutar en POWERSHELL como administrador esto para eliminar la regla de antes (hay que hacerlo por seguridad de nuestros pc lol):
    Remove-NetFirewallRule -DisplayName "App Hospital Frontend"