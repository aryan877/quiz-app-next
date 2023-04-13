import { QuestionType, QuizType } from '@/types/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/firebase';

interface ResultType {
  question: string;
  selectedOption: string | undefined;
  correctOption: string | undefined;
}

// calculate quiz result based on user's answers
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ score: number; results: ResultType[] } | {}>
) {
  const quiz: QuizType = req.body;

  try {
    const quizCollectionRef = collection(db, 'quizzes');
    const quizQuery = query(quizCollectionRef, where('id', '==', quiz.id));
    const quizDocs = await getDocs(quizQuery);

    if (quizDocs.size === 0) {
      res.status(404).json({ message: `Quiz with id '${quiz.id}' not found` });
      return;
    }

    const quizData = quizDocs.docs[0].data() as QuizType;
    const userAnswers = quiz.questions;

    let score = 0;
    const results: ResultType[] = [];

    for (let i = 0; i < quizData.questions.length; i++) {
      const question: QuestionType = quizData.questions[i];
      const userSelectedOption = userAnswers[i].options.find(
        (option) => option.isAnswer
      );

      if (
        userSelectedOption?.id ===
        question.options.find((option) => option.isAnswer)?.id
      ) {
        score++;
        results.push({
          question: `Question ${i + 1}`,
          selectedOption: userSelectedOption?.title,
          correctOption:
            question.options.find((option) => option.isAnswer)?.title || '',
        });
      } else {
        results.push({
          question: `Question ${i + 1}`,
          selectedOption: userSelectedOption?.title || '',
          correctOption:
            question.options.find((option) => option.isAnswer)?.title || '',
        });
      }
    }

    res.status(200).json({ score, results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
