import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Pagination } from 'react-bootstrap';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
  const country = 'in';

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      const params = {
        apiKey: process.env.REACT_APP_NEWSAPI_KEY,
        country,
        category: category || undefined,
        page,
        pageSize: 10,
      };

      console.log('Fetching articles with params:', params);

      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, { params });
        setArticles(response.data.articles);
      } catch (err) {
        console.error('Error fetching articles:', err.response);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchArticles();
  }, [category, page]);

  const handleCategoryChange = (category) => {
    setCategory(category);
    setPage(1);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {category || 'Select Category'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((cat) => (
                <Dropdown.Item key={cat} onClick={() => handleCategoryChange(cat)}>
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {articles.map((article, index) => (
          <Col key={index} md={4}>
            <div className="card mb-4">
              <img src={article.urlToImage} className="card-img-top" alt={article.title} />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <Link to={`/article/${index}`} state={{ article }} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Pagination>
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={() => setPage(page + 1)} />
      </Pagination>
    </Container>
  );
};

export default HomePage;
