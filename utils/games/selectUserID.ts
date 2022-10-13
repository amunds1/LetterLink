const selectUserID = (
  authenticatedUserID: string,
  player1UserID: string,
  player2UserID: string
) => (authenticatedUserID == player2UserID ? player1UserID : player2UserID)

export default selectUserID
