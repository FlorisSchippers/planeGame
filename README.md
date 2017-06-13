# planeGame


## Instructies
- Typescript game waar gebruik gemaakt is van encapsulation, composition, inheritance, polymorphisme, een singleton, een observable met observers, strategy patterns, een interface, een abstract utils class, een static collision method, een namespace, enumerations en een library dat runt via een gameloop
- Assesser kan een fork maken en deze pullen om lokaal de ts files te compilen naar js
- Vervolgens zal de gecompilede js te vinden zijn in de docs folder om te runnen in een localhost browser


## Klassendiagram

![Klassendiagram](Klassendiagram2.png?raw=true "Klassendiagram")


## Uitwerking

- Encapsulation, composition, inheritance, polymorphisme: De game is opgebouwd met verschillende DOM elementen die allen overerven van de gameObject class, appended aan de body
- Singleton: Van de game wordt een instance gemaakt die aan te spreken is in de Game class met getInstance()
- Observers: 
- Strategy patterns: De Empty en Carrying classes volgen de Behavior interface met specifieke gamestate logica
- Interface: De Behavior interface waar de Empty en Carrying gedragen aan voldoen
- Abstract: De Utils class is abstract omdat er geen instance van gemaakt mag worden
- Static: De Utils class heeft een static collision() method voor collision detection
- Namespace: De enumerations heb ik in een namespace geplaatst zodat deze altijd duidelijk aan te roepen zijn
- Enumerations: Bevat een lijstje keyboard inputs zodat ik deze juist aan kan roepen met een custom label
- Library: Ik heb gebruik gemaakt van TweenLite voor animaties op het titelscherm
- Gameloop: Wordt 60 keer per seconde aangeroepen om locaties van game objecten op te daten en goed te tekenen in de browser


## Speel

[Speel de game hier](https://florisschippers.github.io/planeGame/)


## Peer review week 4

### Beoordeling

- Singleton is goed en volgens de norm toegepast
- Static Utils class is ook op de goede manier toegepast
- De behaviour interface word ook goed toegepast in het project
- Strategy patterns zijn ook goed toegepast

De onderwerpen van vorig jaar worden ook in de code goed gebruikt

Het project is zeker voldoende. Alle eisen zijn goed toegepast en uitgewerkt

### Verbeteringen

- Een onnodige if statement verwijderd
- Ghost box probleem (Nadat de box weg was bleef hij op te pakken) is opgelost
- Er kan nu geen box meer spawnen die bestemt is voor het vliegveld waar hij spawned (Poging tot gedaan, later volledig opgelost)


## Peer review week 7

### Beoordeling

.

### Verbeteringen

.