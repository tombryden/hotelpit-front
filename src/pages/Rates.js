import { Container, Stack } from "@mui/material";

import Navbar from "../components/Navbar";
import RateCard from "../components/RateCard";
import TitleWithProgress from "../components/TitleWithProgress";

export default function Rates() {
  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Choose a rate" progress={66} />
        <Stack>
          <RateCard />
        </Stack>
      </Container>
    </>
  );
}
