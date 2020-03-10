import React from 'react';
import useApi from '../api/useApi';

interface CourseListProps {
    onClick: (code: string) => void
    course?: string
}

const CourseList = ({onClick, course}: CourseListProps) => {

    const { courses } = useApi();

    if (!courses) {
        return (
            <h1>No courses!</h1>
        )
    }

    return (
        <ul className={'nav nav-tabs mt-4'}>
            {
                courses.map(({code}) => (
                    <li className={'nav-item'} key={code}>
                        <a className={`nav-link ${code === course ? 'active' : ''}`} onClick={() => onClick(code)} href={'#'}>
                            {code}
                        </a>
                    </li>
                ))
            }
        </ul>
    );
};

export default CourseList;
