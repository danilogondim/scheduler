import React from 'react';

import './styles.scss';

import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from '../../hooks/useVisualMode';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const Appointment = props => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW));
    }
  };

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => console.log("Clicked onEdit")}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status
          message='Saving'
        />
      )}
      {mode === DELETING && (
        <Status
          message='Deleting'
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message='Delete the appointment?'
          onConfirm={deleteInterview}
          onCancel={() => back()}
        />
      )}
    </article>
  )
};

export default Appointment;

// copy from tests to help to work with the new components when necessary:

// <Error message='Could not delete appointment.' onClose={action("onClose")} />
// <Form
//   name="Archie Cohen"
//   interviewers={interviewers}
//   interviewer={1}
//   onSave={action("onSave")}
//   onCancel={action("onCancel")}
// />;