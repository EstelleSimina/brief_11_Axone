# 1. Utiliser une image de base
FROM node:22-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances pour profiter du cache Docker
COPY package*.json ./

# 2. Installer les dépendances du projet
RUN npm install

# Copier le reste du code source de l'application
COPY ./ ./

# 4. Indiquer que le conteneur écoutera sur le port 3000
EXPOSE 3000

# 5. Définir la commande pour démarrer le serveur de développement
CMD ["npm", "run", "dev"]