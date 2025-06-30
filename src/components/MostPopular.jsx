import { useMemo } from "react";
import Gallery from "./gallery/Gallery";

export default function MostPopular({ templates }) {
  const populars = useMemo(
    () =>
      templates
        .toSorted(
          (template1, template2) => template1.formCount - template2.formCount
        )
        .reverse(),
    [templates]
  );
  return (
    <>
      <Gallery templates={populars.slice(0, 5)} />
      {console.log(populars)}
    </>
  );
}
