const initialState = {
  selectedGame: null,
}

const SELECT_GAME = 'SELECT_GAME'
export const selectGame = game => ({ type: SELECT_GAME, payload: game })

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SELECT_GAME:
      return { ...state, selectedGame: payload }
    default:
      return state
  }
}
