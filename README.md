# planeGame

## Instructies
- Typescript game door middel van een singleton, een static utils class, een interface en strategy patterns
- Assesser kan een fork maken en deze pullen om lokaal de ts files te compilen naar js
- Vervolgens zullen deze in de docs folder te vinden zijn om te runnen in de browser


## Klassendiagram

![Klassendiagram](Klassendiagram.png?raw=true "Klassendiagram")


## Uitwerking

- Singleton: Van de game wordt een instance gemaakt die aan te spreken is in de Game class met getInstance()
- Static utils class: De Utils class heeft een static collision() method voor collision detection
- Interface: De Behavior interface waar de Empty en Carrying aan voldoen
- Strategy patterns: De Empty en Carrying classes volgen de Behavior interface met specifieke gamestate logica


## Speel

[Speel de game hier](https://florisschippers.github.io/planeGame/)

## Beoordeling

Singleton is goed en volgens de norm toegepast.
Static class: de Utils class is ook op de goede manier toegepast.
De behaviour interface word ook goed toegepast in het project
Strategy patterns zijn ook goed toegepast

De onderwerpen van vorig jaar worden ook in de code goed gebruikt. 

Het project is zeker voldoende. Alle eisen zijn goed toegepast en uitgewerkt. 

## Verbeteringen

- een onnodige if statement verwijderd.
- Ghost box probleem(Nadat de box weg was bleef hij op te pakken) opgelost.
- Er kan nu geen box meer spawnen die bestemt is voor het vliegveld waar hij spawned. 