// pages/api/addQuiz.js
import { QuizType } from '@/types/types';
import {
  addDoc,
  collection,
  getDoc,
  getFirestore,
  Timestamp,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../firebase/firebase';

//post request to create a new quiz with quiz title as body
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const quiz: QuizType = {
    id: uuidv4(),
    title: req.body.title,
    description: 'enter description',
    questions: [
      {
        id: uuidv4(),
        prompt: 'New Question',
        points: 1,
        options: [{ id: uuidv4(), title: 'Option', isAnswer: false }],
      },
    ],
    updatedAt: Timestamp.fromDate(new Date()),
    timelimit: 10,
  };

  // Initialize quizzes collection
  const quizzesCollection = collection(db, 'quizzes');

  try {
    const docRef = await addDoc(quizzesCollection, quiz);
    // Get the newly added document from the database to retrieve the id field
    const docSnapshot = await getDoc(docRef);
    const quizData = docSnapshot.data();
    res.status(200).json({ ...quizData });
  } catch (error) {
    console.error('Error adding quiz: ', error);
    res.status(500).json({ error });
  }
}
