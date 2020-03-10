import React from 'react';
import useApi from '../api/useApi';

interface CourseListProps {
    onClick: (code: string) => void
}

const CourseList = ({onClick}: CourseListProps) => {

    const { courses } = useApi();

    return (
        <div>
            <h1>Course list</h1>

            {
                courses ? courses.map(({code}) => (
                    <button onClick={() => onClick(code)}>{code}</button>
                )) : 'No course'
            }
        </div>
    );
};

export default CourseList;
