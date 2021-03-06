import { isCreator } from '../lib/auth'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
export default function CommentsAllTogether({ city }) {
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [cities, updateCities] = useState({})
  const token = localStorage.getItem('token')
  const loggedIn = getLoggedInUserId()
  const [editNumber, updateEditNumber] = useState(0)
  const [commentIdentifier, updateCommentIdentifier] = useState('')

  useEffect(() => {
    async function fetchCommentData() {
      try {
        const { data } = await axios.get(`/api/cityscapes/${city}/comment`,)
        updateCities(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCommentData()
  }, [])


  async function handleComment() {
    const { data } = await axios.post(`/api/cityscapes/${city}/comment`, { title, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setTitle('')
    setComment('')
    updateCities(data)

  }



  async function handleEditCommentOne(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.get(`/api/cityscapes/${city}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(resp => {
      setComment(resp.data.comment)
      setTitle(resp.data.title)
      updateEditNumber(1)
      updateCommentIdentifier(commentId)
    })
  }
  async function handleEditCommentTwo() {
    if (!isCreator) {
      return null
    }
    await axios.put(`/api/cityscapes/${city}/comment/${commentIdentifier}`, { title, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCities(resp.data)
        updateEditNumber(0)
        updateCommentIdentifier('')
      })
  }


  async function handleDeleteComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`/api/cityscapes/${city}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        updateCities(resp.data)
      })
  }

  return <div>
    <div className="container is-centered">
      <h2 className="title is-2">Share you experiences from {city} </h2>
      <div className="column">
        <div className="columns is-multiline is-centered">
          {
            cities.comments && cities.comments.map(commenting => {
              return <article key={commenting._id} className="media">
                <div className="media-content">
                  <div className="content">
                    <p className="subtitle">
                      {commenting.user.username}
                    </p>
                    <p>{commenting.title}</p>
                    <p>{commenting.comment}</p>
                  </div>
                </div>
                {isCreator(commenting.user._id) && <div className="media-right">
                  <button
                    className="button is-danger"
                    onClick={() => handleDeleteComment(commenting._id)}>
                    Delete
                  </button>
                </div>}
                {isCreator(commenting.user._id) && <div className="media-right">
                  <button
                    className="button is-light"
                    onClick={() => handleEditCommentOne(commenting._id)}>Update
                  </button>
                </div>}
              </article>
            })
          }


          {loggedIn && <article className="media">
            <div className="media-content">
              <div className="field" >
                <p className="control">
                  <textarea
                    className="textarea"
                    placeholder="Title of your post"
                    height="10px"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                  >
                    {title}
                  </textarea>

                  <textarea
                    className="textarea"
                    placeholder="Share your experience..."
                    onChange={event => setComment(event.target.value)}
                    value={comment}
                  >
                    {comment}
                  </textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  {editNumber === 0 && <button
                    onClick={handleComment}
                    className="button is-info"
                  >
                    Submit
                  </button>}
                  {editNumber === 1 && <button
                    onClick={handleEditCommentTwo}
                    className="button is-info"
                  >
                    Update Comment
                  </button>}
                </p>
              </div>
            </div>
          </article>}

        </div>



      </div>
      {!loggedIn && <article className="message is-danger">
        <div className="message-header">
          <p>Not logged in!</p>

        </div>
        <div className="message-body">
          <strong>You need to be logged in to make a comment!</strong>
        </div>
      </article>
      }</div>
  </div>

}




