
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getStoryById } from "../api/storyApi";
import useTheme from "../context/useTheme";

export default function Player() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const progressIntervalRef = useRef(null);
  const progressRef = useRef([]);

  const { theme } = useTheme();


  useEffect(() => {
    getStoryById(id)
      .then((res) => setStory(res.data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  
  useEffect(() => {
    if (!story) return;
    
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (isPaused) return;

    const startTime = Date.now();
    const duration = 4000; 
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progressRef.current[index]) {
        progressRef.current[index].style.width = `${progress * 100}%`;
      }
      
      if (progress >= 1) {
        clearInterval(progressIntervalRef.current);
        handleNext();
      }
    }, 16);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [index, story, isPaused]);

  
  useEffect(() => {
   
    progressRef.current.forEach((bar, i) => {
      if (bar) {
        if (i < index) {
          bar.style.width = "100%";
        } else if (i === index) {
          bar.style.width = "0%";
        } else {
          bar.style.width = "0%";
        }
      }
    });
  }, [index]);

  const handleShare = async () => {
    try {
      const storyUrl = `${window.location.origin}/player/${id}`;
      
      
      if (navigator.share) {
        await navigator.share({
          title: story?.title || 'Web Story',
          text: `Check out this story: ${story?.title}`,
          url: storyUrl,
        });
      } else if (navigator.clipboard) {
     
        await navigator.clipboard.writeText(storyUrl);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      } else {
        
        prompt('Copy this link to share:', storyUrl);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      
      
      const storyUrl = `${window.location.origin}/player/${id}`;
      prompt('Copy this link to share:', storyUrl);
    }
  };

  const handleNext = () => {
    setIndex((prev) =>
      prev + 1 < story.slides.length ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setIndex((prev) =>
      prev > 0 ? prev - 1 : story.slides.length - 1
    );
  };

  const togglePause = () => {
    setPaused(prev => !prev);
  };

  if (!story) return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === "dark" ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <p>Loading...</p>
    </div>
  );
  
  const current = story.slides[index];

  return (
    <div className={`flex items-center justify-center min-h-screen ${
      theme === "dark" ? "bg-slate-900 text-white" : "bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900"
    } relative p-4`}>
      
     
      <div className={`relative w-full max-w-md h-[85vh] rounded-3xl overflow-hidden shadow-2xl ${
        theme === "dark" ? "bg-slate-800" : "bg-white"
      }`}>
        
        
        <div className="absolute top-4 left-0 w-full flex space-x-1 px-4 z-50">
          {story.slides.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full overflow-hidden backdrop-blur-sm ${
                theme === "dark" ? "bg-white/30" : "bg-gray-400/50"
              }`}
            >
              <div
                ref={el => progressRef.current[i] = el}
                className={`h-full transition-all duration-100 ease-linear ${
                  theme === "dark" ? "bg-white" : "bg-blue-600"
                }`}
                style={{ width: i < index ? "100%" : "0%" }}
              ></div>
            </div>
          ))}
        </div>

     
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-40 border p-3 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 ${
            theme === "dark" 
              ? "bg-black/40 hover:bg-black/60 text-white border-white/20" 
              : "bg-white/60 hover:bg-white/80 text-gray-900 border-gray-300"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-40 border p-3 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 ${
            theme === "dark" 
              ? "bg-black/40 hover:bg-black/60 text-white border-white/20" 
              : "bg-white/60 hover:bg-white/80 text-gray-900 border-gray-300"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

       
        <div className="absolute top-4 right-4 flex items-center space-x-3 z-50">
        
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePause();
            }}
            className={`border p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              theme === "dark" 
                ? "bg-black/40 hover:bg-black/60 text-white border-white/20" 
                : "bg-white/60 hover:bg-white/80 text-gray-900 border-gray-300"
            }`}
          >
            {isPaused ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            )}
          </button>
          
          
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className={`border p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
                theme === "dark" 
                  ? "bg-black/40 hover:bg-black/60 text-white border-white/20" 
                  : "bg-white/60 hover:bg-white/80 text-gray-900 border-gray-300"
              }`}
              title="Share story"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            {/* Share Tooltip */}
            {showShareTooltip && (
              <div className={`absolute top-full right-0 mt-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap ${
                theme === "dark" 
                  ? "bg-green-600 text-white" 
                  : "bg-green-500 text-white"
              }`}>
                Link copied!
              </div>
            )}
          </div>
        </div>

        <div 
          className="w-full h-full relative"
          onClick={() => {
           
            if (!isPaused) {
              handleNext();
            }
          }}
          onMouseDown={() => setPaused(true)}
          onMouseUp={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {current?.type === "image" ? (
            <img
              src={current.url}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={current.url}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          )}

        
          <div className={`absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t ${
            theme === "dark" 
              ? "from-slate-800/80 via-slate-800/20 to-transparent" 
              : "from-white/80 via-white/20 to-transparent"
          }`}></div>
        </div>

      
        <div className="absolute bottom-0 left-0 w-full p-6 z-30">
          <div className={`backdrop-blur-xl rounded-2xl p-4 border ${
            theme === "dark" 
              ? "bg-black/50 border-white/10" 
              : "bg-white/70 border-gray-200"
          }`}>
            <h2 className="text-xl font-bold mb-2">{story.title}</h2>
            
            {current.text && (
              <p className={`text-sm leading-relaxed ${
                theme === "dark" ? "text-white/60" : "text-gray-600"
              }`}>
                {current.text}
              </p>
            )}
          </div>

          
        </div>

    
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
          {story.slides.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index 
                  ? (theme === "dark" ? "bg-white" : "bg-blue-600")
                  : (theme === "dark" ? "bg-white/30" : "bg-gray-400/50")
              }`}
            ></div>
          ))}
        </div>
      </div>


      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-xs ${
        theme === "dark" ? "text-white/60" : "text-gray-600"
      }`}>
        {isPaused ? "Paused - Click play to resume" : "Click or press ← → keys to navigate"}
      </div>

      
    </div>
  );
}