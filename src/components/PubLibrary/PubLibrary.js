import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import PubBook from './PubBook';


//This is when you will need to do the actual conditional rendering for if you have the add button or not

const PubLibrary = ({ books }) => {

    const mappedBooks = books.map((book) => {
        const { id, title, authors, formats } = book;
        const url = formats["text/html"]
        return <PubBook key={id} id={id} title={title} authors={authors} formats={formats} url={url} />
    })

    return (
        <div>
            {mappedBooks}
        </div>
    )
};

export default PubLibrary;
