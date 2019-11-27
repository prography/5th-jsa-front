import React, { useCallback } from 'react';
import { Feedback } from 'components';

import { useDispatch, useSelector } from 'react-redux';
import { update } from 'modules/feedback';

export default function FeedbackContainer() {
  const { feedback } = useSelector((state) => (state.topping));
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);


  function handleUpdate(e) {
    Update({ feedback: e });
  }

  function handleSubmit() {
    console.log('피드백 제출성공');
  }
  // 제출하고 alert 뜨게 해야돼

  return (
    <Feedback
      handleUpdate={handleUpdate}
      handleSubmit={handleSubmit}
      feedback={feedback}
    />
  );
}
