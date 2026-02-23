# Ikony pro bloky – Strapi Design System

Oficiální přehled ikon vychází z **[Strapi Design System – Icons](https://design-system.strapi.io/?path=/docs/foundations-icons-icons--docs)** a balíčku **[@strapi/icons](https://www.npmjs.com/package/@strapi/icons)**. V modalu „Create a component“ ve Strapi adminu se zobrazuje **podmnožina** těchto ikon v mřížce – ne všechny z balíčku jsou v pickeru vybratelné.

## Názvy ikon (pro pole `info.icon` ve schématu)

Do `cms/src/components/block/xxx.json` v poli `"icon": "..."` se uvádí název v **camelCase** (první písmeno malé). Např. `Layout` → `layout`, `BulletList` → `bulletList`.

### Ikony odpovídající mřížce v modalu „Create a component“

Následující seznam odpovídá ikonám, které jsou v administraci typicky vidět a vybratelné (řazení podle pozice v mřížce zleva doprava, shora dolů). Názvy jsou v camelCase pro přímé použití v `info.icon`:

**Řádek 1:** alien, gridNine, download, upload, arrowLeft, arrowRight, arrowUp, paperclip, bell, bold, briefcase, palette, bulletList, car  

**Řádek 2:** earth, image, clockCounterClockwise, check, clock, cloud, code, cog, expand, filter, crop, crown, coffee, cursor  

**Řádek 3:** emotionUnhappy, mail, eye, feather, crossCircle, filePdf, list  

**Řádek 4:** folder, castleTurret, gift, layout, handHeart, hashtag, headphones, heart, house, information, italic, key, image, list  

**Řádek 5:** lightbulb, link, lock, manyWays, message, microphone, moon, musicNotes, paperPlane, pencil, phone, pin, plane, plus, priceTag, question, quotes  

**Řádek 6:** restaurant, arrowsCounterClockwise, scissors, search, plant, shield, shoppingCart, graph, stack, star, more, sun, thumbDown, thumbUp  

**Řádek 7:** television, user, train, crossCircle, underline, volumeMute, volumeUp, wheelchair, play  

*(Pozn.: Přesné pořadí v UI může záviset na verzi Strapi; viz Design System pro aktuální podobu.)*

### Kompletní seznam názvů z @strapi/icons (camelCase)

Všechny ikony z balíčku (pro referenci; v modalu nemusí být všechny):

alien, archive, arrowClockwise, arrowDown, arrowLeft, arrowLineLeft, arrowLineRight, arrowRight, arrowUp, arrowsCounterClockwise, arrowsOut, bell, bold, book, briefcase, bulletList, calendar, car, caretDown, caretUp, cast, castleTurret, chartBubble, chartCircle, chartPie, check, checkCircle, checkCircleEmpty, chevronDown, chevronLeft, chevronRight, chevronUp, clock, clockCounterClockwise, cloud, cloudUpload, code, codeBlock, coffee, cog, collapse, command, crop, cross, crossCircle, crown, cursor, database, discuss, download, drag, duplicate, earth, earthStriked, emotionHappy, emotionUnhappy, expand, externalLink, eye, eyeStriked, faders, feather, file, fileCsv, fileError, filePdf, fileXls, fileZip, files, filter, folder, gift, globe, graph, graphQl, gridFour, gridNine, handHeart, hashtag, headingFive, headingFour, headingOne, headingSix, headingThree, headingTwo, headphones, heart, house, image, images, indentDecrease, indentIncrease, information, italic, key, layout, lightbulb, lightning, link, list, listPlus, listSearch, loader, lock, magic, mail, manyToMany, manyToOne, manyWays, message, microphone, minus, minusCircle, monitor, moon, more, move, musicNotes, numberList, oneToMany, oneToOne, oneWay, paintBrush, paintRoller, palette, paperPlane, paperclip, paragraph, pencil, phone, pin, pinMap, plane, plant, play, plus, plusCircle, presentationChart, priceTag, puzzlePiece, question, quotes, restaurant, rocket, scissors, sealCheck, search, server, shield, shirt, shoppingCart, signOut, slidersHorizontal, sparkle, squaresFour, stack, star, stethoscope, stop, store, strikeThrough, sun, television, thumbDown, thumbUp, train, trash, trendUp, typhoon, underline, upload, user, volumeMute, volumeUp, walk, warningCircle, webhooks, wheelchair

## Odkazy

- [Strapi Design System – Icons](https://design-system.strapi.io/?path=/docs/foundations-icons-icons--docs) – vizuální přehled
- [@strapi/icons na npm](https://www.npmjs.com/package/@strapi/icons) – zdroj názvů ikon
