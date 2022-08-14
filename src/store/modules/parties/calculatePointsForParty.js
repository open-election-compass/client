export default function calculatePointsForParty(party, theses, algorithm) {
  const statuses = algorithm.options.map((option) => option.alias);
  return theses.reduce((points, thesis) => {
    const userPosition = thesis.status;
    const partyPosition = thesis.positions[party.alias];

    // Skipped thesis?
    if (
      userPosition === 'skip' ||
      userPosition === null ||
      partyPosition === 'skip' ||
      partyPosition === null
    ) {
      return points;
    }

    const indexUserPosition = statuses.indexOf(userPosition);
    const indexPartyPosition = statuses.indexOf(partyPosition);

    return points + algorithm.points[indexUserPosition][indexPartyPosition] * thesis.factor;
  }, 0);
}
