export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(elem => elem.name === day)[0]
  const appointments = filteredDay ? filteredDay.appointments.map(elem => state.appointments[elem]) : [];
  return appointments;
}