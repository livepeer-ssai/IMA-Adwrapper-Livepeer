# livepeerjs-ima

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/livepeerjs-ima.svg)](https://www.npmjs.com/package/livepeerjs-ima) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save livepeerjs-ima
npm i @livepeer/react

```

## Usage

```jsx
    import { useState,useEffect,useRef } from 'react'
    import { AdWrapper } from 'livepeerjs-ima'
    import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
    import { getSrc, } from "@livepeer/react/external";
    import * as Player from "@livepeer/react/player";
    import { useMediaContext} from "@livepeer/react/player";

    function App() {
          const videoRef = useRef(null);
          const [canPlay,setCanPlay]=useState(false)

             return(
                         <AdWrapper 
                            videoRef={videoRef}
                            canPlay={canPlay}
                            setCanPlay={setCanPlay}
                            tagUrl={""}
                          >
                                  <Player.Root src={getSrc("https://storage.googleapis.com/interactive-media-ads/media/android.webm")}  className="relative" >
                                         <Player.Container className="h-1/2 w-1/2 overflow-hidden bg-gray-950 relative">
                                                <Player.Video title="Live stream" className="h-full w-full" ref={videoRef} />
                                                <CurrentSource
                                                    setCanPlay={setCanPlay}
                                                />
                                          </Player.Container>
                                 </Player.Root>

                         </AdWrapper>

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

```


## License

MIT © [scapula07](https://github.com/scapula07)
