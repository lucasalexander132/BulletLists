# BulletLists
A tasklist tracker for creating small, meaningful, and reusable tasklists

## How to run

Ensure you have the Angular cli and Ionic cli. This is an Ionic 4.0 project, but it shouldn't make too much of a difference. Clone the repository and in the bulletlists folder run:

```
npm install
ionic serve
```

Or visit it here https://play.google.com/store/apps/details?id=io.bulletlists.lucasalexander

## What I learned

- Ionic 4 scrapped a lot of their scaffolding in favor of Angulars in the recent update
- I'm more passionate about coding than I am about studying for tests. I made this in 6 hours design and all (which is good for me)
- Translate for centering is pretty cool
- Communication between components creates dependence hierarchies I don't like looking at. I try to strive for components that can be as independent as possible, so though I love services, they still seem integral to some component structures. I want to look up alternative patterns that focus on component structure communication.

## What was used

- **Moment.js**
- **Angular v6**
- **Ionic v4**
- **HttpClient**
- **JSON**
- **Font Awesome**
- **Photoshop** (For design)

## Where I'd go with it

- Add a stats page! I want to know what bullet lists I'm doing the most. What day was my best day, what was my score yesterday, etc.
- Add taskist genres (cleaning, coding, music, etc.) and be able to reorder tasklists, delete whole generes without removing the below lists, delete whole genres with removal, editing.
- Add that stupid xml tag that keeps the view from rotating. That damn thing needs to be default.
- Make the menu hitbox bigger
- Make the menu area fixed with a higher z-index
