import { QuizType } from '@/types/types';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType | { message: string }>
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

    const quizRef = doc(db, 'quizzes', quizDocs.docs[0].id);
    const quizData = quizDocs.docs[0].data() as QuizType;

    // Update the quiz with the new data from the request body
    const updatedQuizData: any = {
      ...quizData,
      ...req.body,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    await updateDoc(quizRef, updatedQuizData);

    res.status(200).json(updatedQuizData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
