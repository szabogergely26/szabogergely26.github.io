# Komment szintaxisok — gyors összefoglaló

| Szintaxis | Hol használható | Mi ez valójában |

|---|---|---|

| `<!-- -->` | Sima HTML részekben (a `<script>`/`<style>` tagen kívül) | HTML komment |
| `/* */` | `<script>` (JS) és `<style>` (CSS) blokkokban | JS/CSS komment |
| `//` | Csak `<script>` (JS) blokkban, egy soros | JS komment |
| `#` | Ez egyik fájlodban sem jellemző — ez inkább Python/Bash komment | — |

**Szabály:** nézd meg, milyen "burokban" vagy — ha `<script>` tagen belül dolgozol, `/* */` vagy `//`; ha kint vagy a scripten/style-on kívül, sima HTML-ben, akkor `<!-- -->`.

**Fontos csapda:** HTML kommenten (`<!-- -->`) belül nem lehet másik `<!-- -->`-t leírni szó szerint — a böngésző az első `-->`-nál lezárja a kommentet. Ha a kommenten belül be akarod mutatni ezt a szintaxist, írd le szövegesen (pl. "kacsacsőrrel kezdődő HTML komment"), ne magát a `-->` szekvenciát.
