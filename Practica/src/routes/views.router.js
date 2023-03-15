import {Router} from 'express';
import StudentService from '../services/db/students.service.js';
import CourseService from '../services/db/courses.service.js';

const studentsManager = new StudentService();
const coursesManager = new CourseService();

const router = Router();

router.get('/',async(req,res)=>{
    let students = await studentsManager.getAll();
    console.log(students);
    res.render('students',{students})
})

router.get('/courses',async(req,res)=>{
    let courses = await coursesManager.getAll();
    console.log(courses);
    res.render('courses',{courses})
})


export default router;