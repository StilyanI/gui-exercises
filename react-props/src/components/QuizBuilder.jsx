import { useState } from 'react';
import './QuizBuilder.css';

function createQuestion(id) {
  return {
    id,
    text: '',
    options: ['', ''],
    correctIndexes: [],
  };
}

function QuizHeader({ title, onChange, isPreview }) {
  return (
    <div className="quiz-header">
      {isPreview ? (
        <h3 className="quiz-title">{title || 'Нов тест'}</h3>
      ) : (
        <input
          className="quiz-title-input"
          type="text"
          value={title}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Въведи заглавие на теста"
        />
      )}
    </div>
  );
}

function QuestionEditor({ question, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
  const updateOption = (optionIndex, value) => {
    const nextOptions = question.options.map((option, index) =>
      index === optionIndex ? value : option
    );
    onUpdate(question.id, { ...question, options: nextOptions });
  };

  const toggleCorrect = (optionIndex) => {
    const alreadyCorrect = question.correctIndexes.includes(optionIndex);
    const nextCorrectIndexes = alreadyCorrect
      ? question.correctIndexes.filter((index) => index !== optionIndex)
      : [...question.correctIndexes, optionIndex].sort((a, b) => a - b);

    onUpdate(question.id, { ...question, correctIndexes: nextCorrectIndexes });
  };

  const addOption = () => {
    if (question.options.length >= 6) {
      return;
    }

    onUpdate(question.id, {
      ...question,
      options: [...question.options, ''],
    });
  };

  const deleteOption = (optionIndex) => {
    if (question.options.length <= 1) {
      return;
    }

    const nextOptions = question.options.filter((_, index) => index !== optionIndex);
    const nextCorrectIndexes = question.correctIndexes
      .filter((index) => index !== optionIndex)
      .map((index) => (index > optionIndex ? index - 1 : index));

    onUpdate(question.id, {
      ...question,
      options: nextOptions,
      correctIndexes: nextCorrectIndexes,
    });
  };

  return (
    <article className="quiz-question-card">
      <div className="quiz-question-toolbar">
        <span className="quiz-question-label">Въпрос</span>
        <div className="quiz-question-actions">
          <button type="button" className="quiz-secondary-btn" onClick={() => onMoveUp(question.id)} disabled={!canMoveUp}>
            Нагоре
          </button>
          <button type="button" className="quiz-secondary-btn" onClick={() => onMoveDown(question.id)} disabled={!canMoveDown}>
            Надолу
          </button>
          <button type="button" className="quiz-danger-btn" onClick={() => onDelete(question.id)}>
            Изтрий
          </button>
        </div>
      </div>

      <input
        className="quiz-question-input"
        type="text"
        value={question.text}
        onChange={(event) => onUpdate(question.id, { ...question, text: event.target.value })}
        placeholder="Напиши текста на въпроса"
      />

      <div className="quiz-options-list">
        {question.options.map((option, index) => (
          <div key={`${question.id}-${index}`} className="quiz-option-row">
            <input
              className="quiz-option-input"
              type="text"
              value={option}
              onChange={(event) => updateOption(index, event.target.value)}
              placeholder={`Отговор ${index + 1}`}
            />

            <label className="quiz-correct-toggle">
              <input
                type="checkbox"
                checked={question.correctIndexes.includes(index)}
                onChange={() => toggleCorrect(index)}
              />
              <span>Правилен</span>
            </label>

            <button
              type="button"
              className="quiz-icon-btn"
              onClick={() => deleteOption(index)}
              disabled={question.options.length <= 1}
            >
              Изтрий
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="quiz-secondary-btn quiz-add-option-btn"
        onClick={addOption}
        disabled={question.options.length >= 6}
      >
        Добави отговор
      </button>
    </article>
  );
}

function QuestionPreview({ question, index }) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const toggleSelected = (optionIndex) => {
    setSelectedIndexes((current) =>
      current.includes(optionIndex)
        ? current.filter((indexValue) => indexValue !== optionIndex)
        : [...current, optionIndex]
    );
  };

  return (
    <article className="quiz-question-card quiz-question-preview">
      <p className="quiz-preview-title">
        {index + 1}. {question.text || 'Въпрос без текст'}
      </p>

      <div className="quiz-preview-options">
        {question.options.map((option, optionIndex) => (
          <label key={`${question.id}-${optionIndex}`} className="quiz-preview-option">
            <input
              type="checkbox"
              checked={selectedIndexes.includes(optionIndex)}
              onChange={() => toggleSelected(optionIndex)}
            />
            <span>{option || `Отговор ${optionIndex + 1}`}</span>
          </label>
        ))}
      </div>
    </article>
  );
}

let nextQuestionId = 1;

export default function QuizBuilder() {
  const [mode, setMode] = useState('edit');
  const [title, setTitle] = useState('Нов тест');
  const [questions, setQuestions] = useState([createQuestion(nextQuestionId++)]);

  const addQuestion = () => {
    setQuestions((current) => [...current, createQuestion(nextQuestionId++)]);
  };

  const updateQuestion = (id, updatedQuestion) => {
    setQuestions((current) =>
      current.map((question) => (question.id === id ? updatedQuestion : question))
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((current) => current.filter((question) => question.id !== id));
  };

  const moveQuestion = (id, direction) => {
    setQuestions((current) => {
      const questionIndex = current.findIndex((question) => question.id === id);

      if (questionIndex === -1) {
        return current;
      }

      const targetIndex = direction === 'up' ? questionIndex - 1 : questionIndex + 1;
      if (targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }

      const nextQuestions = [...current];
      [nextQuestions[questionIndex], nextQuestions[targetIndex]] = [
        nextQuestions[targetIndex],
        nextQuestions[questionIndex],
      ];

      return nextQuestions;
    });
  };

  return (
    <div className="quiz-builder">
      <div className="quiz-topbar">
        <button
          type="button"
          className="quiz-primary-btn"
          onClick={() => setMode((current) => (current === 'edit' ? 'preview' : 'edit'))}
        >
          {mode === 'edit' ? 'Преглед' : 'Редактиране'}
        </button>

        <span className={`quiz-mode-badge ${mode === 'preview' ? 'is-preview' : ''}`}>
          {mode === 'edit' ? 'Режим: редактиране' : 'Режим: преглед'}
        </span>
      </div>

      <QuizHeader title={title} onChange={setTitle} isPreview={mode === 'preview'} />

      <div className="quiz-questions">
        {questions.length === 0 ? (
          <p className="quiz-empty-state">Все още няма добавени въпроси.</p>
        ) : (
          questions.map((question, index) =>
            mode === 'edit' ? (
              <QuestionEditor
                key={question.id}
                question={question}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
                onMoveUp={(questionId) => moveQuestion(questionId, 'up')}
                onMoveDown={(questionId) => moveQuestion(questionId, 'down')}
                canMoveUp={index > 0}
                canMoveDown={index < questions.length - 1}
              />
            ) : (
              <QuestionPreview key={question.id} question={question} index={index} />
            )
          )
        )}
      </div>

      {mode === 'edit' && (
        <button type="button" className="quiz-primary-btn quiz-add-question-btn" onClick={addQuestion}>
          + Нов въпрос
        </button>
      )}
    </div>
  );
}
