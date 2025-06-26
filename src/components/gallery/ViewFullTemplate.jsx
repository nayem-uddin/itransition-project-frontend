import { useLocation } from "react-router-dom";
import Question from "./Question";
import Markdown from "react-markdown";

export default function ViewFullTemplate() {
  const location = useLocation();
  const template = location.state;
  const { title, description, Questions, accessibility } = template;
  const userId = sessionStorage.getItem("id");
  const hasAccess =
    userId &&
    (accessibility === "public" ||
      sessionStorage.getItem("isAdmin") ||
      template?.usersWithAccess?.map((user) => user.id)?.includes(userId));
  return (
    <div className="d-flex flex-column">
      <div className="m-auto">
        <p className="h3">{title}</p>
        <Markdown>{description}</Markdown>
        <form>
          <fieldset disabled={!hasAccess}>
            {Questions.map((question) => (
              <Question question={question} key={question.id} />
            ))}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
