# BulletLists
A tasklist tracker for creating small, meaningful, and reusable tasklists

## How to run

Ensure you have the Angular cli and Ionic cli. This is an Ionic 4.0 project, but it shouldn't make too much of a difference. Clone the repository and in the bulletlists folder run:

```
npm install
ionic serve
```

You can use the --lab flag to view on different devices, but I personally just use dev tools.

## What I learned

- The white screen of death is a fickle mistress. I had to do a fresh npm install to get the apk on board.
- config.xml guidelines for versioning and authoring my app. I had done this with Budgo but it had been awhile so a bit of a refresher.
- Ionic 4 is starting to depend much more on work from the angular packages. It's not generating from the angular cli which I heard it wasn't doing before, as well it switched to Angular routing. So consulting angular docs during bug issues can help narrow focus down.
- Events and storage management from ionic. Ionic in version 4 made a couple name changes and is now packaging under by @ionic/angular and @ionic/storage respectfully. Which is kind of great, their code is at the top of the node_modules folder.
-**Moment.js** - I'd heard good things and I really like it! Much better than the date parsing and millisecond counting of the Date object. Learned about diffing by days, formatting, a few things.

## What was used

-**Moment.js**
-**Ionic v4**
-**Angular v6**
-**Font Awesome**
-**Photoshop** (For design)

## Where I'd go with it

- I'd like to make tasklists underneath different sections (Cleaning lists, programming lists, self-improvement, etc)
- Under those sections have the tasklists moveable or instantly scrolled to
- Add the xml tag that keeps the thing from rotating when you turn it sideways. I really feel like that should be the standard.
- A stats page to say how many times you completed certain lists, an estimated time on tasklists that will be tracked and added everytime you complete a list, stuff like that.
