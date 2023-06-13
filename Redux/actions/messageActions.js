export const loadInitialMessages = (messages) => ({
  type: 'LOAD_INITIAL_MESSAGES',
  payload: messages,
});

export const loadMoreNextMessages = (messages) => ({
  type: 'LOAD_MORE_NEXT_MESSAGES',
  payload: messages,
});

export const loadMorePreviousMessages = (messages) => ({
  type: 'LOAD_MORE_PREVIOUS_MESSAGES',
  payload: messages,
});

export const setTopHasMore = (topHasMore) => ({
  type: 'TOP_HAS_MORE',
  payload: topHasMore,
});

export const setBottomHasMore = (bottomHasMore) => ({
  type: 'BOTTOM_HAS_MORE',
  payload: bottomHasMore,
});

export const setUserData = (userData) => ({
  type: 'USER_DATA',
  payload: userData,
});