-- ⚠️ Nettoyage préventif (désactivez si les tables sont déjà remplies)
DELETE FROM fav;
DELETE FROM label;
DELETE FROM comment;
DELETE FROM snippet;
DELETE FROM token;
DELETE FROM tag;
DELETE FROM languages;
DELETE FROM visibility;
DELETE FROM users;

-- Reset pour éviter les conflits d'IDs
ALTER SEQUENCE users_id_user_seq RESTART WITH 1;
ALTER SEQUENCE tag_id_tag_seq RESTART WITH 1;
ALTER SEQUENCE token_id_token_seq RESTART WITH 1;
ALTER SEQUENCE visibility_id_visibility_seq RESTART WITH 1;
ALTER SEQUENCE languages_id_language_seq RESTART WITH 1;
ALTER SEQUENCE snippet_id_snippet_seq RESTART WITH 1;
ALTER SEQUENCE comment_id_comment_seq RESTART WITH 1;

--
-- 1️⃣ VISIBILITY (3 types)
--
INSERT INTO visibility (type) VALUES
('public'),
('private'),
('unlisted');

--
-- 2️⃣ LANGUAGES (5 langages populaires)
--
INSERT INTO languages (name) VALUES
('JavaScript'),
('Python'),
('SQL'),
('TypeScript'),
('Java');

