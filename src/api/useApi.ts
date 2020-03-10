import {useCallback, useEffect, useState} from 'react';
import AxiosInstance from './index';

const apiKey = 'QlByt1KYA1I73U680hbsUcSLwAnJ756XYgnsq34J';

export default (course: string | undefined = undefined) => {

    const [courses, setCourses] = useState([]);

    const [questions, setQuestions] = useState([]);

    const getCourseList = useCallback(async (type) => {
        const result = await AxiosInstance.get(`/getList?type=${type}&key=${apiKey}`);
        setCourses(result.data.list);
    }, []);

    const getQuestionList = useCallback(async (key) => {
        const result = await AxiosInstance.get(`/getRaw?course=${key}&key=${apiKey}`);
        setQuestions(result.data.questionMap);
    }, []);

    useEffect(() => {
        getCourseList('course')
    }, []);

    useEffect(() => {
        if (course) {
            getQuestionList(course);
        }
    }, [course]);

    return {
        courses,
        questions
    };
}
