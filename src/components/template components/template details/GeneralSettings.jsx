import { useSelector } from "react-redux";
import ChooseTags from "./ChooseTags";
import ChooseUsers from "./ChooseUsers";
import TemplateDescription from "./TemplateDescription";
import TemplateTitle from "./TemplateTitle";
import TemplateTopic from "./TemplateTopic";
import ChooseAccessibility from "./ChooseAccessibility";

export default function GeneralSettings() {
  const template = useSelector((state) => state.templateReducer);
  return (
    <div>
      <TemplateTitle />
      <TemplateDescription />
      <TemplateTopic />
      <ChooseAccessibility />
      {template.accessibility === "restricted" && <ChooseUsers />}
      <ChooseTags />
    </div>
  );
}
