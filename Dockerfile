# Dockerfile

# image de base : Node.js LTS sur Alpine (légère)
FROM node:22-alpine

# métadonnées de l'image
LABEL base.image="node:22-alpine"

# répertoire de travail dans le conteneur
WORKDIR /app

# copie des manifestes de dépendances
COPY package*.json ./

# installation des dépendances (sans les devDependencies)
RUN npm install --omit=dev

# copie du code source dans le répertoire de travail
COPY . .

# port exposé par l'API
EXPOSE 3000

# commande de démarrage du conteneur
CMD ["node", "server.js"]
