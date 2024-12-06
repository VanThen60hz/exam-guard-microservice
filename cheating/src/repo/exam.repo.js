"use strict";
const { add } = require("lodash");
const examModel = require("../models/exam.model");

class ExamRepo {
    constructor() {
        this.selectFields = {
            teacher: 1,
            title: 1,
            description: 1,
            startTime: 1,
            endTime: 1,
            duration: 1,
            status: 1,
            question: 1,
        };
    }

    static async createExam(examData) {
        return await examModel.create(examData);
    }

    static async findExamById(examId, select = this.selectFields) {
        return await examModel
            .findOne({
                _id: examId,
            })
            .select(select)
            .populate("teacher", "_id username email name")
            .lean();
    }

    static async updateExam(examId, examData) {
        return await examModel.findByIdAndUpdate(examId, examData, { new: true });
    }

    static async deleteExam(examId) {
        return await examModel.findByIdAndDelete(examId);
    }

    static async countExams(filter = {}) {
        return await examModel.countDocuments(filter);
    }

    static async submitExam(examId, answers) {
        return { exam: examId, answers };
    }

    static async getTeacherId(examId) {
        const exam = await examModel.findOne({ _id: examId }).select("teacher").lean();
        return exam.teacher;
    }
}

module.exports = ExamRepo;
