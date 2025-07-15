import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
export default function QuestionInfo({ question }) {
  const { title, type, mostChosenThree } = question;

  return (
    <Box sx={{ mb: 1 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDown />}>
          <p className="h4">{title}</p>
        </AccordionSummary>
        <AccordionDetails>
          {["description", "type"].map((prop) => (
            <div key={prop}>
              <p className="h5 text-capitalize">{prop}</p>
              <p>{question[prop]}</p>
            </div>
          ))}
          {type === "integer" && (
            <>
              <p className="h5 text-capitalize">average</p>
              <p>{question["average"]}</p>
            </>
          )}
          {["radio", "checkbox"].includes(type) && (
            <>
              <p className="h5 text-capitalize">top 3 most chosen answers</p>
              {mostChosenThree.map((ans) => (
                <span key={ans}>{ans}</span>
              ))}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
