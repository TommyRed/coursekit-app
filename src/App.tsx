import React, {useState} from 'react';
import './App.css';
import CourseList from './CourseList';
import QuestionList from './QuestionList';

export default () => {

    const [course, setCourse] = useState<string | undefined>(undefined);

    return (
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <CourseList onClick={(code) => setCourse(code)} course={course} />
                    <QuestionList course={course} />
                </div>
            </div>
        </div>
    )
};
