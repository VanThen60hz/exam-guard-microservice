"use strict";

const { SuccessResponse } = require("../core/success.response");
const examService = require("../services/exam.service");

class ExamController {
    getExamById = async (req, res, next) => {
        const { id } = req.params;
        const exam = await examService.findExamById(id, req.userId);

        new SuccessResponse({
            message: "Exam retrieved successfully",
            metadata: exam,
        }).send(res);
    };

    createExam = async (req, res, next) => {
        const newExam = await examService.createExam(req);
        new SuccessResponse({
            message: "Exam created successfully",
            metadata: newExam,
        }).send(res);
    };

    updateExam = async (req, res, next) => {
        const { id } = req.params;
        const examData = req.body;
        const userId = req.userId;
        const updatedExam = await examService.updateExam(id, examData, userId);

        new SuccessResponse({
            message: "Exam updated successfully",
            metadata: updatedExam,
        }).send(res);
    };

    deleteExam = async (req, res, next) => {
        const { id } = req.params;
        const response = await examService.deleteExam(id);

        new SuccessResponse({
            message: response.message,
        }).send(res);
    };

    listExams = async (req, res, next) => {
        const { teacher, status, page = 1, limit = 10 } = req.query;
        const filter = {
            ...(status && { status }),
        };

        let responseData;

        if (req.role === "TEACHER") {
            const teacherId = req.userId;
            filter.teacher = teacherId;
            if (status) filter.status = status;
            responseData = await examService.listExamsForTeacher(filter, page, limit);
        } else {
            if (teacher) filter.teacher = teacher;
            filter.status = "In Progress";
            const studentId = req.userId;
            responseData = await examService.listExamsForStudent(filter, page, limit, studentId);
        }

        new SuccessResponse({
            message: "List of exams retrieved successfully",
            metadata: {
                total: responseData.total,
                totalPages: responseData.totalPages,
                exams: responseData.exams,
            },
        }).send(res);
    };

    searchExams = async (req, res, next) => {
        const { query, status, page = 1, limit = 10 } = req.query;
        const filter = {};
        let responseData;

        if (req.role === "TEACHER") {
            const teacherId = req.userId;
            filter.teacher = teacherId;
            if (status) filter.status = status;
            responseData = await examService.filterExamsForTeacher({ ...filter, query }, page, limit);
        } else {
            filter.status = "In Progress";
            responseData = await examService.filterExamsForStudent({ ...filter, query }, page, limit);
        }

        new SuccessResponse({
            message: "Search results retrieved successfully",
            metadata: {
                total: responseData.total,
                totalPages: responseData.totalPages,
                exams: responseData.exams,
            },
        }).send(res);
    };

    joinExam = async (req, res, next) => {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const studentId = req.userId;
        const response = await examService.joinExam(id, studentId, page, limit);

        new SuccessResponse({
            message: response.message,
            metadata: {
                remainingTime: response.remainingTime,
                total: response.total,
                totalPages: response.totalPages,
                questions: response.questions,
            },
        }).send(res);
    };

    submitExam = async (req, res, next) => {
        try {
            const { id: examId } = req.params;
            const userId = req.userId;
            const response = await examService.submitExam(examId, userId, req.body.answers);

            new SuccessResponse({
                message: response.message,
                grade: response.newGrade,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new ExamController();
