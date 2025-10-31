CREATE TABLE users (
   id_user SERIAL,
   email VARCHAR(320) NOT NULL,
   username VARCHAR(50) NOT NULL,
   password_hash VARCHAR(255) NOT NULL,
   first_name VARCHAR(250),
   last_name VARCHAR(250),
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(id_user),
   UNIQUE(email),
   UNIQUE(username)
);

CREATE TABLE tag (
   id_tag SERIAL,
   name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_tag),
   UNIQUE(name)
);

CREATE TABLE token (
   id_token SERIAL,
   user_id INTEGER NOT NULL,
   token VARCHAR(255) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   expires_at TIMESTAMP NOT NULL,
   PRIMARY KEY(id_token),
   UNIQUE(user_id),
   FOREIGN KEY(user_id) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE visibility (
   id_visibility SERIAL,
   type VARCHAR(20) NOT NULL CHECK (type IN ('public', 'private', 'unlisted')),
   PRIMARY KEY(id_visibility)
);

CREATE TABLE languages (
   id_language SERIAL,
   name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_language),
   UNIQUE(name)
);

CREATE TABLE snippet (
   id_snippet SERIAL,
   title VARCHAR(250) NOT NULL,
   description VARCHAR(500) NOT NULL,
   code TEXT NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   id_visibility INTEGER NOT NULL,
   id_language INTEGER NOT NULL,
   id_user INTEGER NOT NULL,
   PRIMARY KEY(id_snippet),
   FOREIGN KEY(id_visibility) REFERENCES visibility(id_visibility) ON DELETE RESTRICT,
   FOREIGN KEY(id_language) REFERENCES languages(id_language) ON DELETE RESTRICT, 
   FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE comment (
   id_comment SERIAL,
   content VARCHAR(1000) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   id_snippet INTEGER NOT NULL,
   id_user INTEGER NOT NULL,
   PRIMARY KEY(id_comment),
   FOREIGN KEY(id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE,
   FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE label (
   id_snippet INTEGER NOT NULL,
   id_tag INTEGER NOT NULL,
   PRIMARY KEY(id_snippet, id_tag),
   FOREIGN KEY(id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE,
   FOREIGN KEY(id_tag) REFERENCES tag(id_tag) ON DELETE CASCADE
);

CREATE TABLE fav (
   id_user INTEGER NOT NULL,
   id_snippet INTEGER NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(id_user, id_snippet),
   FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE,
   FOREIGN KEY(id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE
);
