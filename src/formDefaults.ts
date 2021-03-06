import moment from 'moment';

const defaults = {
  project: '',
  station: '',
  location: {
    latitude: '',
    longitude: '',
  },
  submissionDate: moment().format('YYYY-MM-DD[T]HH:mm'),
  additionalComment: '',
  attachments: [],
};

export const hazardAssessmentDefaultValues = {
  ...defaults,
  ownerOnSite: false,
  mitigationSteps: '',
  hazards: [
    { label: 'COVID-19', risk: 'N/A' },
    { label: 'Heights Over 3 Meters', risk: 'N/A' },
    { label: 'Hot Materials', risk: 'N/A' },
    { label: 'Open Flame', risk: 'N/A' },
    { label: 'Debris', risk: 'N/A' },
    { label: 'Chemical Hazards', risk: 'N/A' },
    { label: 'Biological Hazards', risk: 'N/A' },
    { label: 'Inadequate Lighting', risk: 'N/A' },
    { label: 'Confined Spaces', risk: 'N/A' },
    {
      label: 'Weather Conditions',
      name: 'weather-conditions',
      risk: 'N/A',
    },
    { label: 'Moving Equipment', name: 'moving-equipment', risk: 'N/A' },
  ],
  miscHazards: [
    { label: 'Natural Gas is on', checked: true },
    { label: 'Propane is on', checked: true },
    { label: 'Water is on', checked: true },
    { label: 'Structure is intact', checked: true },
    { label: 'Site is secure', checked: true },
  ],
  PPE: [
    {
      name: 'Hard Hat',
      description:
        'Protect the head from injury due to falling objects, impact with other objects, debris, rain, and electric shock',
      required: true,
      checked: false,
    },
    {
      name: 'Steel Toe Boots',
      description:
        'Protective reinforcement in the toe which protects the foot from falling objects or compression',
      required: true,
      checked: false,
    },
    {
      name: 'High Visibility Vest',
      description:
        'Provide visibility of the person wearing it in low day light or in the dark when illuminated',
      required: true,
      checked: false,
    },
    {
      name: 'Eye Protection',
      description:
        'Protective gear for the eyes, and sometimes face, designed to reduce the risk of injury',
      required: true,
      checked: false,
    },
    {
      name: 'Tool Lanyards',
      description: 'Easy way to tether tools and prevent dropped objects',
      checked: false,
    },
    {
      name: 'Hearing Protection',
      description:
        'Used to reduce (attenuate) noise reaching the wearer’s ear, reducing the risk of hearing damage from excessive noise',
      checked: false,
    },
    {
      name: 'Respiratory Protection',
      description:
        'A respirator is a protective device that covers the nose and mouth or the entire face or head to guard the wearer against hazardous atmospheres',
      checked: false,
    },
    {
      name: 'Respiratory Protection',
      description:
        'A respirator is a protective device that covers the nose and mouth or the entire face or head to guard the wearer against hazardous atmospheres',
      checked: false,
    },
    {
      name: 'Hand Protection',
      description:
        'A garment to protect and cover the hand from hazardous conditions such as sharp edges, pinch points, rotary machinery, hot objects, electricity, splinters and chemicals',
      checked: false,
    },
    {
      name: 'Gas Monitors',
      description:
        'Used to detect combustible, flammable and toxic gases, and oxygen depletion',
      checked: false,
    },
  ],
  isItSafeToProceed: false,
  safeToProceedExplanation: '',
};

export const dailyReportDefaultValues = {
  ...defaults,
  weather: [
    { name: 'Cloudy', checked: false },
    { name: 'Dusty', checked: false },
    { name: 'Fog', checked: false },
    { name: 'Rainy', checked: false },
    { name: 'Sunny', checked: false },
    { name: 'Snow', checked: false },
  ],
  contractors: [
    {
      name: '',
      count: 0,
      isPrime: false,
    },
  ],
  visitors: [],
  equipment: [],
};

export const requestForInformation = {
  ...defaults,
};
