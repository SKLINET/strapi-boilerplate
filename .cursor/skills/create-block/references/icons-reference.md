# Block Icons - Strapi Design System

The official icon overview comes from **[Strapi Design System - Icons](https://design-system.strapi.io/?path=/docs/foundations-icons-icons--docs)** and the **[@strapi/icons](https://www.npmjs.com/package/@strapi/icons)** package. In the Strapi admin "Create a component" modal, only a **subset** of these icons appears in the picker grid.

## Icon names (for `info.icon` in schema)

In `cms/src/components/block/xxx.json`, set `"icon": "..."` using **camelCase** names (lowercase first letter). Example: `Layout` -> `layout`, `BulletList` -> `bulletList`.

### Icons matching the "Create a component" picker grid

The list below matches icons typically visible/selectable in admin (ordered by grid position left-to-right, top-to-bottom). Names are in camelCase for direct use in `info.icon`:

**Row 1:** alien, gridNine, download, upload, arrowLeft, arrowRight, arrowUp, paperclip, bell, bold, briefcase, palette, bulletList, car

**Row 2:** earth, image, clockCounterClockwise, check, clock, cloud, code, cog, expand, filter, crop, crown, coffee, cursor

**Row 3:** emotionUnhappy, mail, eye, feather, crossCircle, filePdf, list

**Row 4:** folder, castleTurret, gift, layout, handHeart, hashtag, headphones, heart, house, information, italic, key, image, list

**Row 5:** lightbulb, link, lock, manyWays, message, microphone, moon, musicNotes, paperPlane, pencil, phone, pin, plane, plus, priceTag, question, quotes

**Row 6:** restaurant, arrowsCounterClockwise, scissors, search, plant, shield, shoppingCart, graph, stack, star, more, sun, thumbDown, thumbUp

**Row 7:** television, user, train, crossCircle, underline, volumeMute, volumeUp, wheelchair, play

*(Note: exact UI order can vary by Strapi version; check Design System for current state.)*

### Full name list from `@strapi/icons` (camelCase)

All icons from the package (reference only; not all may appear in picker):

alien, archive, arrowClockwise, arrowDown, arrowLeft, arrowLineLeft, arrowLineRight, arrowRight, arrowUp, arrowsCounterClockwise, arrowsOut, bell, bold, book, briefcase, bulletList, calendar, car, caretDown, caretUp, cast, castleTurret, chartBubble, chartCircle, chartPie, check, checkCircle, checkCircleEmpty, chevronDown, chevronLeft, chevronRight, chevronUp, clock, clockCounterClockwise, cloud, cloudUpload, code, codeBlock, coffee, cog, collapse, command, crop, cross, crossCircle, crown, cursor, database, discuss, download, drag, duplicate, earth, earthStriked, emotionHappy, emotionUnhappy, expand, externalLink, eye, eyeStriked, faders, feather, file, fileCsv, fileError, filePdf, fileXls, fileZip, files, filter, folder, gift, globe, graph, graphQl, gridFour, gridNine, handHeart, hashtag, headingFive, headingFour, headingOne, headingSix, headingThree, headingTwo, headphones, heart, house, image, images, indentDecrease, indentIncrease, information, italic, key, layout, lightbulb, lightning, link, list, listPlus, listSearch, loader, lock, magic, mail, manyToMany, manyToOne, manyWays, message, microphone, minus, minusCircle, monitor, moon, more, move, musicNotes, numberList, oneToMany, oneToOne, oneWay, paintBrush, paintRoller, palette, paperPlane, paperclip, paragraph, pencil, phone, pin, pinMap, plane, plant, play, plus, plusCircle, presentationChart, priceTag, puzzlePiece, question, quotes, restaurant, rocket, scissors, sealCheck, search, server, shield, shirt, shoppingCart, signOut, slidersHorizontal, sparkle, squaresFour, stack, star, stethoscope, stop, store, strikeThrough, sun, television, thumbDown, thumbUp, train, trash, trendUp, typhoon, underline, upload, user, volumeMute, volumeUp, walk, warningCircle, webhooks, wheelchair

## Links

- [Strapi Design System - Icons](https://design-system.strapi.io/?path=/docs/foundations-icons-icons--docs) - visual overview
- [@strapi/icons on npm](https://www.npmjs.com/package/@strapi/icons) - source of icon names
