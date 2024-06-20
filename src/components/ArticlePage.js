import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const ArticlePage = () => {
  const location = useLocation();
  const { article } = location.state;

  const cleanContent = article.content ? article.content.replace(/\[\+\d+ chars\]/, '') : 'Full content not available.';

  return (
    <Container>
      <h1>{article.title}</h1>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '100%' }} />}
      <p>{cleanContent}</p>
      {article.content && article.content.includes('[+')
        ? <Button variant="link" href={article.url} target="_blank" rel="noopener noreferrer">Read full article</Button>
        : <p>{article.description}</p>
      }
    </Container>
  );
};

export default ArticlePage;
