import React from "react";
import { useState } from "react";
import axios from 'axios';

const Youtube = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [allVideos, setAllVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
  console.log(searchTerm);
  
  async function implementSearch() {
    try{
       const data = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params:{
            q: searchTerm,
            part:"snippet",
            key:process.env.REACT_APP_YOUTUBE_API_KEY,
            maxResults:5
          }
        }
      )
      setAllVideos(data.data.items);
      setCurrentVideo(data.data.items[0]);
      console.log(data.data);   
    }
    catch(err){
      console.log(err);
    }
  }
  
  return(
    <React.Fragment>
      <nav>
        <input type='text' placeholder='Search...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}></input>
        <button onClick={implementSearch}>Search</button>
      </nav>
      <main>
        <div className="current-video">
          {
            currentVideo ? 
            (
              <div>
                <iframe width="420" height="315" title=""
                  src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}>
                </iframe>
                <h4>{currentVideo.snippet.title}</h4>
                <p>{currentVideo.snippet.channelTitle}</p>
              </div>
            ) : (<h4>No video selected</h4>)
          }
        </div>
        <div className="video-list">
             {allVideos.length > 0 ? (
                        allVideos.map((video, idx) => (
                            <div
                                key={idx}
                                className="video-item"
                                onClick={() => setCurrentVideo(video)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={video.snippet.thumbnails.default.url}
                                    alt={video.snippet.title}
                                    height={video.snippet.thumbnails.default.height}
                                    width={video.snippet.thumbnails.default.width}
                                />
                                <h4>{video.snippet.title}</h4>
                                <p>{video.snippet.channelTitle}</p>
                            </div>
                        ))
                    ) : (
                        <h3>No videos available</h3>
                    )}
        </div>
      </main>
    </React.Fragment>
  
  )
}

export default Youtube