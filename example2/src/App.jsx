import { useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AdWrapper } from 'livepeerjs-ima'
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { getSrc, } from "@livepeer/react/external";
import * as Player from "@livepeer/react/player";
import {
  useMediaContext,
  useStore,
} from "@livepeer/react/player";



function App() {
  const videoRef = useRef(null);
  const [canPlay,setCanPlay]=useState(false)

  return (
    <>
       <AdWrapper 
           videoRef={videoRef}
           canPlay={canPlay}
           setCanPlay={setCanPlay}
           tagUrl={"https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="}
         >
               <Player.Root src={getSrc("https://storage.googleapis.com/interactive-media-ads/media/android.webm")}  className="relative" >
                    <Player.Container className="h-1/2 w-1/2 overflow-hidden bg-gray-950 relative">
                          <Player.Video title="Live stream" className="h-full w-full" ref={videoRef} />
                          <CurrentSource
                              style={{
                                position: "absolute",
                                left: 20,
                                bottom: 20,
                                }}
                                setCanPlay={setCanPlay}
                            />


                              <Player.Controls className="flex items-center justify-center">

                              <Player.PlayPauseTrigger className="w-10 h-10 hover:scale-105 flex-shrink-0"
                                  >

                                    <Player.PlayingIndicator asChild matcher={false}>
                                      <PlayIcon className="w-full h-full text-white" />
                                    </Player.PlayingIndicator>

                                    <Player.PlayingIndicator asChild>
                                      <PauseIcon className="w-full h-full text-white" />
                                    </Player.PlayingIndicator>


                               </Player.PlayPauseTrigger>

                              </Player.Controls>
                                <Player.LoadingIndicator
                                    className='flex w-full h-full justify-center items-center bg-black text-white font-semibold'
                                  >
                                    Loading...
                              </Player.LoadingIndicator>
                               <Player.ErrorIndicator
                                  matcher="all"
                                  className='flex w-full h-full justify-center items-center bg-black text-white font-semibold'
                                  >
                                  An error occurred. Trying to resume playback...
                              </Player.ErrorIndicator>
                     </Player.Container>
                </Player.Root>
      </AdWrapper>
    </>
  )
}



function CurrentSource({
  style,
  __scopeMedia,
  setCanPlay
}) {
  const context = useMediaContext("CurrentSource", __scopeMedia);

  const { currentSource } = useStore(context.store, ({ currentSource }) => ({
    currentSource,
  }));

  useEffect(()=>{
    setCanPlay(context.store.getState()?.canPlay)
  },[context.store.getState()?.canPlay])
  return currentSource ? (
    <div style={style}>
     
    </div>
  ) : null;
}




export default App
