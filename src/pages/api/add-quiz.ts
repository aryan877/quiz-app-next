// pages/api/addQuiz.js
import { QuizType } from '@/store/reducers/quizFormSlice';
import { addDoc, collection, getDoc, getFirestore } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const db = getFirestore();
  const quiz = req.body;

  // Initialize quizzes collection
  const quizzesCollection = collection(db, 'quizzes');

  try {
    const docRef = await addDoc(quizzesCollection, quiz);
    // Get the newly added document from the database to retrieve the id field
    const docSnapshot = await getDoc(docRef);
    const quizData = docSnapshot.data();
    const quizId = quizData?.id;
    console.log('Quiz added with ID: ', quizId);
    res.status(200).json({ quizId });
  } catch (error) {
    console.error('Error adding quiz: ', error);
    res.status(500).json({ error });
  }
}
