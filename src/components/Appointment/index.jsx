import React from 'react';

import './styles.scss'

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import useVisualMode from '../../hooks/useVisualMode'
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = props => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => console.log("Clicked onEdit")}
          onDelete={() => console.log("Clicked onDelete")}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={() => console.log("Clicked onSave")}
          onCancel={() => back()}
        />
      )}
    </article>
  )
};

export default Appointment;

// copy from tests to help to work with the new components when necessary:

// <Confirm message="Delete the appointment?" onConfirm={action("onConfirm")} onCancel={action("onCancel")} />
// <Status message="Saving" />
// <Status message="Deleting" />
// <Error message='Could not delete appointment.' onClose={action("onClose")} />
// <Form
//   name="Archie Cohen"
//   interviewers={interviewers}
//   interviewer={1}
//   onSave={action("onSave")}
//   onCancel={action("onCancel")}
// />;