import React, { useCallback, useEffect, useState } from 'react';
import { Feedback } from 'components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'modules/feedback';

export default function FeedbackContainer() {
  const [snackbar, openSnackbar] = useState(false);
  const { feedback } = useSelector((state) => (state.feedback));
  // 디스패치
  const dispatch = useDispatch();
  const Update = useCallback((list) => dispatch((update(list))), [dispatch]);

  useEffect(() => {
    Update({ feedback: '' });
  }, []);

  function handleUpdate(e) {
    Update({ feedback: e });
  }
  function handleSubmit() {
    if (feedback !== '') {
      axios.post(
        'http://13.209.50.101:3000/users/feedback', {
          content: feedback,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      ).then(() => {
        openSnackbar(true);
        setTimeout(() => { openSnackbar(false); }, 2000);
        Update({ feedback: '' });
      });
    }
  }

  return (
    <Feedback
      handleUpdate={handleUpdate}
      handleSubmit={handleSubmit}
      feedback={feedback}
      snackbar={snackbar}
    />
  );
}
