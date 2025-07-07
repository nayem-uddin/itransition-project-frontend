import { Box, Container } from "@mui/material";

export default function Instructions() {
  return (
    <Container>
      <Box>
        <p className="h4">For templates:</p>
        <ul>
          <li>Click on the title or description of a template to edit.</li>
          <li>Use markdown to write the description of the template.</li>
          <li>
            Use drag-n-drop operations to reorder questions while creating a
            template. However, this feature is not available in edit mode.
          </li>
          <li>
            While creating or editing a tab:
            <ul>
              <li>
                Find and set the{" "}
                <strong>
                  title, description, topic, tags, and users' accessibility
                </strong>{" "}
                in the <mark>General settings</mark>
                tab,
              </li>
              <li>
                Find and set the questions in the <mark>Questions</mark> tab.
              </li>
            </ul>
          </li>
          <li>
            To edit a template, find the template in the table available in the{" "}
            <mark>Created templates</mark> page under the dashboard and click on
            that template.
          </li>
          <li>
            In both create and edit mode, there is a common <mark>Save</mark>{" "}
            button above the tabs clicking which the template can be created or
            updated (based on the mode).
          </li>

          <li>
            Some tags are already available, but custom tags can be added as
            well. To add custom tags, write a tag, and then press Enter to add
            that tag to the tags' list.
          </li>
          <li>
            Responses to a template can be opened as forms and they can be found
            under the <mark>Results</mark>
            tab in edit mode.
          </li>
          <li>
            If a template is edited, the older responses will remain as they
            were. Only the upcoming responses will have the advantages of the
            updated template.
          </li>
        </ul>
      </Box>

      <Box>
        <p className="h4">For questions:</p>
        <ul>
          <li>Click on the title or description of a question to edit.</li>
          <li>Use markdown to write the description of the question</li>
          <li>
            Questions are of 4 types based on the types of answers:
            <ol>
              <li>
                <strong>String: </strong>
                The user will write a descriptive answer
              </li>
              <li>
                <strong>Integer:</strong>
                The user will select an integer within a given range
              </li>
              <li>
                <strong>Radio: </strong>
                The user will select only one from the given options
              </li>
              <li>
                <strong>Checkbox:</strong>
                The user can select multiple options from the given options
              </li>
            </ol>
          </li>
          <li>
            At most 4 questions of each type are allowed, thus at most 16
            questions in a template can be added
          </li>
          <li>
            For radio and checkbox type questions, click the three dots at the
            right of each added option to edit/delete that option
          </li>
          <li>
            In both template create and edit mode, multiple questions can be
            selected checking the checkboxes beside them, and can be deleted at
            once clicking the delete button above them. However, once a question
            is deleted, it can not be recovered.
          </li>
        </ul>
      </Box>
    </Container>
  );
}
