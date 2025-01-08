import { youtubeApi } from '../api/youtubeApi';
import { useEffect, useState } from 'react';
import './css/VideoList.css';
import SearchBar from './SearchBar';
import Selector from './Selector'

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getYoutubeVideos();
  }, [query]);

  const getYoutubeVideos = async () => {
    try {
      const res = await youtubeApi.get('search', {
        params: {
          part: 'snippet',
          maxResults: 9,
          q: query || '좋은 개발자란',
          type: 'video',
        },
      });
      console.log(res.data.items);
      setVideoList(res.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SearchBar setQuery={setQuery} />
      <Selector setQuery={setQuery} />
      <div className='VideoTitle'>
        <h4>LG CNS AM 캠프 과정을 위한 {query} 영상</h4>
      </div>
      <div className='Video'>
        {videoList.map((v) => (
          <div key={v.id.videoId} className='VideoItem'>
            <h4>{v.snippet.title}</h4>
            <iframe
              id='player'
              title={v.snippet.title}
              type='text/html'
              src={`https://www.youtube-nocookie.com/embed/${v.id.videoId}`}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoList;
