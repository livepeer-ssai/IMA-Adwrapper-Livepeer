import React ,{useEffect,useState,useRef} from 'react'
import styles from './styles.module.css'
import { FaPlay } from "react-icons/fa";

export const AdWrapper = ({ children,videoRef,canPlay,setCanPlay,tagUrl}) => {
      var script = document.createElement('script');
      script.src = '//imasdk.googleapis.com/js/sdkloader/ima3.js';
      document.head.appendChild(script);
      
       script.onload = function() {
           console.log("script")
        };

        const [adevent,setEvent]=useState()
        const [container,setContainer]=useState()
  

        const adPlaybackRef = useRef(null);
        const [adsLoaded, setAdsLoaded] = useState(false);
        const [adsCompleted, setAdsCompleted] = useState(false);
        var adContainer;
        var adDisplayContainer;
        var adsLoader;
        var adsManager;
        var videoElement;

      
      useEffect(() => {
          videoElement = videoRef.current;
          initializeIMA();
        }, []);


        function onAdsManagerLoaded(adsManagerLoadedEvent) {
      
        
          setAdsLoaded(true);
          setEvent(adsManagerLoadedEvent)
         
          var adsRenderingSettings = new google.ima.AdsRenderingSettings();
          adsRenderingSettings.enablePreloading = true;
          adsManager = adsManagerLoadedEvent.getAdsManager(
              videoElement,adsRenderingSettings);
    ;

              console.log(adsManager,"mangerrrr")

          adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            onContentPauseRequested);
          adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            onContentResumeRequested);

            adsManager.addEventListener(
              google.ima.AdEvent.Type.LOADED,
             onAdLoaded);
             adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE,()=>setAdsLoaded(false) || setAdsCompleted(true));


             adsManager.addEventListener(
              google.ima.AdEvent.Type.AD_ERROR,
              onAdError);
        }
        
        function onAdError(adErrorEvent) {
          // Handle the error logging.
          console.log(adErrorEvent.getError(),"err");
          if(adsManager) {
            adsManager.destroy();
          }
        }



        const initializeIMA = () => {
          console.log("initializing IMA");
          adContainer = adPlaybackRef.current;
      
          adDisplayContainer = new google.ima.AdDisplayContainer(adContainer,videoElement);
          console.log(adDisplayContainer,"display")
          setContainer(adDisplayContainer)
          adsLoader = new google.ima.AdsLoader(adDisplayContainer);

            adsLoader.addEventListener(
              google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
              onAdsManagerLoaded,
              false);
        
            adsLoader.addEventListener(
              google.ima.AdErrorEvent.Type.AD_ERROR,
              onAdError,
              false);

          console.log(adsLoader,"lll")
          videoElement.addEventListener('ended', function() {
            adsLoader.contentComplete();
          });
          var adsRequest = new google.ima.AdsRequest();

        
          adsRequest.adTagUrl =tagUrl

          adsRequest.linearAdSlotWidth = videoElement.clientWidth;
          adsRequest.linearAdSlotHeight = videoElement.clientHeight;
          adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
          adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;
          console.log(adsRequest,"after reeee")


          // adsRequest.setAdWillAutoPlay(true);
          // adsRequest.setAdWillPlayMuted(false);

          adsLoader.requestAds(adsRequest);

        


        };





   const loadAds = () => {
    videoElement = videoRef.current;
  
    const manager = adevent.getAdsManager(
        videoElement);

         videoElement?.load();
         console.log(container,"conatiner")
        
         container.initialize();
       var width = videoElement?.clientWidth;
       var height = videoElement?.clientHeight;
      try {
        manager.init(width, height, google.ima.ViewMode.NORMAL);
     
        manager.start();
        console.log("loading ads 22");
      } catch (adError) {
               console.log(adError,"errr")
           // Play the video without ads, if an error occurs
               console.log("AdsManager could not be started");
               videoElement?.play();
      }

      setAdsLoaded(false);

  };



      const handlePlayButtonClick = () => {
        console.log("clicked")
        videoElement?.play();
        };

      const handleVideoPlay = () => {
        console.log("playing add")
          loadAds();
      };


      function onContentPauseRequested() {
        videoElement?.pause();
      }
      
      function onContentResumeRequested() {
        videoElement?.play();
        }

      function onAdLoaded(adEvent) {
        var ad = adEvent.getAd();

        console.log(ad,"adds")
        
        if (!ad.isLinear()) {
          videoElement?.play();
        }
      }
  return (
    <div className={styles.test}>
         <div style={{position:"relative"}}>
               {children}
         
        
             <div id="ad-container" ref={adPlaybackRef}  style={{position:'absolute',top:0,display:`${adsCompleted?"none":"flex"}`}}></div>
             {canPlay&&adsLoaded&&
               <div className='adContainer' style={{background:"black",width:"100%",height:"100%",position:"absolute",top:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <FaPlay style={{color:"white",fontSize:"24px"}} onClick={handleVideoPlay}/>
              
                </div> 
               }
         </div>
    </div>
  )
}
