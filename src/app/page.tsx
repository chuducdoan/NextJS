import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";

export default function HomePage() {
  // const res = fetch(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
  //   method: "POST",
  //   headers: {
  // "Content-Type": 'application/json'
  //      },
  //   body: JSON.stringify({
  //     category: "CHILL",
  //     limit: 10,
  //   }),
  // });

  return (
    <Container>
      <MainSlider />
    </Container>
  );
}
