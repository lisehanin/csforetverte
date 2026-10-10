# Résidence de la Forêt Verte — Livret d’accueil en ligne

Site statique (HTML/CSS/JS, sans dépendance ni outil de compilation) reprenant le livret d’accueil
des nouveaux résidents édité par le conseil syndical (octobre 2026).

## Publier sur GitHub Pages

1. Créez un dépôt sur GitHub (par exemple `livret-foret-verte`).
2. Déposez **le contenu** de ce dossier à la racine du dépôt (bouton *Add file → Upload files*),
   en conservant l’arborescence `assets/…` et le fichier `.nojekyll`.
3. Dans le dépôt : *Settings → Pages → Build and deployment*,
   choisissez *Deploy from a branch*, branche `main`, dossier `/ (root)`, puis *Save*.
4. Après une à deux minutes, le site est en ligne à l’adresse
   `https://<votre-compte>.github.io/livret-foret-verte/`.

## Arborescence

```
index.html                       page unique du livret
assets/css/style.css             mise en forme (charte du livret, responsive, impression)
assets/js/main.js                sommaire mobile, prochaine collecte, visionneuse d’images
assets/img/                      plan cadastral, vue aérienne, favicon
assets/livret-accueil-foret-verte.pdf   version PDF téléchargeable
.nojekyll                        désactive le traitement Jekyll de GitHub Pages
```

## Mettre à jour le contenu

Tout le texte se trouve dans `index.html`, découpé en rubriques commentées (`<!-- ===== 05 ===== -->`, etc.).
Pour changer un numéro, un e-mail ou un jour de collecte, modifiez directement le texte correspondant.
Si le jour de collecte change, ajustez aussi la ligne `var delta = (2 - dow + 7) % 7;` dans
`assets/js/main.js` (2 = mardi, 0 = dimanche … 6 = samedi).

Pensez à remplacer `assets/livret-accueil-foret-verte.pdf` par la nouvelle version du livret.
