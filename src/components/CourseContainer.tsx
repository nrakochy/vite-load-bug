import { useEffect } from "react";
import LessonsList from "./LessonsList";
import LessonContainer from "./LessonContainer";
import { CourseDetails } from "../models/courseDetailsModel";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setVideosProgressStorage } from "../redux/slices/videosProgressSlice";

type Props = {
  course: CourseDetails;
};

export default function CourseContainer(props: Props) {
  const { course } = props;
  const HOUR_IN_SECONDS = 3600;
  const dispatch = useAppDispatch();
  const { videosProgresStorage } = useAppSelector((state) => state.videosProgress);
  const [videosProgressStorageLS, setVideosProgressStorageLS] = useLocalStorage<Record<
    string,
    number
  > | null>("videos-progress-storage", null, HOUR_IN_SECONDS);
  const firstLesson = course.lessons[0];

  useEffect(() => {
    if (!videosProgressStorageLS) {
      return;
    }
    dispatch(setVideosProgressStorage(videosProgressStorageLS));
  }, []);

  useEffect(() => {
    if (!videosProgresStorage) {
      return;
    }
    setVideosProgressStorageLS(videosProgresStorage);
  }, [videosProgresStorage]);

  return (
    <div className="CourseContainer">
      <h1 className="CourseContainer__title">{course.title}</h1>
      <p className="CourseContainer__desc">{course.description}</p>

      <LessonContainer
        lesson={firstLesson}
        isFirstLesson
        currentVideoProgress={
          videosProgresStorage != null ? videosProgresStorage[firstLesson.id] : 0
        }
      />

      <LessonsList lessons={course.lessons} />
    </div>
  );
}
