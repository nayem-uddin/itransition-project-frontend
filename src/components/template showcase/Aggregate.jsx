import { useEffect, useState } from "react";
import { API_URL } from "../../assets/universals";
import QuestionInfo from "./QuestionInfo";

export default function Aggregate({ templateId }) {
  const [templateData, setTemplateData] = useState({});
  useEffect(() => {
    async function getTemplateData() {
      const res = await fetch(`${API_URL}/aggregate/${templateId}`);
      const template = await res.json();
      setTemplateData(template);
    }
    getTemplateData();
  }, [templateId]);
  const { formCount, Questions } = templateData;
  return (
    <>
      <p>Total responses: {formCount}</p>
      {Questions &&
        Questions.map((question) => (
          <QuestionInfo question={question} key={question.title} />
        ))}
    </>
  );
}
