# Tutoriel React Grafikart

## La Syntaxe JSX
Le JSX permet d'écrire du React beaucoup plus simplement et d'éviter d'écrire "React.createElement" à chaque fois.
<br>
Mais le JSX est une syntaxe propre à React et qui n'est pas supportée par les navigateurs

## Documentation
Présente sur https://fr.reactjs.org/
- https://fr.reactjs.org/docs/react-component.html : On peut regarder toutes les fonctions disponibles dans un composant React

## Create React App
- npx create-react-app tuto-react : Crée une app React tuto-react
- npm start : Lancer le serveur sur le port 3000
- npm run build : Permet de générer les dossiers statiques. Avec des fichiers minifiés que l'on peut envoyer sur un serveur
- npm test : Tests unitaires
- npm eject : Permet de déstructurer le projet pour gérer la structure en profondeur.

## Parcel
- npx parcel index.html : Permet de lancer un serveur de développement
- npx parcel build index.html : Permet de construire les fichiers pour un serveur
- Fast refresh : permet de rafraichir la page en gardant en mémoire l'état des éléments

## Hooks
Permettent d'ajouter certaines fonctionnalités aux composants définis sous forme de fonction. Il résolvent 2 problèmes :
1. Lorsque que l'on crée un composant sous forme de fonction, il pourra prendre des propriétés mais il ne sera pas possible de lui donner un état local. Pour ça on doit créer une classe qui extends de React.Component et à l'intérieur on peut faire appel à state
2. On a souvent les même manipulations d'état à faire et vu que l'on utilise le système de classe ce n'est pas forcément évident d'extraire les choses (répétition de la logique pour différents composants)