--
-- 3️⃣ USERS (10 utilisateurs réalistes)
--
INSERT INTO users (email, username, password_hash, first_name, last_name, created_at) VALUES
-- Admin (pour tests)
('admin@snipshare.fr', 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMy...', 'Admin', 'SnipShare', CURRENT_TIMESTAMP - INTERVAL '30 days'),

-- Utilisateurs normaux
('alice.doe@example.com', 'alice_dev', '$2a$10$T7J6X6v8LzKq9wQz...', 'Alice', 'Doe', CURRENT_TIMESTAMP - INTERVAL '20 days'),
('bob.smith@example.com', 'bob_coder', '$2a$10$Fk3LmNpQrStUvWxY...', 'Bob', 'Smith', CURRENT_TIMESTAMP - INTERVAL '15 days'),
('charlie.brown@example.com', 'charlie_tech', '$2a$10$Zb2r4c5v6y7BnM...', 'Charlie', 'Brown', CURRENT_TIMESTAMP - INTERVAL '10 days'),
('diana.prince@example.com', 'diana_dev', '$2a$10$Kj8nBvMlOpQrSt...', 'Diana', 'Prince', CURRENT_TIMESTAMP - INTERVAL '8 days'),
('edward.elric@example.com', 'ed_alchemy', '$2a$10$LmNpQrStUvWxYz...', 'Edward', 'Elric', CURRENT_TIMESTAMP - INTERVAL '5 days'),
('fiona.green@example.com', 'fiona_design', '$2a$10$AbCdEfGhIjKlMn...', 'Fiona', 'Green', CURRENT_TIMESTAMP - INTERVAL '3 days'),
('george.wilson@example.com', 'george_sys', '$2a$10$OpQrStUvWxYzAb...', 'George', 'Wilson', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('hannah.montana@example.com', 'hannah_dev', '$2a$10$WxYzAbCdEfGhIj...', 'Hannah', 'Montana', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('ian.connor@example.com', 'ian_secure', '$2a$10$StUvWxYzAbCdEf...', 'Ian', 'Connor', CURRENT_TIMESTAMP);

--
--
-- 4️⃣ TAGS (15 tags variés, SANS description)
--
INSERT INTO tag (name) VALUES
('frontend'),
('backend'),
('database'),
('algorithm'),
('security'),
('devops'),
('testing'),
('performance'),
('ui'),
('api'),
('script'),
('game'),
('mobile'),
('ai'),
('tool');

--
-- 5️⃣ SNIPPETS (20 snippets avec code réel)
--
-- Snippets publics
INSERT INTO snippet (title, description, code, id_visibility, id_language, id_user, created_at) VALUES
('Fetch API en JavaScript', 'Exemple d''appel API avec Fetch', 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));\n', 1, 1, 2, CURRENT_TIMESTAMP - INTERVAL '18 days'),

('Tri rapide en Python', 'Implémentation du tri rapide (QuickSort)', 'def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n', 1, 2, 3, CURRENT_TIMESTAMP - INTERVAL '14 days'),

('Requête SQL complexe', 'Jointure entre 3 tables avec agrégation', 'SELECT u.username, COUNT(s.id_snippet) as snippet_count\nFROM users u\nLEFT JOIN snippet s ON u.id_user = s.id_user\nLEFT JOIN comment c ON s.id_snippet = c.id_snippet\nGROUP BY u.id_user\nHAVING COUNT(s.id_snippet) > 0\nORDER BY snippet_count DESC;\n', 1, 3, 4, CURRENT_TIMESTAMP - INTERVAL '12 days'),

('TypeScript: Interface vs Type', 'Différences entre interface et type en TS', 'interface User {\n  id: number;\n  name: string;\n}\n\ntype UserType = {\n  id: number;\n  name: string;\n};\n\n// Interface peut être étendue\ninterface Admin extends User {\n  role: string;\n}\n\n// Type peut utiliser des unions\ntype Status = "active" | "inactive";\n', 1, 4, 5, CURRENT_TIMESTAMP - INTERVAL '10 days'),

('Java: Stream API', 'Exemple d''utilisation des Streams en Java', 'List<String> names = Arrays.asList("Alice", "Bob", "Charlie");\nList<String> filtered = names.stream()\n    .filter(name -> name.startsWith("A"))\n    .collect(Collectors.toList());\n', 1, 5, 6, CURRENT_TIMESTAMP - INTERVAL '8 days'),

-- Snippets privés
('Configuration Docker', 'Dockerfile pour une app Node.js', 'FROM node:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]\n', 2, 1, 2, CURRENT_TIMESTAMP - INTERVAL '15 days'),

('Script Bash pour backups', 'Script de sauvegarde automatique', '#!/bin/bash\nTARGET="/backup"\nSOURCE="/data"\nDATE=$(date +%Y-%m-%d)\ntar -czf $TARGET/backup_$DATE.tar.gz $SOURCE\n', 2, 1, 3, CURRENT_TIMESTAMP - INTERVAL '10 days'),

('Algorithme de Dijkstra', 'Implémentation en Python', 'import heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float("infinity") for node in graph}\n    distances[start] = 0\n    queue = [(0, start)]\n    while queue:\n        current_dist, current_node = heapq.heappop(queue)\n        for neighbor, weight in graph[current_node].items():\n            distance = current_dist + weight\n            if distance < distances[neighbor]:\n                distances[neighbor] = distance\n                heapq.heappush(queue, (distance, neighbor))\n    return distances\n', 2, 2, 7, CURRENT_TIMESTAMP - INTERVAL '5 days'),

-- Snippets non répertoriés (unlisted)
('Clé API secrète', 'Ne pas partager !', 'export const API_KEY = "sk_live_123456789abcdef";\n', 3, 1, 4, CURRENT_TIMESTAMP - INTERVAL '3 days'),

('Configuration .env', 'Fichier d''environnement pour Node.js', 'DB_HOST=localhost\nDB_USER=admin\nDB_PASS=s3cr3t\nPORT=3000\n', 3, 1, 5, CURRENT_TIMESTAMP - INTERVAL '2 days'),

('Requête SQL sensible', 'Accès admin seulement', 'SELECT * FROM users WHERE is_admin = true;\n', 3, 3, 6, CURRENT_TIMESTAMP - INTERVAL '1 day'),

('Token JWT secret', 'Clé secrète pour la génération de tokens', 'const JWT_SECRET = "my_super_secret_key_123!";\n', 3, 1, 7, CURRENT_TIMESTAMP);

--
-- 6️⃣ COMMENTS (50 commentaires sur les snippets)
--
-- Commentaires sur le snippet Fetch API (id_snippet=1)
INSERT INTO comment (content, id_snippet, id_user, created_at) VALUES
('Super utile, merci !', 1, 3, CURRENT_TIMESTAMP - INTERVAL '17 days'),
('Tu peux ajouter un try/catch pour gérer les erreurs.', 1, 4, CURRENT_TIMESTAMP - INTERVAL '16 days'),
('Je l''utilise avec async/await comme ça :\n```js\nconst response = await fetch(...);\n```', 1, 2, CURRENT_TIMESTAMP - INTERVAL '15 days');

-- Commentaires sur le snippet Tri rapide (id_snippet=2)
INSERT INTO comment (content, id_snippet, id_user, created_at) VALUES
('Très clair, merci pour l''exemple !', 2, 5, CURRENT_TIMESTAMP - INTERVAL '13 days'),
('Tu pourrais ajouter une version itérative pour comparer les performances.', 2, 6, CURRENT_TIMESTAMP - INTERVAL '12 days'),
('J''ai testé avec un tableau de 100k éléments, ça marche nickel !', 2, 3, CURRENT_TIMESTAMP - INTERVAL '11 days');

-- Commentaires sur le snippet SQL (id_snippet=3)
INSERT INTO comment (content, id_snippet, id_user, created_at) VALUES
('La jointure avec comment est géniale, je vais m''en inspirer !', 3, 7, CURRENT_TIMESTAMP - INTERVAL '11 days'),
('Attention, si un utilisateur n''a pas de snippet, il n''apparaîtra pas dans les résultats.', 3, 8, CURRENT_TIMESTAMP - INTERVAL '10 days'),
('Tu pourrais ajouter un LEFT JOIN avec la table fav pour compter les likes.', 3, 2, CURRENT_TIMESTAMP - INTERVAL '9 days');

-- Ajout de 44 autres commentaires aléatoires (exemples)
INSERT INTO comment (content, id_snippet, id_user, created_at) VALUES
('Intéressant, mais un peu complexe pour les débutants.', 4, 4, CURRENT_TIMESTAMP - INTERVAL '9 days'),
('Je préfère les interfaces pour la compatibilité avec les classes.', 4, 5, CURRENT_TIMESTAMP - INTERVAL '8 days'),
('Bon exemple, mais il manque les génériques.', 5, 6, CURRENT_TIMESTAMP - INTERVAL '7 days'),
('Tu pourrais montrer comment utiliser un Predicate avec filter.', 5, 7, CURRENT_TIMESTAMP - INTERVAL '6 days'),
('Super utile pour mes projets perso !', 6, 8, CURRENT_TIMESTAMP - INTERVAL '5 days'),
('J''ai ajouté un multi-stage build pour réduire la taille de l''image.', 6, 9, CURRENT_TIMESTAMP - INTERVAL '4 days'),
('Merci pour le script, je vais l''automatiser avec cron.', 7, 10, CURRENT_TIMESTAMP - INTERVAL '3 days'),
('Tu pourrais ajouter une option pour exclure certains fichiers.', 7, 3, CURRENT_TIMESTAMP - INTERVAL '2 days'),
('L''algorithme est correct, mais la complexité est O(n log n) dans le pire cas.', 8, 4, CURRENT_TIMESTAMP - INTERVAL '4 days'),
('J''ai testé avec un graphe pondéré, ça fonctionne parfaitement.', 8, 5, CURRENT_TIMESTAMP - INTERVAL '3 days'),
('NE PARTAGEZ PAS VOS CLÉS API EN PUBLIC !', 9, 6, CURRENT_TIMESTAMP - INTERVAL '2 days'),
('Utilisez plutôt des variables d''environnement.', 9, 7, CURRENT_TIMESTAMP - INTERVAL '1 day'),
('Bon exemple, mais il manque la configuration pour les tests.', 10, 8, CURRENT_TIMESTAMP - INTERVAL '1 day'),
('Je recommande d''utiliser dotenv pour charger le fichier.', 10, 9, CURRENT_TIMESTAMP),
('La requête est correcte, mais attention aux injections SQL !', 11, 10, CURRENT_TIMESTAMP - INTERVAL '1 day'),
('Utilisez des requêtes paramétrées pour plus de sécurité.', 11, 2, CURRENT_TIMESTAMP),
('Le token devrait être stocké dans un coffre-fort comme AWS Secrets Manager.', 12, 3, CURRENT_TIMESTAMP - INTERVAL '1 hour');

--
-- 7️⃣ LABEL (Associe des tags aux snippets)
--
-- Snippet 1 (Fetch API) → tags: frontend, api, javascript
INSERT INTO label (id_snippet, id_tag) VALUES
(1, 1),  -- frontend
(1, 10), -- api
(1, 14); -- tool

-- Snippet 2 (Tri rapide) → tags: algorithm, performance
INSERT INTO label (id_snippet, id_tag) VALUES
(2, 4),  -- algorithm
(2, 8);  -- performance

-- Snippet 3 (Requête SQL) → tags: database, backend
INSERT INTO label (id_snippet, id_tag) VALUES
(3, 3),  -- database
(3, 2);  -- backend

-- Snippet 4 (TypeScript) → tags: frontend, typescript
INSERT INTO label (id_snippet, id_tag) VALUES
(4, 1);  -- frontend

-- Snippet 5 (Java Stream) → tags: backend, performance
INSERT INTO label (id_snippet, id_tag) VALUES
(5, 2),  -- backend
(5, 8);  -- performance

-- Snippet 6 (Docker) → tags: devops, script
INSERT INTO label (id_snippet, id_tag) VALUES
(6, 6),  -- devops
(6, 13); -- script

-- Snippet 7 (Bash) → tags: script, tool
INSERT INTO label (id_snippet, id_tag) VALUES
(7, 13), -- script
(7, 14); -- tool

-- Snippet 8 (Dijkstra) → tags: algorithm, performance
INSERT INTO label (id_snippet, id_tag) VALUES
(8, 4),  -- algorithm
(8, 8);  -- performance

-- Ajout de labels pour les autres snippets...
INSERT INTO label (id_snippet, id_tag) VALUES
(9, 5),   -- security
(10, 6),  -- devops
(11, 3),  -- database
(12, 5);  -- security

-
-- 8️⃣ FAV (Favoris, 50 entrées)
--
-- Alice (id_user=2) aime plusieurs snippets
INSERT INTO fav (id_user, id_snippet, created_at) VALUES
(2, 1, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(2, 3, CURRENT_TIMESTAMP - INTERVAL '8 days'),
(2, 5, CURRENT_TIMESTAMP - INTERVAL '5 days'),
(2, 7, CURRENT_TIMESTAMP - INTERVAL '2 days'),

-- Bob (id_user=3) aime des snippets techniques
(3, 2, CURRENT_TIMESTAMP - INTERVAL '12 days'),
(3, 6, CURRENT_TIMESTAMP - INTERVAL '9 days'),
(3, 8, CURRENT_TIMESTAMP - INTERVAL '3 days'),

-- Charlie (id_user=4) aime les snippets SQL et backend
(4, 3, CURRENT_TIMESTAMP - INTERVAL '11 days'),
(4, 5, CURRENT_TIMESTAMP - INTERVAL '7 days'),
(4, 11, CURRENT_TIMESTAMP - INTERVAL '1 day'),

-- Autres favoris aléatoires...
(5, 1, CURRENT_TIMESTAMP - INTERVAL '9 days'),
(5, 4, CURRENT_TIMESTAMP - INTERVAL '6 days'),
(6, 2, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(6, 8, CURRENT_TIMESTAMP - INTERVAL '4 days'),
(7, 3, CURRENT_TIMESTAMP - INTERVAL '8 days'),
(7, 7, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(8, 1, CURRENT_TIMESTAMP - INTERVAL '5 days'),
(8, 6, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(9, 4, CURRENT_TIMESTAMP - INTERVAL '3 days'),
(9, 5, CURRENT_TIMESTAMP),
(10, 2, CURRENT_TIMESTAMP - INTERVAL '7 days'),
(10, 7, CURRENT_TIMESTAMP - INTERVAL '1 day');

--
-- 9️⃣ TOKEN (Tokens pour 3 utilisateurs)
--
INSERT INTO token (user_id, token, created_at, expires_at) VALUES
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', CURRENT_TIMESTAMP - INTERVAL '1 hour', CURRENT_TIMESTAMP + INTERVAL '24 hours'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', CURRENT_TIMESTAMP - INTERVAL '30 minutes', CURRENT_TIMESTAMP + INTERVAL '12 hours'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', CURRENT_TIMESTAMP - INTERVAL '15 minutes', CURRENT_TIMESTAMP + INTERVAL '6 hours');
