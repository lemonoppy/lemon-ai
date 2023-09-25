
# Lemon AI

Not actually AI in any sense, it's a collection of tooling and utilities for the [ISFL](https://forums.sim-football.com/)!

Started out as a way to make a last minute meme mock draft, it's now a full fledged tool for importing the draft spreadsheets to spit out wiki articles for that cool 5 mil in ISFL cash.




## Usage/Examples

There are currently 2 functions available with Lemon-AI, one for generating a weighted mock draft, and another for generating DSFL draft pages.


Create a weighted mock (this will change soon)
```javascript
npm run start
```

Create a DSFL draft wiki page.
You can either change the import in `/app/data/wiki-output.js` or add the filename as an argument in the command.

Fallback import of data will be from the `/app/data/wiki-output.js` import if the file is not found.
```javascript
npm run wiki
```
```javascript
npm run wiki s43dsfl.js
```