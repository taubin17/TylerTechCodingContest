/*
NOTE: This is for development purposes only, final submission should be done through the submission tab

Fill in the contents of main with your strategy
The contents of gameState and side can be found by viewing interfaces.ts IGameState and Side interfaces (also included in this comment)
gameState represents the current state of the game (all tiles, all teams)
side will tell you which team is yours
main should return an array of MoveDirection's (also found in interfaces.ts) with size = # of monsters on one team to start

Take a look at other example scripts to get some ideas on how to leverage this data

export interface IGameState {
  boardSize: [number, number];
  tileStates: TileState[][];
  teamStates: TeamStates;
}

export enum TileState {
  Good = 3,
  Warning = 2,
  Danger = 1,
  Broken = 0,
}

export enum Side {
  Home = 'home',
  Away = 'away',
}

export enum MoveDirection {
  North = 'north',
  South = 'south',
  East = 'east',
  West = 'west',
  None = 'none',
}

export type TeamStates = Record<Side, ITeamMemberState[]>;

export interface ITeamMemberState {
  coord: Coord;
  isDead: boolean;
}

export type Coord = [number, number];


*/

// do not include "export const developmentScript = " with your submission
//`
let turns = -1;
let player_moves = [];
let usable_tiles = [];
let x = 0;
let y = 0;
let highest_health = 0;
let current_health = 0;
let direction = '';


//console.log('Hello');

function main(gameState, side) {
    const myTeam = gameState.teamStates[side];
    const [rowSize, colSize] = gameState.boardSize;
    var tile_status = gameState.tileStates;
    //console.log('New Turn');
    //document.write('Hello');
    turns++;

    var health_nearby = {};

    var x1 = myTeam[1].coord[0];
    var y1 = myTeam[1].coord[1];

    var x2 = myTeam[2].coord[0];
    var y2 = myTeam[2].coord[1];

    player_moves.length = 0;




    for (var i = 0; i < 3; i++)
    {

      //If theyre dead don't add them to current location, and set there move
      
      if (myTeam[i].isDead) {
        console.log('Player', i, 'is Dead!');
        player_moves.push('none');
      
      }

      //return ['north','south','north'];
  
      
      //Check up, down, left, or right

      
      // Variables for player x and y
      x = myTeam[i].coord[0];
      y = myTeam[i].coord[1];

      current_health = gameState.tileStates[x][y];

      //current_health = 0;
      //direction = 'none';


      

    
      // Find which nearest tile is healthiest
      if (x - 1 >= 0) {

        health_nearby["north"] = tile_status[x-1][y];

      }
      else {


        health_nearby["north"] = 0;

      }
    
      
      if (x + 1 <= rowSize - 1) {

        health_nearby["south"] = tile_status[x+1][y];

      }
      
      else {


        health_nearby["south"] = 0;

      }
      
      if ((y - 1) >= 0) {

        health_nearby["west"] = tile_status[x][y-1];

      }

      else {


        health_nearby["west"] = 0;

      }
      
      if (y + 1 <= colSize - 1) {

        health_nearby["east"] = tile_status[x][y+1];

      }
    
      else {


        health_nearby["east"] = 0;

      }
      
      if (current_health == 1) {
        for (var key in health_nearby) {

          if (i == 2) {
            
            if (key == 'east'){
              console.log('Sprite 2 sees heatlh: ', health_nearby[key], ' to the east')
            }

          }

          ////console.log(health_nearby[key], current_health, 'Player', i)
 
          if (health_nearby[key] == null || health_nearby[key] == 0) {
            continue;
          }


          if (health_nearby[key] > current_health) {
              //console.log('New square found');
              current_health = health_nearby[key];
              //console.log(key);
              direction = key;
              //player_moves.push(direction);
              //break;
          }
          //else {

            //current_health = current_health;
            //direction[i] = 'none';


          //}

        
        }

        player_moves.push(direction)

      }
      else {
        direction = 'none';
      }
    
    
    }
    
    return [player_moves[0], player_moves[1], player_moves[2]];
  }

 
//`;
