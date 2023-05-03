import ReactPlayer, { ReactPlayerProps } from "react-player";
import { useCallback, useEffect, useRef, useState } from "react";
import OverlayFallback from "./OverlayFallback";
import { imageErrorHandler } from "../helpers/imageErroHandler";

interface IProps extends ReactPlayerProps {
  videoUrl: string;
  videoStartPoint?: number;
  previewImageUrl?: string;
}

type HlsErrorData = {
  type: string;
  details: string;
  fatal: boolean;
  buffer: number;
};

export default function ReactPlayerContainer(props: IProps) {
  const { videoUrl, videoStartPoint, previewImageUrl, ...restProps } = props;
  const [fallbackState, setFallbackState] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (!videoStartPoint) return;
    if (playerRef.current) {
      playerRef.current.seekTo(videoStartPoint, "seconds");
    }
  }, [videoStartPoint]);

  const playerErrorHandler = useCallback(
    (error: string, data: HlsErrorData, hlsInstance: any, hlsGlobal: any) => {
      if (!data.fatal || fallbackState) {
        return;
      }

      setFallbackState(true);
      console.warn("Failure to load video: ", error, data, hlsInstance, hlsGlobal);
    },
    [],
  );

  return (
    <div className="ReactPlayerContainer">
      {fallbackState ? (
        <OverlayFallback isActive={fallbackState} content="Failure to load video..." />
      ) : null}
      <ReactPlayer
        ref={playerRef}
        className="ReactPlayerContainer__react-player"
        url={videoUrl}
        width="100%"
        height="100%"
        pip
        onError={playerErrorHandler}
        light={
          previewImageUrl ? (
            <img src={previewImageUrl} alt="Thumbnail" onError={imageErrorHandler} />
          ) : (
            false
          )
        }
        config={{
          file: {
            attributes: {
              preload: "none",
            },
          },
        }}
        {...restProps}
      />
    </div>
  );
}
