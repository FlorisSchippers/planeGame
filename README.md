# planeGame

## Instructies
Typescript game door middel van een singleton, een static utils class, een interface en strategy patterns
Assesser kan een fork maken en deze pullen om lokaal de ts files te compilen naar js
Vervolgens zullen deze in de docs folder te vinden zijn om te runnen in de browser


## Klassendiagram

![Klassendiagram](Klassendiagram.png?raw=true "Klassendiagram")


## Uitwerking

- Singleton: Van de game wordt een instance gemaakt die aan te spreken is in de Game class met getInstance()
- Static utils class: De Utils class heeft een static collision() method voor collision detection
- Interface: De Behavior interface waar de Empty en Carrying aan voldoen
- Strategy patterns: De Empty en Carrying classes volgen de Behavior interface met specifieke gamestate logica


## Speel

[Speel de game hier](https://florisschippers.github.io/planeGame/)