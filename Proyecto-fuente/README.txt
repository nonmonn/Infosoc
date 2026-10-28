Para levantar el proyecto:
1. Tener el docker desktop abierto en segundo plano :plano
2. asegurense de que esten en la carpeta Proyecto-fuente
3. si quieren levantar solo el servidor de la api(backend) hacen:
    docker compose up -d --build api
   si quieren levantar solo el servidor del pwa(frontend) hacen:
   docker compose up -d --build frontend
   
   !!ojito esto puede ir cambiando en algun momento, ya que por ahora los servidores no estan
   conectados (el frontend aun no necesita la logica) pero en algun momento ya no se podra hacer esto

   Para levantar el proyecto completo(back y front):
   docker compose up -d --build

   para el backen la ip que sirve es: http://127.0.0.1:3000

   para el front sirve la ip: http://127.0.0.1:4200
   o tambien corre en el localhost: http://localhost:4200