import React from "react";


const CoursesList=({courses, handleRemoveCourse})=>{
    return courses.map(course=>{
    return (
    <div key={course.id}>
      <span>Title: 
        <a href={course.url}> {course.title}</a>
      </span>
      <br/>
      <span>By: <strong>{course.author}</strong>
      </span>
      
      <span> || Duration: {course.hours_video}
      </span>
      <span> || Rating: {course.rating}
      </span>
      <br/><br/>
      <span>
        <button type="button" onClick={() => handleRemoveCourse(course)}>Remove
        </button>
      </span>
      <hr/>
      </div>
      )
  });
  }

  export default CoursesList;