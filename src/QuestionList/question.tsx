import React from 'react';

type Localized = { cs: string, en: string }

type QuestionType = 'T01'

interface QuestionProps {
    code: string
    task: Localized
    instruction: Localized
    type: QuestionType
}

const parseString = (str: Localized | string, language: string = 'cs') => {
    // @ts-ignore
    let data = str[language] && str[language] || str;
    return data.replace(/<uu5string\/>/g, '')
        .replace(/\r?\n/g, '')
        .replace(/\$[0-9]+/, '____')
        .replace(new RegExp(`<UU5\\.Bricks\\.Lsi\\.Item\\s+language='${language}'>([^<]*)<\\/UU5\\.Bricks\\.Lsi\\.Item>`, 'g'), '$1')
        .replace(/(<UU5\.Bricks\.Lsi\.Item\s+language='[a-z]{2}'>([^<]*)<\/UU5\.Bricks\.Lsi\.Item>|<\/?UU5\.Bricks\.Lsi>)/g, '')
        .replace(/<UU5\.Math\.Expression\s+expression="([^"]*)"\s?\/>/g, '$$$1$$')
        .replace(/<Plus4U5\.Bricks\.Image\s+src="([^"]*)"(\s+[a-zA-Z]+="([^"]*)")*\s?\/>/g, '![Obrázek k otázce]($1)')
        .replace(/<(UU5|Plus4U5)(\.[a-zA-Z]+)+(\s+[a-zA-Z]+="([^"]*)")+\s?\/>/g, '`$4`')
        .replace(/<(UU5|Plus4U5)(\.[a-zA-Z]+)+(\s+[a-zA-Z]+="([^"]*)")+\s?>([^<]*)<\/(UU5|Plus4U5)(\.[a-zA-Z]+)+>/g, '_$5_');
}

const Question = ({task, code, instruction, type, }: QuestionProps) => {
    return (
        <div key={code}>

            <p>{parseString(instruction)}</p>
            <p>{parseString(task)}</p>

            <hr/>

        </div>
    );
};

export default Question;
