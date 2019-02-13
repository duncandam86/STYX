export default {
  //* Individual emits
     connect: () => ({ connection: 'connected'     }),
  disconnect: () => ({ connection: 'not connected',}),

  seat : (index) => {
    //! the values ('left','right', ) are important as they relate to other object property keys
    const oppMap = Array(4);
    oppMap[(index+0)%4] = 'me'; //? unnecessary
    oppMap[(index+1)%4] = 'left';
    oppMap[(index+2)%4] = 'top';
    oppMap[(index+3)%4] = 'right';

    return {
      seatIndex: index,
      oppMap
    }
  },

  board: (board) => ({ board }),
  tiles: (tiles) => ({ tilesInHand: tiles }),
  
  //* Group emits
  ready: (status) => ({ gameReady: status }),

  turn: (index) => ({ whoseTurn: index }),
  
  players: (statuses) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;

    const newStatuses = {};
    statuses.forEach( (status,idx) => {
      newStatuses[state.oppMap[idx]] = status 
        ? `Player ${idx + 1}`
        : `..waiting..`
    });
    
    return {
      opponents: {...opponents, 
         left: {...left , status: newStatuses.left  },
          top: {...top  , status: newStatuses.top   },
        right: {...right, status: newStatuses.right }
      }
    }
  },

  colors: (colors) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;

    const newColors = {};
    colors.forEach( (colorSet,idx) => {
      newColors[state.oppMap[idx]] = colorSet
    });
     
    return {
      opponents: {...opponents,
         left: {...left , colors: newColors.left  },
          top: {...top  , colors: newColors.top   },
        right: {...right, colors: newColors.right },
      },

      // Player's colors
      colorQtys: newColors.me
    }
  },

  points: (points) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;

    const newPoints = {};
    points.forEach( (point, idx) => {
      newPoints[state.oppMap[idx]] = point
    });
     
    return {
      opponents: {...opponents,
         left: {...left , points: newPoints.left  },
          top: {...top  , points: newPoints.top   },
        right: {...right, points: newPoints.right },
      },

      // Player's points
      points: newPoints.me
    }
  },

  trades: (tradesValues) => ({ tradesValues }),

};