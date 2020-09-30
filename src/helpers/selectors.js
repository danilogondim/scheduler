// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }




// We are going to create a function called getAppointmentsForDay that will receive two arguments state and day. The function will return an array of appointments for the given day.
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(elem => elem.name === day)[0]
  const appointments = filteredDay ? filteredDay.appointments.map(elem => state.appointments[elem]) : [];
  return appointments;
}