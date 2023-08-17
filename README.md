# catan_map_master

![alt text](https://github.com/trett1004/catan_map_generator/blob/main/README_picture.jpg?raw=true)

## Description
This is a simple kept application generating the board/map for the popular board game "Settlers of Catan". You can shuffle the numbers and landfields to gernerate new maps for longlasting fun with the game.
There are already several of these map generators outthere in the internet. What I found missing them all was the social element that you can share and rate the maps.
So besides creating respectively shuffeling a new map you are also able to rate the map like for example on airbnb.

## How is the board layout created?
*Because this is sometimes asked:*
The board layout is created by using a row of rectangels that have a realation in width and height (height = width * cos(30)). Each rectangle is processed with css clippath/polygon to give it the hexagon shape based on that relational base (Each corner is clipped on its vertical side by heigth*0.25)
Each row (now a row of hexagons) has a bottom-margin and has an offset so the peaks of the hexagons can fit in the above row.

A good in detail explanation of this can be found here:
https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/

## Features
 - Shuffle the map
 - Rate the map
 - Open an already rated map from the table

## Usage
*It starts with the Shufflebutton above the board:*
Each time you press the shuffle button all landfields and numbers will be shuffled.
With each shuffle there will be a name assigned above the map. The names are auto-generated by a node module called "docker-names".

*Rate the map:*
Below the the map there is a star-rating and a button to submit.
If you submit a rating the below table of maps will be updated.

*Get a popular map:*
In the table of maps in each line you can select the respective map and display it.

## Technologies
Frontend:
- React
- Docker-names
- MUI

Backend:
- Node
- Express
- fs
- JSON

## Updates to come
- Implement Recaptcha
- Button for sharing a map

# Favicon Attribution
<a href="https://www.flaticon.com/free-icons/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a>



