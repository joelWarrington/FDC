const initialState = {
  selectedHA: null,
  currentHazardAssessment: {},
  currentDailyReport: {},
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

const UPDATE_CURRENT_DAILY_REPORT = 'UPDATE_CURRENT_DAILY_REPORT';
export const updateCurrentDailyReport = currentDailyReport => ({
  type: UPDATE_CURRENT_DAILY_REPORT,
  payload: currentDailyReport,
});

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_HAZARD_ASSESSMENT:
      return { ...state, selectedHA: payload };
    case UPDATE_CURRENT_HAZARD_ASSESSMENT:
      return { ...state, currentHazardAssessment: payload };
    case UPDATE_CURRENT_DAILY_REPORT:
      return { ...state, currentDailyReport: payload };
    default:
      return state;
  }
};
