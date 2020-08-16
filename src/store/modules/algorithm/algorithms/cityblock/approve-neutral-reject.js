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
      locales: {
        en: {
          button: 'Approve',
          'button-aria': 'Approve – click here to approve this thesis!',
          badge: 'You approved',
          'badge-aria': 'You approved this thesis.',
          status: 'approves',
          'answer-aria': 'The party \'{party}\' approves this thesis with the following answer: {answer}',
        },
        de: {
          button: 'Zustimmung',
          'button-aria': 'Zustimmung – klicke hier, um dieser These zuzustimmen!',
          badge: 'Du hast zugestimmt',
          'badge-aria': 'Du hast dieser These zugestimmt.',
          status: 'stimmt zu',
          'answer-aria': 'Die Partei \'{party}\' stimmt dieser These zu mit der folgenden Begründung: {answer}',
        },
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
      locales: {
        en: {
          button: 'Neutral',
          'button-aria': 'Neutral – click here to remain neutral regarding this thesis!',
          badge: 'You we\'re neutral',
          'badge-aria': 'You we\'re neutral regarding this thesis.',
          status: 'neutral',
          'answer-aria': 'The party \'{party}\' remains neutral to this thesis, providing the following answer: {answer}',
        },
        de: {
          button: 'Neutral',
          'button-aria': 'Neutral – klicke hier, um bei dieser These neutral zu bleiben!',
          badge: 'Du warst neutral',
          'badge-aria': 'Du warst zu dieser These neutral.',
          status: 'neutral',
          'answer-aria': 'Die Partei \'{party}\' bleibt bei dieser These neutral, mit der folgenden Begründung: {answer}',
        },
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
      locales: {
        en: {
          button: 'Reject',
          'button-aria': 'Reject – click here to reject this thesis!',
          badge: 'You rejected',
          'badge-aria': 'You rejected this thesis.',
          status: 'rejects',
          'answer-aria': 'The party \'{party}\' rejects this thesis with the following answer: {answer}',
        },
        de: {
          button: 'Ablehnung',
          'button-aria': 'Ablehnung – klicke hier, um diese These abzulehnen!',
          badge: 'Du hast abgelehnt',
          'badge-aria': 'Du hast diese These abgelehnt.',
          status: 'lehnt ab',
          'answer-aria': 'Die Partei \'{party}\' lehnt diese These ab mit der folgenden Begründung: {answer}',
        },
      },
    },
  ],
  points: [
    [2, 1, 0],
    [1, 2, 1],
    [0, 1, 2],
  ],
};
