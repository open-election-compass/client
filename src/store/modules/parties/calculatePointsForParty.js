export default function calculatePointsForParty(party, theses) {
  return theses.reduce((points, thesis) => {
    const userPosition = thesis.status;
    const partyPosition = thesis.positions[party.alias];

    // Skipped thesis?
    if (userPosition === 'skip' || userPosition === null) {
      return points;
    }

    // Exact match?
    if (userPosition === partyPosition) {
      return points + 2 * thesis.factor;
    }

    // Near match?
    if (
      (userPosition === 'neutral' && ['approve', 'reject'].includes(partyPosition))
      || (partyPosition === 'neutral' && ['approve', 'reject'].includes(userPosition))
    ) {
      return points + 1 * thesis.factor;
    }

    return points;
  }, 0);
}
