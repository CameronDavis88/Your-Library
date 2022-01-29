import React from 'react';

{/* <EditBook id={id}/> */ }


// const deleteBook = (id) => {
//     axios.delete(`/api/book/${id}`)
//         .then(res => console.log(res))
//         .catch(err => console.log(err))
// };


// getUsersBooks method -- sends request to server then to db
// editBook method -- sends request to server then to db
// deleteBook method -- sends request to server then to db


const UsersBook = () => {
  const { id, title, authors, formats, url } = props

  const editBook = () => {
      // const { hideAddMode } = this.props;
      const body = {
          id: id,
          title: title,
          authors: authors,
          formats: formats,
      };

      JSON.stringify(body);

      axios.put(`/api/book`, body)
          .then(res => console.log(res))
          .catch(err => console.log(err))
  };

  return (
      <section key={id}>
          <div>
              <h3 >Title: {title}</h3>
              <h3 >Author: {authors[0].name}</h3>
              <img alt='cover' src={formats["image/jpeg"]} />
          </div>

          {/* <button onClick={() => this.deleteBook(id)} >Delete Book</button> ----- which is not for here but in UsersBook! */}
          <button onClick={() => this.addBook(id)} >Update Book</button>
          <nav>
              <a href={url} >Access book for free at Project Gutenberg</a>
          </nav>
      </section>
  )
};

export default UsersBook;


