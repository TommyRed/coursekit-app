import React from 'react';
import useApi from '../api/useApi';
import Question from './question';

interface QuestionListProps {
    course?: string
}

const QuestionList = ({course}: QuestionListProps) => {

    const {questions} = useApi(course);

    return (
        <div>
            <h1>Question list</h1>

            {!course && <div>Please select course!</div>}

            {
                course && questions && questions.map((question, index) => (
                    <Question key={index} {...question} />
                ))
            }
        </div>
    );
};

export default QuestionList;
