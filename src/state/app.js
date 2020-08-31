const initialState = {
  selectedHA: null,
};

const SELECT_HAZARD_ASSESSMENT = 'SELECT_HAZARD_ASSESSMENT';
export const selectHazardAssessment = hazardAssessment => ({
  type: SELECT_HAZARD_ASSESSMENT,
  payload: hazardAssessment,
});

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_HAZARD_ASSESSMENT:
      return { ...state, selectedHA: payload };
    default:
      return state;
  }
};
