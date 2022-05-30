# p5Book

## what is p5Book?

it is a single file, Book.js, that provides an easy way to add a multipage book, with pictures!

- Adds a book class, which takes in a json file to set the titles, images, and page text

## installing Book.js

- copy book.js to your solution tree
- include the script in your html After the p5.js library and before the script that will use it

- create a book object and load in the json file:

```
book = new Book();
LoadBookJSON("data/tutorial.json",book);
```
- add the check clicks function to the mousePressed Event:
```
function mousePressed(){
book.CheckClicks(mouseX,mouseY);
}
```

- add the book.Draw call to the draw loop
```
function draw(){
    book.Draw();   
}
```

## Setting up the json file

```
{   "imagesDir":"images",

    "pages":[
        {
            "title":"test1",
            "icon":"cool.png",
            "body":"this is the Main Menu. it can be navigated with Q and E"
        },
        {
            "title":"asteroids",
            "icon":"click_asteroid.png",
            "body":"clicking asteroids cause the asteroid to fall to the planet. it will then provide ice once it collides."
        },
        {
            "title":"farmland laser",
            "icon":"changing to farmland.png",
            "body":"pressing space activates the laser, sweeping across the land lowers it and sets it to farmland"
        }
        
    ]
}
```
- set "imagesDir" to the images directory that the pages will pull from
- edit, add and delete pages from the "pages" add array
- each page element has "title" for title, "icon" for the image located in the imagesDir, and "body" for the page text
