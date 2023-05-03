import { memo, useCallback, useRef, useState } from "react";
import ReactPlayerContainer from "./ReactPlayerContainer";
import PlayIcon from "./PlayIcon";
import OverlayFallback from "./OverlayFallback";
import Modal from "./Modal";
import { Lesson } from "../models/courseDetailsModel";
import { imageErrorHandler } from "../helpers/imageErroHandler";
import { useAppDispatch } from "../redux/store";
import { IVideoProgress, updateVideosProgressStorage } from "../redux/slices/videosProgressSlice";

type Props = {
  lesson: Lesson;
  isFirstLesson?: boolean;
  currentVideoProgress: number;
};

function LessonContainer(props: Props) {
  const { lesson, isFirstLesson, currentVideoProgress } = props;
  const MIN_VIDEO_PROGRESS = 3;
  const REWIND_IN_SECONDS = 3;
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const playedSeconds = useRef<number>(0);
  const previewImageLink = `${lesson.previewImageLink}/lesson-${lesson.order}.webp`;
  const isLocked = lesson.status === "locked";

  const handleOpenModal = useCallback(() => {
    if (isLocked || !lesson.link) {
      return;
    }
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    const newVideoProgress: IVideoProgress = {
      lessonId: lesson.id,
      startPoint: playedSeconds.current,
    };

    setOpenModal(false);
    dispatch(updateVideosProgressStorage(newVideoProgress));
  }, []);

  const lessonDesc = (
    <div className="LessonContainer__desc">
      <div className="LessonContainer__number">Lesson &#x23;{lesson.order}</div>
      <h2 className="LessonContainer__title">{lesson.title}</h2>
    </div>
  );

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={isFirstLesson ? "LessonContainer first-lesson" : "LessonContainer"}
        onClick={handleOpenModal}
        onKeyDown={() => {}}
      >
        <div className="LessonContainer__image-wrapper">
          <OverlayFallback isActive={isLocked} content="Locked" />
          <img
            src={previewImageLink}
            className="LessonContainer__image"
            alt="preview"
            onError={imageErrorHandler}
          />
          {lesson.link ? <PlayIcon /> : null}
        </div>

        {lessonDesc}
      </div>

      {openModal ? (
        <Modal handleClose={handleCloseModal}>
          {lessonDesc}

          <ReactPlayerContainer
            videoStartPoint={
              currentVideoProgress >= MIN_VIDEO_PROGRESS
                ? currentVideoProgress - REWIND_IN_SECONDS
                : currentVideoProgress
            }
            videoUrl={lesson.link}
            controls
            playing
            onProgress={(progress) => {
              playedSeconds.current = progress.playedSeconds;
            }}
          />
        </Modal>
      ) : null}
    </>
  );
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return prevProps.currentVideoProgress === nextProps.currentVideoProgress;
}

export default memo(LessonContainer, areEqual);
