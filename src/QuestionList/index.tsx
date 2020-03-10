import React from 'react';
import useApi from '../api/useApi';
import Question from './question';

interface QuestionListProps {
    course?: string
}

const QuestionList = ({course}: QuestionListProps) => {

    const { questions } = useApi(course);

    return (
        <div>
            {!course && <p className={'text-center display-4 my-4'}>Please select course!</p>}

            <div className={'list-group my-4'}>
                {
                    course && questions && questions.map((question, index) => (
                        <Question key={index} {...question} />
                    ))
                }
            </div>
        </div>
    );
};

export default QuestionList;
