import React, { Component, useContext, useEffect, useState, createContext, BrowserRouter as Router, Route } from "react";
import { CRUDContext, CRUDProvider } from "../components/questionContext";
import QuestionPanelHeader from '../components/questionPanelHeader'
import TreeView from '../components/form-components/treeView';
import QuestionEditForm from '../components/form-components/questionEditForm';
import AnswerEditForm from '../components/form-components/answerEditForm';
import HelpText from '../components/helpText'
import ModalAlert from '../components/modalAlert'
import ModalDeleteConfirm from '../components/modalDeleteConfirm'

import {
  GRAPHQL_SERVER_URL,
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
  updateDbSummaries,
  getAnswerByAnswerId,
  insertNewFollowUpQuestion,
  delAnswer,
  delFollowUpAnswer,
  delFollowUpQuestion,
} from "../functions/ClientFunctions";
import {
  trashIcon, 
  plusCircleIcon, 
  plusCircleFilledIcon,
  infoCircleIcon,
  questionCircleIcon,
  questionCircleFilledIcon,
} from '../components/icons'

export {
  React,
  getQuestionById,
  getSummaryById,
  getAnswersById,
  getQuestionsNotFollowUp,
  useContext,
  useState,
  createContext,
  useEffect,
  delQuestion,
  CRUDContext,
  CRUDProvider,
  GRAPHQL_SERVER_URL,
  getLastAnswerId,
  getLastFollowUpQuestionId,
  insertNewAnswers,
  insertNewQuestion,
  insertNewSummary,
  getLastQuestionId,
  updateDbQuestion,
  updateDbAnswers,
  updateDbSummaries,
  getAnswerByAnswerId,
  insertNewFollowUpQuestion,
  delAnswer,
  delFollowUpQuestion,
  delFollowUpAnswer,
  Router,
  Route,
  Component,
  trashIcon, 
  plusCircleIcon, 
  plusCircleFilledIcon,
  infoCircleIcon,
  questionCircleIcon,
  questionCircleFilledIcon,
  QuestionPanelHeader, 
  TreeView, 
  QuestionEditForm, 
  AnswerEditForm, 
  HelpText,
  ModalAlert,
  ModalDeleteConfirm,
};
