import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
  }, []);


  function bookInterview(id, interview) {

    let days = [...state.days];
    // we should only change the number of spots for a given day if we are creating a new appointment. Editing an existing appointment should not change the number of spots. So we need to first check if there isn't in our state an interview set for the given appointment id
    if (!state.appointments[id].interview) {
      const day = { ...days.find(elem => elem.appointments.includes(id)) };
      day.spots--;
      // recreate the days arrays by updating only the day that we had changed the number of spots
      days = days.map(elem => {
        if (elem.name === state.day) {
          return day;
        }
        return elem;
      })
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
      });
  };


  function cancelInterview(id) {

    // cancelling an appointment will always increase the number of spots for a given day by one
    const day = { ...state.days.find(elem => elem.appointments.includes(id)) };
    day.spots++;
    // recreate the days arrays by updating only the day that we had changed the number of spots
    const days = [...state.days].map(elem => {
      if (elem.name === state.day) {
        return day;
      }
      return elem;
    })

    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
      });
  };


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};