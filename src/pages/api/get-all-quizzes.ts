import { QuizType } from '@/types/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/firebase';

//to get data to display the quiz cards on index page
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<QuizType>[] | { message: string }>
) {
  try {
    const quizCollection = collection(db, 'quizzes');
    const quizSnapshot = await getDocs(
      query(quizCollection, orderBy('updatedAt', 'desc'))
    );
    const quizList = quizSnapshot.docs.map((doc) => ({
      id: doc.data().id,
      title: doc.data().title,
      updatedAt: doc.data().updatedAt,
      description: doc.data().description,
    }));
    res.status(200).json(quizList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
