module.exports = function addDefaults(zone) {
    // If no timeActive supplied, add activeAllDay
    if (!zone.timeActive) {
        zone.activeAllDay = true;
    }

    // If no actions have been added to the zone, add a default action.
    // This is needed because users cannot save a zone without an action on it
    if (!zone.actions) {
        zone.actions = {};
        zone.actions.customActions = [{ name: 'Notify application - ' }]
    }
}
