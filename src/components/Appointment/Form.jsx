import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button'

const Form = props => {

  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const confirm = () => {
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={confirm}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form;