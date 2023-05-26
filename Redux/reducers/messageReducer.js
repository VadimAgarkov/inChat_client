const initialState = {
  messages: [],
  topHasMore: true,
  bottomHasMore: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_INITIAL_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    case 'LOAD_MORE_NEXT_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case 'LOAD_MORE_PREVIOUS_MESSAGES':
      return {
        ...state,
        messages: [...action.payload, ...state.messages],
      };
    case 'TOP_HAS_MORE':
      return {
        ...state,
        topHasMore: action.payload,
      };
    case 'BOTTOM_HAS_MORE':
      console.log('Reduser => SetBottomHasMore:', action.payload)
      return {
        ...state,
        bottomHasMore: action.payload,
      };
    default:
      return state;
  }

};

export default reducer;