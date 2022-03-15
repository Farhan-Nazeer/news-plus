import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, CardActionArea, CardActions } from "@mui/material";

const NewsCard = (props) => {
  const [visited, setVisited] = useState("");

  const handleClick = () => {
    window.open(props.article.url);
    setVisited("[Visited] ");
  };

  const addBookmarked = () => {
    if (!checkIfExists()){
      props.onSetBookmarkedArticles([...props.bookmarkedArticles, props.article]);
      props.onRemoveArticle(props.id);
    } else {
      window.alert("That article is already bookmarked.")
    }
  };

  const checkIfExists = () => {
    for (let i = 0; i < props.bookmarkedArticles.length; i++){
      if (props.bookmarkedArticles[i].url === props.article.url){
        return true;
      }
    }
    return false;
  }

  const deleteBookmark = () => {
    props.onSetNewsArticles([props.article, ...props.newsArticles]);
    props.onRemoveBookmarkedArticle(props.id);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="news-card">
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={props.article.urlToImage}
          alt={props.article.title}
        />
        <CardContent className="news-card-content">
          <Typography gutterBottom variant="h5" component="div">
            {visited}
            {props.article.title.length < 90
              ? props.article.title
              : props.article.title.substring(0, 85) + "..."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {!props.article.content || props.article.content.length < 100
              ? props.article.content
              : props.article.content.substring(0, 200) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-actions">
        <Button size="small" onClick={() => setVisited("[Visited] ")}>
          <a
            className="hyperlinks"
            href={props.article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.article.source.name}
          </a>
        </Button>
        {props.isBookmarked ? (
          <IconButton onClick={deleteBookmark}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton onClick={addBookmarked}>
            <BookmarkAddIcon color="primary" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default NewsCard;
