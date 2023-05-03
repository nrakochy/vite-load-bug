import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import { Course } from "../models/coursesPreviewModel";
import { usePagination } from "../hooks/usePagination";

type Props = {
  courses: Course[];
};

export default function CoursesList(props: Props) {
  const { courses } = props;
  const PER_PAGE = 10;
  const ACTIVE_PAGE = 1;
  const { coursesPerPage, currentPage, setCurrentPage, currentCourses } = usePagination(
    courses,
    PER_PAGE,
    ACTIVE_PAGE,
  );

  return (
    <>
      <ul className="CoursesList__list">
        {currentCourses.map((course) => (
          <li className="CoursesList__item" key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>

      <Pagination
        totalCourses={courses.length}
        coursesPerPage={coursesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
