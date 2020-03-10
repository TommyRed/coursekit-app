import React, {useState} from 'react';
import './App.css';
import CourseList from './CourseList';
import QuestionList from './QuestionList';

export default () => {

    const [course, setCourse] = useState<string | undefined>(undefined);

    return (
        <div>
            <CourseList onClick={(code) => setCourse(code)} />
            <QuestionList course={course} />
        </div>
    )
};
