# game-of-life
Recreating Game of Life, a zero player game devised by Mathematician John Conway.

## Inspiration
 
I've always been intrigued by the uncertainties and loopholes of mathematics. Recently I came across [this video by Veritasium](https://www.youtube.com/watch?v=HeQX2HjkcNo) that discusses the flaws of mathematics and how modern day computers came to be. From this video, I came to know about [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). It is an amazing zero player game that illustrates why some things in maths can never be proved or solved.

## What it does

This project let's a user play and visualize the Game of Life.
Game of Life is a cellular automation devised by mathematician [John Horton Conway](https://en.wikipedia.org/wiki/John_Horton_Conway). It is a zero-player game, i.e. after we provide an initial pattern of cells as an input, it evolves on it's own into creates beautiful patterns.

**The Game of Life works as follows**

- The game plays out with an infinite grid of cells. 
- Each cell is either a live cell, or a dead cell.
- We provide an initial pattern (known as generation) of live cells 
- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

With this project, the player can also pause or reset the cellular automation.

What's interesting about the game is that once the initial pattern is provided, there's no way to know if the pattern will ever stop or just keep on changing forever. The Game of Life is Turing complete, and one can build a Turing machine or any other device (like a rifle shooter) inside game of life. We can also build Game of Life inside Game of Life! Such a simple mechanism, but so powerful! I knew I had to build it. 

## How I built it

I built this game with JavaScript with the help of [CreateJS](https://createjs.com/) Library. CreateJS easily lets you work with HTML canvas and provides all sorts of features to build cool games! I started out by setting up the style of my canvas and initializing the infinite cell grid. Everything else was interfaced based on user input and then the cells play out their lives based on how many neighbours they have.

## Challenges I ran into

I don't use javaScript frequently, so I ran into several issues because of my unfamiliarity with it. Moreover, this was my first time using CreateJS, so progress was slow in the beginning. Luckily the learning curve the library isn't very steep.
 
## Accomplishments that I am proud of

I am quite proud that I was able to work efficiently and create a working project even though I had no prior experience with the library I used. I am also glad that I was able to achieve more than I initially expected, and that I was able to work with the same determination throughout the weekend.  

## What I learned

This was my first time using CreateJS, so learning it was so much fun. I also learnt about incredibly useful functions for debugging JavaScript code. I got in touch with few participants from the hackathon and was able to learn a lot from their work.
 
## What's next for Game Of Life

I want to work on improving the UX of this project. I want to add features that can allow a player to save their patterns, import patterns or resize the grid. 
