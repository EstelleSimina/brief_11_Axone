# SnipShare - Plan de Projet et Suivi des Tâches

Ce document sert de feuille de route et de to-do list pour le développement du projet SnipShare. Il est basé sur le cahier des charges et découpé selon les phases définies.

---

## Phase 1 : Conception (21 au 24 octobre)

**Objectif :** Définir entièrement le projet sans écrire une seule ligne de code. Tous les livrables de cette phase doivent être terminés avant de passer à la phase 2. 

### 🎨 1.1 - Charte Graphique et Identité Visuelle
- [x] **Définir la palette de couleurs :**
    - [x] Choisir 1 couleur primaire.
    - [x] Choisir 1-2 couleurs secondaires.
    - *Livrable : Document avec les codes hexadécimaux.*
- [ ] **Sélectionner les typographies :**
    - [x] Choisir 1 police pour les titres.
    - [x] Choisir 1 police pour le corps du texte.
    - *Livrable : Noms des polices (ex: via Google Fonts).*

### 📐 1.2 - Maquettes (Zoning → Wireframe → Maquette UI)
- [x] **Maquettes - Page d'accueil (non connecté)**
    - [x] Wireframe (Desktop + Mobile).
    - [ ] Maquette UI finale (Desktop + Mobile).
- [ ] **Maquettes - Pages d'authentification (Inscription / Connexion)**
    - [x] Wireframe (Desktop + Mobile).
    - [ ] Maquette UI finale (Desktop + Mobile).
- [x] **Maquettes - Dashboard (création de snippet)**
    - [x] Wireframe (Desktop + Mobile).
    - [ ] Maquette UI finale (Desktop + Mobile).
- [x] **Maquettes - Page d'exploration (tous les snippets)**
    - [x] Wireframe (Desktop + Mobile).
    - [ ] Maquette UI finale (Desktop + Mobile).
- [x] **Maquettes - Page de vue d'un snippet**
    - [x] Wireframe (Desktop + Mobile).
    - [ ] Maquette UI finale (Desktop + Mobile).
- [x] **Maquettes - Page de profil utilisateur**
    - [x] Wireframe (Desktop + Mobile).
    - [ ] Maquette UI finale (Desktop + Mobile).

### 💾 1.3 - Modélisation de la Base de Données (Merise)
- [x] **Créer le Modèle Conceptuel de Données (MCD)**
    - *Livrable : Image du MCD.*
- [x] **Dériver le Modèle Logique de Données (MLD)**
    - *Livrable : Image du MLD.*
- [x] **Générer le script de création de la BDD (LDD)**
    - *Livrable : Fichier `init.sql` avec les `CREATE TABLE`.*

### 📝 1.4 - Conception Fonctionnelle
- [x] **Rédiger les User Stories** pour chaque fonctionnalité majeure.
    - *Livrable : Liste des User Stories.*

---

## Phase 2 : Développement (27 octobre au 7 novembre)

**Objectif :** Traduire la conception en code fonctionnel, en suivant les priorités.

### ⚙️ 2.1 - Initialisation du Projet
- [ ] **Mettre en place l'environnement de travail :**
    - [ ] Créer le dépôt Git (Backend, Frontend).
    - [ ] Initialiser le projet Backend (Node.js, Express, TypeScript).
    - [ ] Initialiser le projet Frontend (React, TypeScript, Vite).
    - [ ] Installer les dépendances de base.
- [ ] **Mettre en place la structure des dossiers :**
    - [ ] Backend : Structure MVC.
    - [ ] Frontend : Structure Atomic Design.

### 🚀 2.2 - Développement Backend (API)
- [ ] **Base de Données & Authentification (Priorité Haute)**
    - [ ] Connecter le serveur à PostgreSQL.
    - [ ] Exécuter le script SQL pour créer les tables.
    - [ ] Créer le modèle `User`.
    - [ ] Développer la route `POST /api/register` (avec hachage `argon2`).
    - [ ] Développer la route `POST /api/login` (avec création de cookie/token).
    - [ ] Mettre en place un middleware de protection des routes.
    - [ ] **Tests :** Écrire les tests unitaires et d'intégration.
- [ ] **Gestion des Snippets (CRUD)**
    - [ ] Créer le modèle `Snippet`.
    - [ ] Développer les routes `POST`, `GET`, `PUT`, `DELETE` pour les snippets.
    - [ ] **Tests :** Écrire les tests pour toutes les routes CRUD.
- [ ] **Autres Fonctionnalités**
    - [ ] Implémenter la logique et les routes pour Likes, Commentaires et Tags.
    - [ ] Implémenter la route de recherche.
    - [ ] Développer les routes pour le profil utilisateur.
    - [ ] **Tests :** Couvrir ces fonctionnalités avec des tests.
- [ ] **Documentation API**
    - [ ] Documenter chaque route (ex: dans un fichier `API_DOCS.md`).

### 💻 2.3 - Développement Frontend (Interface)
- [ ] **Composants de base (Atoms & Molecules)**
    - [ ] Créer les composants `Button`, `Input`, `Card`, `Tag`, `Navbar`.
- [ ] **Pages d'Authentification**
    - [ ] Créer les pages d'Inscription et de Connexion.
    - [ ] Connecter les formulaires aux routes de l'API.
    - [ ] Gérer l'état global de l'utilisateur (Context API / Redux).
- [ ] **Pages Fonctionnelles**
    - [ ] Développer la page de création de snippet.
    - [ ] Développer la page d'exploration.
    - [ ] Développer la page de vue d'un snippet.
    - [ ] Développer la page de profil utilisateur.
- [ ] **Responsive Design**
    - [ ] Appliquer les Media Queries pour assurer l'affichage sur mobile.

### 🐳 2.4 - DevOps (Docker) à faire dès le début !!
- [ ] Créer le `Dockerfile` pour le Backend.
- [ ] Créer le `Dockerfile` pour le Frontend.
- [ ] Créer le fichier `compose.yaml` pour orchestrer les 3 conteneurs (db, back, front).

---

## Phase 3 : Fix & Validation (4 au 7 novembre)

**Objectif :** S'assurer que tout fonctionne parfaitement et que tous les livrables sont prêts.

### 🐞 3.1 - Tests et Corrections
- [ ] **Vérifier la couverture de tests Backend (> 80%)**
    - [ ] Lancer `npm test -- --coverage`.
    - *Livrable : Capture d'écran du rapport.*
- [ ] **Tests Manuels de bout en bout**
    - [ ] Tester le parcours utilisateur complet.
    - [ ] Tester sur Chrome, Firefox, et Edge.
    - [ ] Tester en mode mobile via les DevTools.
- [ ] **Débuggage et corrections**
    - [ ] Traquer et corriger les bugs restants.

### 📦 3.2 - Finalisation des Livrables
- [ ] **Nettoyage du code**
    - [ ] Relire le code, supprimer les `console.log` et ajouter des commentaires clairs.
- [ ] **Finaliser la documentation**
    - [ ] Mettre à jour la documentation de l'API.
    - [ ] Compléter ce `README.md` avec les instructions d'installation et de lancement.
- [ ] **Assembler les preuves pour la validation**
    - [ ] Créer un dossier `docs/` avec les maquettes, MCD, et le rapport de tests.

### ✅ 3.3 - Validation
- [ ] **Auto-validation**
    - [ ] Reprendre le cahier des charges point par point et cocher ce qui est fait.
- [ ] **Soumission du projet**
    - [ ] Pousser la version finale du code sur Git.
    - [ ] Soumettre les liens et livrables sur la plateforme demandée.
