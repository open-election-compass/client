export default {
  options: [
    {
      alias: 'strongly-approve',
      direction: 'positive',
      icon: 'grin',
      colors: {
        base: '#48BB78',
        contrast: '#FFFFFF',
        darker: '#2F855A',
        lighter: '#9AE6B4',
      },
    },
    {
      alias: 'approve',
      direction: 'positive',
      icon: 'smile',
      colors: {
        base: '#68D391',
        contrast: '#FFFFFF',
        darker: '#38A169',
        lighter: '#C6F6D5',
      },
    },
    {
      alias: 'neutral',
      direction: 'neutral',
      icon: 'meh-blank',
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
      icon: 'meh',
      colors: {
        base: '#FC8181',
        contrast: '#FFFFFF',
        darker: '#E53E3E',
        lighter: '#FED7D7',
      },
    },
    {
      alias: 'strongly-reject',
      direction: 'negative',
      icon: 'frown',
      colors: {
        base: '#F56565',
        contrast: '#FFFFFF',
        darker: '#C53030',
        lighter: '#FEB2B2',
      },
    },
  ],
  points: [
    [2.0, 1.5, 0.5, 0.5, 0.0],
    [1.5, 2.0, 0.5, 0.5, 0.5],
    [0.5, 0.5, 2.0, 0.5, 0.5],
    [0.5, 0.5, 0.5, 2.0, 1.5],
    [0.0, 0.5, 0.5, 1.5, 2.0],
  ],
};
