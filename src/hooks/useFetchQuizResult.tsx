import { RootState } from '@/store/reducers';
import { setQuizTestData } from '@/store/reducers/quizTestSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ResultItem = {
  question: string;
  selectedOption: string;
  correctOption: string;
  points: number;
};

type ResultData = {
  score: number;
  maxscore: number;
  totalQuestions: number;
  results: ResultItem[];
};

function useFetchQuizResult() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const testData = useSelector((state: RootState) => state.quizTestData.quiz);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const postResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.post<ResultData>(
          '/api/get-result',
          testData
        );
        setResult(data);
      } catch (error) {
        setError('An error occurred while fetching quiz result');
      } finally {
        setLoading(false);
      }
    };

    if (testData.questions.length > 0) {
      postResult();
    } else {
      router.push('/');
    }
  }, [testData, router, dispatch]);

  return { loading, result, error };
}

export default useFetchQuizResult;
