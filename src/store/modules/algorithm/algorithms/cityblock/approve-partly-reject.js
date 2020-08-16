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
      alias: 'partly',
      direction: 'neutral',
      icon: 'minus',
      colors: {
        base: '#ECC94B',
        contrast: '#FFFFFF',
        darker: '#D69E2E',
        lighter: '#FEEBC8',
      },
      locales: {
        en: {
          button: 'Partly',
          'button-aria': 'Partly – click here to agree partly with this thesis!',
          badge: 'You agreed partly',
          'badge-aria': 'You agreed partly with this thesis.',
          status: 'partly',
          'answer-aria': 'The party \'{party}\' supports this thesis partly, providing the following answer: {answer}',
        },
        de: {
          button: 'Teilweise',
          'button-aria': 'Teilweise – klicke hier, um dieser These teilweise zuzustimmen!',
          badge: 'Du hast teilweise zugestimmt',
          'badge-aria': 'Du hast dieser These teilweise zugestimmt.',
          status: 'teilweise',
          'answer-aria': 'Die Partei \'{party}\' unterstützt diese These teilweise, mit der folgenden Begründung: {answer}',
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
