import './App.css';
import StudentCard from './components/StudentCard.jsx';
import StatusBadge from './components/StatusBadge.jsx';
import Accordion from './components/Accordion.jsx';
import AccordionItem from './components/AccordionItem.jsx';
import FilterableStudentList from './components/FilterableStudentList.jsx';
import Tabs, { Tab } from './components/Tabs.jsx';
import Classroom from './components/Classroom.jsx';
import QuizBuilder from './components/QuizBuilder.jsx';

function Section({ number, title, children }) {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-number">{number}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app">
      <main className="main-content">
        <Section number="1" title="Визитка на ученик">
          <div className="cards-grid">
            <StudentCard name="Иван Петров" grade="11Б" averageScore={5.67} />
            <StudentCard name="Мария Иванова" grade="11А" averageScore={5.92} />
          </div>
        </Section>

        <Section number="2" title="Статус индикатор">
          <div className="badges-row">
            <StatusBadge status="online" label="Иван" />
            <StatusBadge status="away" label="Мария" />
            <StatusBadge status="offline" label="Георги" />
          </div>
        </Section>

        <Section number="3" title="Акордеон">
          <Accordion>
            <AccordionItem title="Какво е React?">
              <p>React е JavaScript библиотека за изграждане на потребителски интерфейси.</p>
            </AccordionItem>
            <AccordionItem title="Какво е компонент?">
              <p>Компонентът е преизползваем блок, който описва част от интерфейса.</p>
            </AccordionItem>
            <AccordionItem title="Какво е JSX?">
              <p>JSX е синтактично разширение, което ни позволява да пишем HTML-подобен код в JavaScript.</p>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section number="4" title="Филтриращ се списък">
          <FilterableStudentList />
        </Section>

        <Section number="5" title="Система от табове">
          <Tabs>
            <Tab label="Профил">
              <p>Име: Иван Петров</p>
              <p>Клас: 11Б</p>
            </Tab>
            <Tab label="Оценки">
              <ul>
                <li>Математика: 5.50</li>
                <li>Физика: 6.00</li>
              </ul>
            </Tab>
            <Tab label="Настройки">
              <button type="button">Промени парола</button>
            </Tab>
          </Tabs>
        </Section>

        <Section number="6" title="Мини класна стая">
          <Classroom />
        </Section>

        <Section number="7" title="Конструктор на тестове">
          <QuizBuilder />
        </Section>
      </main>
    </div>
  );
}
