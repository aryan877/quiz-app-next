import { QuizType } from '@/store/reducers/quizFormSlice';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const quizId = req.query.id as string;

  try {
    const quizCollectionRef = collection(db, 'quizzes');
    const quizQuery = query(quizCollectionRef, where('id', '==', quizId));
    const quizDocs = await getDocs(quizQuery);

    if (quizDocs.size === 0) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }

    const quizData = quizDocs.docs[0].data() as QuizType;

    // modify quizData to make all isAnswer values false
    const modifiedQuestions = quizData.questions.map((question) => {
      const modifiedOptions = question.options.map((option) => ({
        ...option,
        isAnswer: false,
      }));
      return {
        ...question,
        options: modifiedOptions,
      };
    });

    const modifiedQuizData = {
      ...quizData,
      questions: modifiedQuestions,
    };

    res.status(200).json(modifiedQuizData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
