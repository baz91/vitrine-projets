# Studio Projets

Site vitrine développé avec Vue.js et Vuetify, conçu pour présenter une série de projets au travers d'un slider immersif plein écran.

## Fonctionnalités

- Navigation entre projets par :
  - glisser-déposer (swipe)
  - molette de souris
  - clavier (flèches gauche/droite)
  - boutons de navigation
  - indicateurs (dots)

- Défilement infini (loop)

- Changement automatique de projet avec barre de progression

- Effet de parallaxe sur les images de fond

- Adaptation dynamique des couleurs de l'interface à partir de l'image du projet affiché

- Header fixe avec menu déroulant et recherche de projets

- Footer fixe contenant les informations de contact et les réseaux sociaux

- Gestion centralisée des projets via Pinia

## Structure du projet

```text
src/
├── assets/
├── components/
│   ├── AppHeader.vue
│   └── AppFooter.vue
├── data/
├── router/
├── services/
│   └── color.service.js
├── stores/
│   └── project.store.js
├── views/
│   ├── HomeView.vue
│   └── ProjectView.vue
└── styles/
    └── global.css
```

## Gestion des projets

Les projets sont stockés dans le store Pinia.

Chaque projet possède la structure suivante :

```js
{
  id: 1,
  slug: "villa-horizon",
  title: "Villa Horizon",
  quote: "Architecture contemporaine en bord de mer",
  image: "/images/villa-horizon.jpg"
}
```

Pour ajouter un nouveau projet, il suffit d'ajouter un nouvel objet dans la liste des projets.

## Installation

```bash
npm install
```

## Lancement en développement

```bash
npm run dev
```

## Build de production

```bash
npm run build
```

## Technologies utilisées

- Vue 3
- Vue Router
- Pinia
- Vuetify
- Swiper.js
- Material Design Icons

## Objectif

Ce projet a été conçu comme une base simple et évolutive permettant à une entreprise de présenter ses réalisations de manière élégante, immersive et facilement maintenable.
