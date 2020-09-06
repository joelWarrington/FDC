const initialState = {
  selectedHA: null,
  currentHazardAssessment: {},
};

const SELECT_HAZARD_ASSESSMENT = 'SELECT_HAZARD_ASSESSMENT';
export const selectHazardAssessment = hazardAssessment => ({
  type: SELECT_HAZARD_ASSESSMENT,
  payload: hazardAssessment,
});

const UPDATE_CURRENT_HAZARD_ASSESSMENT = 'UPDATE_CURRENT_HAZARD_ASSESSMENT';
export const updateCurrentHazardAssessment = currentHazardAssessment => ({
  type: UPDATE_CURRENT_HAZARD_ASSESSMENT,
  payload: currentHazardAssessment,
});

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_HAZARD_ASSESSMENT:
      return { ...state, selectedHA: payload };
    case UPDATE_CURRENT_HAZARD_ASSESSMENT:
      return { ...state, currentHazardAssessment: payload };
    default:
      return state;
  }
};
