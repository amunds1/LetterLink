import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import fetchGameData from '../firebase/fetchGameData'
import { IGameContext } from './gameContext'

const updateWinner = async (gameContext: IGameContext) => {
  // Fetch game data from Firebase
  const gameData = await fetchGameData(gameContext.gameID)

  /* 
      Generate a list on the following format:

      [['player0_ID', totalPoints], ['player1_ID', totalPoints ]
    */
  const players: [string, number][] = Object.entries(gameData!.totalPoints)

  // ------ Determine the winner and update Game document in Firebase ------

  /*  
  ----- CASE 1 -----
  If player 0 wins: 
        - In GAME document
            1. Set winner to player0
        - In USER document for player 0
            2. Increment wins
            3. Increment you_won stats for player 1
            4. Update XP for player 0
        - In USER document for player 1
            5. Increment you_lost stats for player 0
            6. Update XP for player 1
    */
  if (players[0][1] > players[1][1]) {
    // 1. Update winner
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      winner: players[0][0],
    })
    // 2. Increment wins in user document in Firebase
    // 3. Increment you_won stats for player 0 in opponents dict
    // 4. Update XP for plyer 0
    await updateDoc(doc(db, 'users', players[0][0]), {
      wins: increment(1),
      experiencePoints: increment(players[0][1]),
      [`opponents.${players[1][0]}.youWon`]: increment(1),
    })
    // 5. Increment player 1´s you_lost stats for player 0
    // 6. Update XP for player 1
    await updateDoc(doc(db, 'users', players[1][0]), {
      experiencePoints: increment(players[1][1]),
      [`opponents.${players[0][0]}.youLost`]: increment(1),
    })
  } else if (players[0][1] < players[1][1]) {
    /* 
    ----- CASE 2 -----
    If player 1 wins: 
        - In GAME document
            1. Set winner to player1
        - In USER document for player 1
            2. Increment wins
            3. Increment you_won stats for player 0
            4. Update XP
        - In USER document for player 0
            5. Increment you_lost stats for player 1
            6. Update XP
    */

    // 1. Set winner to player 1
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      winner: players[1][0],
    })

    // 2. Increment wins in user document in Firebase
    // 3. Increment you_won stats for player 0
    // 4. Update XP for player 1
    await updateDoc(doc(db, 'users', players[1][0]), {
      wins: increment(1),
      experiencePoints: increment(players[1][1]),
      [`opponents.${players[0][0]}.youWon`]: increment(1),
    })

    // 5. Increment player 1´s you_lost stats for player 0
    // 6. Update XP for player 0
    await updateDoc(doc(db, 'users', players[0][0]), {
      experiencePoints: increment(players[0][1]),
      [`opponents.${players[1][0]}.youLost`]: increment(1),
    })
  } else {
    /*  
    ----- CASE 3 -----
    If the players have equal pointsscore:
        1. Update winner to draw
        2. Update XP for both players
     */

    // 1. Update winner to draw
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      winner: 'DRAW',
    })

    // 2. Update XP
    await updateDoc(doc(db, 'users', players[0][0]), {
      experiencePoints: increment(players[0][1]),
    })
    await updateDoc(doc(db, 'users', players[1][0]), {
      experiencePoints: increment(players[1][1]),
    })
  }
}

export default updateWinner

/* 

Regne ut you have beaten the most:

    beatenMost = {
        player: "player",
        wins: "wins"}

    opponents.map( (opponent) => {
        if (opponent.youWon > beatnMost.wins) {
            beatenMost = opponent
        }
    })



    Regne ut have beaten you the most:

    beatenYouMost = {
        player: "player",
        wins: "wins"}

    opponents.map( (opponent) => {
        if (opponent.youLost > beatnYouMost.wins) {
            beatenYouMost = opponent
        }
    })

*/
