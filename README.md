# CorsoFleuri - Application de Gestion de Restaurant

## Description

Application web pour la prise de commande interface du type McDo, incluant la gestion des menus, produits, commandes et impression de tickets en back-office.

## Prérequis

- Node.js (version 14 ou supérieure)
- MySQL Server
- Une imprimante thermique compatible ESC/POS connectée via Bluetooth (port COM5 par défaut)

### Installer les dépendances du serveur

Naviguez vers le dossier `server` et installez les packages Node.js :

```bash
cd server
npm install
```

Les packages suivants seront installés :

- `express` : Framework web pour Node.js
- `cors` : Middleware pour gérer les requêtes CORS
- `mysql2` : Pilote MySQL pour Node.js
- `node-thermal-printer` : Bibliothèque pour l'impression thermique
- `serialport` : Bibliothèque pour la communication série (nécessaire pour l'imprimante)

### 4. Configuration de l'imprimante

- L'application utilise une imprimante thermique connectée via Bluetooth sur le port COM5.
- Vérifiez dans le Gestionnaire de périphériques Windows que l'imprimante est bien connectée et sur le port COM5.
- Si votre imprimante utilise un port différent, modifiez la constante `PRINTER_COM_PORT` dans `server/services/printService.js`.

## Lancement du serveur

Depuis la racine du projet, naviguez vers le dossier `server` et lancez l'application :

```bash
cd server
node app.js
```
