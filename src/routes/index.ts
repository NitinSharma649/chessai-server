import { Request, Response } from "express";
import { StudentController } from "../controllers/StudentController"
import { TestingController } from "../controllers/TestingController"

export class Routes {

    studentController: StudentController = new StudentController();
    testingController: TestingController = new TestingController();

    public routes(app: any): void {
        app.route('/')
            .get((req: Request, res: Response) =>{
                res.status(200).send("Hello Good World");
            });

        app.route('/api/students')
            .get(this.studentController.getStudents);

        app.route('/api/students')
            .post(this.studentController.addNewStudent);

        app.route('/api/students/:studentId')
            .get(this.studentController.getStudentById);

        app.route('/api/students/:studentId')
            .put(this.studentController.updateStudent);

        app.route('/api/students/:studentId')
            .delete(this.studentController.deleteStudent);

        app.route('/api/dummy')
            .get(this.studentController.generateDummyData);

        app.route('/test')
            .get(this.testingController.index);
        app.route('/test/create')
            .get(this.testingController.create);
        app.route('/test')
            .post(this.testingController.store);
        app.route('/test/:id')
            .get(this.testingController.show);
        app.route('/test/:id/edit')
            .get(this.testingController.edit);
        app.route('/test/:id')
            .put(this.testingController.update);
        app.route('/test/:id')
            .delete(this.testingController.delete);
    }
}