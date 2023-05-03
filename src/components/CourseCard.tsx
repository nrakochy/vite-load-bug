import { Link } from "react-router-dom";
import { MouseEventHandler, useCallback, useRef } from "react";
import ReactPlayerContainer from "./ReactPlayerContainer";
import { Course } from "../models/coursesPreviewModel";

type Props = {
  course: Course;
};

export default function CourseCard(props: Props) {
  const { course } = props;
  const previewImageLink = `${course.previewImageLink}/cover.webp`;
  const videoLink = course.meta.courseVideoPreview?.link;
  const timeOut = useRef<ReturnType<typeof setTimeout>>();

  const mouseEnterHandler: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const { currentTarget } = e;
    const video = currentTarget.querySelector("video");
    const img = currentTarget.querySelector("img");

    if (video === null) {
      return;
    }
    video.play();

    if (img !== null) {
      timeOut.current = setTimeout(() => {
        img.style.opacity = "0";
      }, 800);
    }
  }, []);

  const mouseOutHandler: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const { currentTarget } = e;
    const video = currentTarget.querySelector("video");

    if (video != null) video.pause();

    clearTimeout(timeOut.current);
  }, []);

  return (
    <div className="CourseCard__card">
      <Link to={`courses/${course.id}`} className="CourseCard__link">
        <div
          className="CourseCard__media media"
          onMouseEnter={mouseEnterHandler}
          onMouseOut={mouseOutHandler}
          onBlur={() => {}}
        >
          <img src={previewImageLink} alt="preview" className="media__image" />

          <ReactPlayerContainer
            videoUrl={videoLink!}
            previewImageUrl={videoLink ? undefined : previewImageLink}
            muted
            loop
            playIcon={undefined}
          />
        </div>

        <div className="CourseCard__desc desc">
          <h2 className="desc__title">{course.title}</h2>
          <div className="desc__lessons-count">
            <span>Lessons count: </span>
            {course.lessonsCount}
          </div>

          {course.meta.skills ? (
            <div className="desc__skills skills">
              <ul className="skills__list">
                <span>Skills:</span>
                {course.meta.skills.map((skill) => (
                  <li key={skill} className="skills__item">
                    &#8211; {skill}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="skills" />
          )}

          <div className="desc__rating">
            <span>Rating: </span>
            {course.rating}
          </div>
        </div>
      </Link>
    </div>
  );
}
