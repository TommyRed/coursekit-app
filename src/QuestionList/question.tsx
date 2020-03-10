import React from 'react';

type Localized = { cs: string, en: string }

type QuestionType = 'T01' | 'T02' | 'T03' | 'T06'

interface QuestionProps {
    code: string
    task: Localized
    instruction: Localized
    type: QuestionType
    answerList: Array<any | string | Array<any>>
    correctAnswerIndex?: number
    correctAnswerIndexList?: Array<number>
    pairList?: Array<{answerIndex: number, pairAnswerIndex: number}>
}

const parseString = (str: any, language: string = 'en') => {
    // @ts-ignore
    let data = str[language] ? str[language] : str;

    return data.replace(/<uu5string\/>/g, '')
        .replace(/\r?\n/g, '')
        .replace(/\$[0-9]+/, '____')
        .replace(new RegExp(`<UU5\\.Bricks\\.Lsi\\.Item\\s+language='${language}'>([^<]*)<\\/UU5\\.Bricks\\.Lsi\\.Item>`, 'g'), '$1')
        .replace(/(<UU5\.Bricks\.Lsi\.Item\s+language='[a-z]{2}'>([^<]*)<\/UU5\.Bricks\.Lsi\.Item>|<\/?UU5\.Bricks\.Lsi>)/g, '')
        .replace(/<UU5\.Math\.Expression\s+expression="([^"]*)"\s?\/>/g, '$$$1$$')
        .replace(/<Plus4U5\.Bricks\.Image\s+src="([^"]*)"(\s+[a-zA-Z]+="([^"]*)")*\s?\/>/g, '')
        .replace(/<(UU5|Plus4U5)(\.[a-zA-Z]+)+(\s+[a-zA-Z]+="([^"]*)")+\s?\/>/g, '`$4`')
        .replace(/<(UU5|Plus4U5)(\.[a-zA-Z]+)+(\s+[a-zA-Z]+="([^"]*)")+\s?>([^<]*)<\/(UU5|Plus4U5)(\.[a-zA-Z]+)+>/g, '_$5_');
};

const Question = ({task, code, instruction, type, answerList, correctAnswerIndex, correctAnswerIndexList, pairList}: QuestionProps) => {

    const isGroupList = answerList.every(s => s instanceof Array);

    switch (type) {
        case 'T01':
        case 'T02':
            return (
                <div key={code}>

                    <p>{parseString(instruction)}</p>
                    <p>{parseString(task)}</p>
                    <p>{parseString(answerList[correctAnswerIndex || 0])}</p>

                    <hr/>

                </div>
            );

        case 'T03':
            return (
                <div key={code}>

                    <p>{parseString(instruction)}</p>
                    <p>{parseString(task)}</p>
                    <p>
                        {correctAnswerIndexList?.map((i) => (
                            <>
                                <br/>
                                <span>
                                {parseString(answerList[i])}
                            </span></>
                        ))}
                    </p>

                    <hr/>

                </div>
            );

        case 'T06':
            return (
                <div key={code}>

                    <p>{parseString(instruction)}</p>
                    <p>{parseString(task)}</p>
                    <p>
                        {pairList?.map(({answerIndex, pairAnswerIndex}) => {

                            const a = isGroupList ? answerList[0][answerIndex] : answerList[answerIndex];

                            const b = isGroupList ? answerList[1][pairAnswerIndex] : answerList[pairAnswerIndex];

                            return (
                                <>
                                    <span>{`${parseString(a)} => ${parseString(b)}`}</span>
                                    <br/>
                                </>
                            )
                        })}
                    </p>

                    <hr/>

                </div>
            );

        default:
            return (
                <div>
                    <pre>
                        {JSON.stringify(task, null, 2)}
                    </pre>
                </div>
            );
    }
};

export default Question;
