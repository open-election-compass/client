export default {
  options: [
    {
      alias: 'approve',
      direction: 'positive',
      icon: 'check',
      colors: {
        base: '#68D391',
        contrast: '#FFFFFF',
        darker: '#38A169',
        lighter: '#C6F6D5',
      },
    },
    {
      alias: 'partly',
      direction: 'neutral',
      icon: 'minus',
      colors: {
        base: '#ECC94B',
        contrast: '#FFFFFF',
        darker: '#D69E2E',
        lighter: '#FEEBC8',
      },
    },
    {
      alias: 'reject',
      direction: 'negative',
      icon: 'times',
      colors: {
        base: '#FC8181',
        contrast: '#FFFFFF',
        darker: '#E53E3E',
        lighter: '#FED7D7',
      },
    },
  ],
  points: [
    [2, 1, 0],
    [1, 2, 1],
    [0, 1, 2],
  ],
};
