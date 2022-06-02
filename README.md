![N|Solid](https://projet-7.dev-web.fr/assets/logo/logo.png)
# Groupomania
## _Projet 7 Openclassroom - Réseau social d'entreprise_


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Voici ce qui à été demandé:

- la présentation des fonctionnalités doit être simple
- la création d’un compte doit être simple et possible depuis un téléphone mobile
- le profil doit contenir très peu d’informations pour que sa complétion soit rapide
- la suppression du compte doit être possible
- l’accès à un forum où les salariés publient des contenus multimédias doit être présent
- l’accès à un forum où les salariés publient des textes doit être présent
- les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre
salariés

## Technologies utilisées:

-NodeJs

-VueJs

-MySQL


# INSTALLATION

## Prérequis:
Pour utiliser ce projet il vous faut sur votre machine:

- Git: https://git-scm.com/downloads
- Node.Js: https://nodejs.org/en/
- MySQL Command Line Client ou Workbench: https://dev.mysql.com/downloads/installer/

Créer un dossier vide puis cloner ce repository à l'intérieur : 
```
git clone https://github.com/SANBLEU/Groupomania-P7
```

## MySQL

Dans le dossier backend, créer un fichier .env et y mettre le contenu du fichier .env.example (contenu de celui-ci):
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=testOC
DB_NAME=groupomania
```
### Première possibilité:

Ouvrir MySQL Command Line Client puis effectuer ces deux lignes de commandes :
```
CREATE DATABASE groupomania;
USE groupomania;
```

Importer le fichier SQL_DB_GROUPOMANIA.sql qui se trouve à la racine du projet : 
```
source (chemin vers le fichier SQL_DB_GROUPOMANIA.sql);
```

### Deuxième possibilité:

Ouvrir MySQL Workbench se rendre dans l'onglet Data Import/Restore, selectionner la route du fichier SQL_DB_GROUPOMANIA.sql présent à la base du projet

Lancer l'importation du script SQL.

### Troisième possibilité (migration de la base de donnée avec les tables vides):

Après avoir installer les dépendances du back-end (notamment sequelize et sequelize-cli) lancer cette commande:
```
npx sequelize-cli db:migrate
```

## BACK-END
Ouvrir un terminal puis naviguer jusqu'au back-end depuis la racine du dossier du projet avec la commande: 
```
cd backend
```
Installer ensuite les dépendances du back-end et lancer le serveur avec les commandes:
```
npm install
npm start
```

## FRONT-END
Ouvrir un autre terminal puis naviguer jusqu'au front-end depuis la racine du dossier du projet avec la commande:
```
cd frontend
```

Installer ensuite les dépendances du front-end et lancer le serveur avec les commandes: 
```
npm install
npm run serve
```
Ouvrir le navigateur a l'adresse http://localhost:8080/

## Fonctionnalités:

Le site permet de:
-Créer un compte avec un pseudo, un email, un mot de passe.
-Modifier son compte ( sonpseudo, son email, son mot de passe)
-Partager des posts avec ou sans média (jpeg, jpg, png, gif).
-Supprimer son compte et ses posts.

Un compte admin est présent pour la modération ( suppression des posts des autres utilisateurs )
Voici les codes d'accès admin:
```
email: Admin@gmail.com
Mot de passe: Admin
```

Bonne visite sur Groupomania !


