import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { History } from "react-router-dom";
import { createGoal } from "../features/goals/goalSlice";
import React from "react";

function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };

  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block btn-primary">
            Add Text
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
