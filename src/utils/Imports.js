import React, { Component, useContext, useEffect, useState, createContext, BrowserRouter as Router, Route } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CreateHeader from '../components/form-components/createHeader'
import FollowUpHeader from '../components/form-components/followUpHeader';
import UpdateHeader from '../components/form-components/updateHeader'
import QuestionPanelHeader from '../components/questionPanelHeader'
import { CRUDContext, CRUDProvider } from "../components/questionContext";
import QuestionListForm from "../components/form-components/questionListForm";
import QuestionsPanelTable from '../components/form-components/questionsPanelTable';
import SummaryListForm from "../components/form-components/summaryListForm";
import AnswerListForm from "../components/form-components/answerListForm";
import CreateQuestion from '../components/createQuestion';
//import FollowUpQuestion from '../components/followUpQuestion';
import UpdateQuestion from '../components/updateQuestion';
import DeleteQuestion from '../components/deleteQuestion';
import {
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary,
  getLastFollowUpQuestionId,
  getLastAnswerId,
  getLastQuestionId, 
  getQuestionsNotFollowUp,
  getQuestionById,
  getSummaryById,
  getAnswersById,
  delQuestion,
  updateDbQuestion,
  updateDbAnswers,
  updateDbSummaries
} from "../functions/ClientFunctions";

export {
  React,
  CreateHeader,
  UpdateHeader,
  FollowUpHeader,
  QuestionPanelHeader,
  QuestionsPanelTable,
  CreateQuestion,
  getQuestionById,
  getSummaryById,
  getAnswersById,
  getQuestionsNotFollowUp,
  //FollowUpQuestion,
  UpdateQuestion,
  DeleteQuestion,
  useContext,
  useState,
  createContext,
  useEffect,
  Header,
  Footer,
  delQuestion,
  CRUDContext,
  CRUDProvider,
  QuestionListForm,
  SummaryListForm,
  AnswerListForm,
  getLastAnswerId,
  getLastFollowUpQuestionId,
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary,
  getLastQuestionId,
  updateDbQuestion,
  updateDbAnswers,
  updateDbSummaries,
  Router,
  Route,
  Component
};
