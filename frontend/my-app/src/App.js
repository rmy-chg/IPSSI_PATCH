import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [queriedUser, setQueriedUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Use environment variable for API URL or default to localhost
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    axios.get(`${API_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err.message));

    loadComments();
  }, [API_URL]);

  const loadComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error('Error loading comments:', err.message);
    }
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    try {
      // Secure API call with JSON body
      const response = await axios.post(`${API_URL}/user-search`, { query: queryName });
      setQueriedUser(response.data);
    } catch (err) {
      console.error('Error querying user:', err.message);
      setQueriedUser(null);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Secure API call with JSON body
      await axios.post(`${API_URL}/comment`, { content: newComment });
      setNewComment('');
      loadComments();
    } catch (err) {
      console.error('Error submitting comment:', err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">

        <section style={{ marginBottom: '3rem', border: '2px solid #61dafb', padding: '1rem', borderRadius: '8px' }}>
          <h3>Users (Secure)</h3>
          {users.map(u => <p key={u.id}>{u.name}</p>)}

          <form onSubmit={handleQuery} style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder="Enter user Name"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              required
            />
            <button type="submit">Search User</button>
          </form>

          {queriedUser && queriedUser.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Queried User:</h3>
              {queriedUser.map(u => (
                <p key={u.id}>
                  ID: {u.id} — Name: {u.name}
                </p>
              ))}
            </div>
          )}
        </section>

        <section style={{ border: '2px solid #ff6b6b', padding: '1rem', borderRadius: '8px' }}>

          <form onSubmit={handleCommentSubmit} style={{ marginTop: '1rem' }}>
            <textarea
              placeholder="Enter your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                width: '80%',
                height: '80px',
                marginBottom: '0.5rem',
                padding: '0.5rem',
                fontSize: '1rem'
              }}
              required
            />
            <br />
            <button type="submit">Post Comment</button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '80%', margin: '2rem auto' }}>
            <h3>Comments:</h3>
            {comments.length === 0 ? (
              <p>No comments yet. TYPE ONE NOW !</p>
            ) : (
              comments.map(comment => (
                <div
                  key={comment.id}
                  style={{
                    background: '#282c34',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #444',
                    color: 'white'
                  }}
                >
                  {/* React automatically escapes content, preventing XSS */}
                  {comment.content}
                </div>
              ))
            )}
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;