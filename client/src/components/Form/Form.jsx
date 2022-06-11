import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./FormStyle";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedField: "",
  }); // In JavaScript => postData = {creator: '', title: '', message: '', tags: '', selectedField: '',}
  //const [isAllFill, setIsAllFill] = useState(false);
  
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedField: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${postData.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          inputProps={{ // For limited # of character.
            maxLength: 20
          }}
          onChange={
            (e) => setPostData({ ...postData, creator: e.target.value }) // This means, if everything in postData is same except creator, chance only the creator field.
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          inputProps={{ // For limited # of character.
            maxLength: 25
          }}
          onChange={
            (e) => setPostData({ ...postData, title: e.target.value }) // This means, if everything in postData is same except creator, chance only the creator field.
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          minRows={4}
          maxRows={4}
          fullWidth
          sx={{ height: 500 }}
          inputProps={{ // For limited # of character.
            maxLength: 100
          }}
          value={postData.message}
          onChange={
            (e) => setPostData({ ...postData, message: e.target.value }) // This means, if everything in postData is same except creator, chance only the creator field.
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          inputProps={{ // For limited # of character.
            maxLength: 35
          }}
          onChange={
            (e) => setPostData({ ...postData, tags: e.target.value.split(',') }) // This means, if everything in postData is same except creator, chance only the creator field.
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;