import { QuizType } from '@/store/reducers/quizFormSlice';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  try {
    const quizCollection = collection(db, 'quizzes');
    const quizSnapshot = await getDocs(
      query(quizCollection, orderBy('createdAt', 'desc'))
    );
    const quizList = quizSnapshot.docs.map((doc) => ({
      id: doc.data().id,
      title: doc.data().title,
      createdAt: doc.data().createdAt,
    })) as QuizType[];
    res.status(200).json(quizList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
