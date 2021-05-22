import * as mongoose from 'mongoose';
import { StudentSchema } from '../models/student';
import { Request, Response } from "express"; 

const StudentMongooseModel = mongoose.model('Student', StudentSchema);

export class StudentController {
    public addNewStudent(req: Request, res: Response) {
        let newStudent = new StudentMongooseModel(req.body);

        newStudent.save((err, data)=>{
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }

    public getStudents(req: Request, res: Response){
        StudentMongooseModel.find({}, (err, data)=>{
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }

    public getStudentById(req: Request, res: Response){
        StudentMongooseModel.findById(req.params.studentId, (err, data)=>{
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }

    public updateStudent(req: Request, res: Response){
        StudentMongooseModel.findOneAndUpdate({_id: req.params.studentId}, req.body, (err, data)=>{
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }
    public deleteStudent(req: Request, res: Response){
        StudentMongooseModel.findByIdAndDelete(req.params.studentId, (err, data)=>{
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }

    public generateDummyData(req: Request, res: Response){
        var data = [
            {
                "FirstName": "xyze",
                "LastName": "wer",
                "School": "ewrfds",
                "StartDate": new Date("2020-01-01T00:00:00")
            },
            {
                "FirstName": "sdffg",
                "LastName": "ksdjhf",
                "School": "skjdfh",
                "StartDate": new Date("2020-01-01T00:00:00")
            },
            {
                "FirstName": "ksldjg",
                "LastName": "kjsdh",
                "School": "sjkfdh",
                "StartDate": new Date("2020-01-01T00:00:00")
            },
            {
                "FirstName": "skdlgj",
                "LastName": "sda",
                "School": "sdf",
                "StartDate": new Date("2020-01-01T00:00:00")
            },
            {
                "FirstName": "lksdjf",
                "LastName": "lksdjf",
                "School": "skldfj",
                "StartDate": new Date("2020-01-01T00:00:00")
            }
        ];

        StudentMongooseModel.collection.insert(data, function(err, docs) {
            if(err){
                res.send(err);
            }
            res.json({message: "all the data has been inserted"});
        })
    }
}