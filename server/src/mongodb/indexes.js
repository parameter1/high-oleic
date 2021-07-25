module.exports = {
  'crop-comparisons': [
    { createdByEmail: 1 },
  ],
  farms: [
    { updatedAt: 1, _id: 1 },
    [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],

  ],
  'farm-fields': [
    { 'report._id': 1 },

    { cropType: 1, _id: 1 },
    { acres: 1, _id: 1 },
    { updatedAt: 1, _id: 1 },
  ],
  'grain-elevators': [
    { location: '2dsphere' },
    [{ 'location.coordinates.0': 1, 'location.coordinates.1': 1 }, { unique: true }],

    { companyName: 1, _id: 1 },
    { affiliate: 1, _id: 1 },
  ],
  'postal-code-locations': [
    [{ value: 1 }, { unique: true }],
  ],
  reports: [
    { 'farm._id': 1 },

    [{ 'farm.name': 1, _id: 1 }, { collation: { locale: 'en_US' } }],
    { updatedAt: 1, _id: 1 },
  ],
};
