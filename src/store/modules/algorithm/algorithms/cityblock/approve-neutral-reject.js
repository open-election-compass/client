export default {
  options: [
    {
      alias: 'approve',
      direction: 'positive',
      icon: 'check',
      colors: {
        base: '#68D391',
        contrast: '#FFFFFF',
        lighter: '#C6F6D5',
        darker: '#38A169',
      },
    },
    {
      alias: 'neutral',
      direction: 'neutral',
      icon: 'minus',
      colors: {
        base: '#A0AEC0',
        contrast: '#FFFFFF',
        darker: '#718096',
        lighter: '#EDF2F7',
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
