import React, { Component, useContext, useEffect, useState, createContext, BrowserRouter as Router, Route } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { CRUDContext, CRUDProvider } from "../components/questionContext";
import QuestionListForm from "../components/form-components/questionListForm";
import SummaryListForm from "../components/form-components/summaryListForm";
import AnswerListForm from "../components/form-components/answerListForm";
import CreateQuestion from '../components/createQuestion';
import FollowUpQuestion from '../components/followUpQuestion';
import UpdateQuestion from '../components/updateQuestion';
import DeleteQuestion from '../components/deleteQuestion';
import {
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary,
  getLastFollowUpQuestionId,
  getLastAnswerId,
  getLastQuestionId, 
} from "../functions/ClientFunctions";

export {
  React,
  CreateQuestion,
  FollowUpQuestion,
  UpdateQuestion,
  DeleteQuestion,
  useContext,
  useState,
  createContext,
  useEffect,
  Header,
  Footer,
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
  Router,
  Route,
  Component
};
