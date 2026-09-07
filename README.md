# AnimeCards

Eine fertige, statische Character-Card-Website für GitHub Pages.

## Dateien

- `index.html` = Website
- `style.css` = komplettes Design
- `script.js` = Suche, Filter, Cards und Detail-Popup
- `data/characters.json` = Charakter-Daten
- `characters/` = hier kommen deine Bilder rein

## Charakter hinzufügen

Bild z.B.:

`characters/my-character.jpg`

Dann in `data/characters.json`:

```json
{
  "id": "my-character",
  "name": "My Character",
  "series": "My Anime",
  "rarity": 5,
  "element": "Fire",
  "weapon": "Sword",
  "role": "DPS",
  "image": "characters/my-character.jpg",
  "description": "Beschreibung"
}
```

Die Website erzeugt daraus automatisch dieselbe Card.

## GitHub Pages

1. Repository auf GitHub erstellen.
2. Alle Dateien hochladen.
3. Settings → Pages.
4. Source auf `Deploy from a branch`.
5. Branch `main`, Ordner `/ (root)`.
6. Speichern.

Keine Installation und kein Build nötig.

## Bilder

Du kannst JPG, PNG oder WebP verwenden.

Die Website lädt keine Bilder automatisch herunter. Du setzt deine eigenen Bilder in `characters/`.
