import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, TextField } from '@material-ui/core';
import YouTube from 'react-youtube';

function App() {

  const [videoLink, setVideoLink] = useState("");
  const [videoTimestamp, setVideoTimestamp] = useState(0);

  const onChange = e => {
    setVideoLink(e.target.value);
    console.log(e.target.value);
  }

  const getVideoID = () => {
    if(videoLink === "" || videoLink === undefined) return "";
    let splitVideoLink = videoLink.split("v=")[1]; //www.youtube.com/watch?v=ID&
    let ampersandLocation = splitVideoLink.indexOf("&");
    if(ampersandLocation !== -1) {
      return splitVideoLink.substring(0, ampersandLocation);
    }
    return splitVideoLink;
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      
      <Grid item xs={12}>
        <TextField 
          value={videoLink}
          name='videoLink'
          placeholder='Enter a Youtube URL'
          variant='outlined'
          onChange={e => onChange(e)}
        />
        <Grid item xs={12}>
          <YouTube 
            videoId={getVideoID()}
            opts={{
              width: '100%',
              playerVars: {
                start: parseInt(videoTimestamp)
              }
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
