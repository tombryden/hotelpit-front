import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import TitleWithProgress from "../components/TitleWithProgress";

export default function Rates() {
  return (
    <>
      <Navbar />
      <Container maxWidth="false" sx={{ paddingTop: "64px" }}>
        <TitleWithProgress title="Choose a rate" progress={66} />
      </Container>
    </>
  );
}
