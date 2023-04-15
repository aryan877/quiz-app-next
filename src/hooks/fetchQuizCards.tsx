import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  addQuizCardsData,
  removeQuizCardsData,
} from '@/store/reducers/quizCardsSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useFetchQuizCards = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/get-all-quizzes');
        dispatch(addQuizCardsData(response.data));
      } catch (error) {
        dispatch(
          addNotification({
            type: 'error',
            message: 'An error occurred while fetching quizzes',
          })
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();

    return () => {
      dispatch(removeQuizCardsData());
    };
  }, [dispatch]);

  return loading;
};

export default useFetchQuizCards;
