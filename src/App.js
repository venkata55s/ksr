import React, {useState, useEffect, useReducer} from 'react';
import CoursesList from './Components/CoursesList';
import Search from './Components/Search';

const courses_data=[
  {
    id: 1,
    title: 'Beginner to React',
    author: 'Venkat',
    hours_video: '4.5',
    rating: '4.5',
    url: 'http://google.com',
  },

  {
    id: 2,
    title: 'Advanced React',
    author: 'Roopali',
    hours_video: '6.8',
    rating: '4.8',
    url: 'http://facebook.com',
  },

  {
    id: 3,
    title: 'React Master',
    author: 'Roopesh',
    hours_video: '5.5',
    rating: '4.2',
    url: 'http://yahoo.com',
  },  
];



const coursesReducer = (state, action) => {
  switch(action.type) {
    case 'SET_COURSES':
      return action.payload;
    case 'REMOVE_COURSE':
      return state.filter(
        course => action.payload.id !== course.id
      )
    default:
      throw new Error();
  }
};

const App=()=> {

  const [courses, dispatchCourses] = useReducer(
    coursesReducer,
    []
  ); 
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  
  const handleSearchInputChange = event => {
    console.log(event.target.value);
    setSearchText(event.target.value);
    //localStorage.setItem('searchText', event.target.value);
  }


const handleRemoveCourse = course => {
  dispatchCourses({
    type: 'REMOVE_COURSE',
    payload: course
  });
}

  const getCoursesAsync = () =>
    new Promise(resolve => 
      setTimeout(
        () => resolve({courses: courses_data}),
        5000
      )
    );

useEffect(() => {
  setIsLoading(true);
  getCoursesAsync().then(result => {
    //setCourses(result.courses);
    dispatchCourses({
      type: 'SET_COURSES',
      payload: result.courses
    });
    setIsLoading(false);
  })
}, []);

useEffect(() => {
  localStorage.setItem('searchText', searchText)
}, [searchText]
);

  const filetredCourses = courses.filter(course => {
    return course.title.includes(searchText) || course.author.includes(searchText);
  });


  return (
    <div>
      <h1>List of books</h1>
      <hr/>
      <Search value={searchText} onSearch={handleSearchInputChange}/>
      <br/>
      {isLoading ? (
        <p>Loading the courses...Please wait.</p>
      ) : (
        <CoursesList courses={filetredCourses} handleRemoveCourse={handleRemoveCourse}/>
      )}

    </div>
  );
}


export default App;
