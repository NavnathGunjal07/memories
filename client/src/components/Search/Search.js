import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, CircularProgress,TextField } from "@material-ui/core";
import * as api from "../../api/index.js";
import Post from "../Posts/Post/Post.js";
import useStyles from "../Posts/styles.js";
import "./styles.css";

function Search() {
  const [searchArray, setsearchArray] = useState([]);
  const [searchKey, setSearchKey] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const getPosts = async () => {
    let data = await api.fetchPosts();
    return data;
  };
  useEffect(() => {
    let arr = [];
    getPosts().then((data) => {
      data.data.forEach((obj) => {
        if (obj["creator"].includes(searchKey)) arr.push(obj);
      });
      if(searchKey!=='')
        setsearchArray(arr);
      else
        setsearchArray([]);
    });
  }, [searchKey]);
  console.log(searchArray);
  return (
    <div>
      <TextField name="search" variant="outlined" label="Search Creator" fullWidth  onChange={(e) => setSearchKey(e.target.value)}/>
      <h1>Search Results For: `{searchKey}` </h1>
     
      {!searchArray.length===0?  <CircularProgress />:(
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Grid
                  className={classes.container}
                  container
                  alignItems="stretch"
                  spacing={3}
                >
                  {searchArray.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6}>
                      <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grow>)
      }
    </div>
  );
}

export default Search;
