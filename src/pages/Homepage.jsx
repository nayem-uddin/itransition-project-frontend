import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../assets/universals";
import { updateTemplatesList } from "../features/filter templates/gallerySlice";
import Gallery from "../components/gallery/Gallery";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tagcloud from "../components/Tagcloud";
import MostPopular from "../components/MostPopular";
export default function Homepage() {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("request-templates");
    socket.on("send-templates", (data) => {
      dispatch(updateTemplatesList(data.templates));
    });
  }, []);
  const templates = useSelector(
    (state) => state.galleryReducer.filteredTemplates
  );
  const [tab, setTab] = useState("1");
  function handleChange(event, newValue) {
    setTab(newValue);
  }
  return (
    <div>
      <Box>
        <TabContext value={tab}>
          <Box>
            <TabList onChange={handleChange} centered>
              <Tab label="Latest" value="1" />
              <Tab label="Most popular" value="2" />
              <Tab label="Tag cloud" value="3" />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="1">
              <Gallery templates={templates} />
            </TabPanel>
            <TabPanel value={"2"}>
              <MostPopular templates={templates} />
            </TabPanel>
            <TabPanel value={"3"}>
              <Tagcloud templates={templates} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
}
