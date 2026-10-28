# Usa una imagen oficial y ligera de Node.js
FROM node:22-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala Angular CLI globalmente para poder usar el comando 'ng'
RUN npm install -g @angular/cli

# Copia los archivos de configuración de dependencias primero
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto por defecto de Angular
EXPOSE 4200

# Inicia el servidor. 
# 0.0.0.0 es crucial para que el puerto sea accesible desde fuera del contenedor
CMD ["npx", "ng", "serve","--host", "0.0.0.0"]