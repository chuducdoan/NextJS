import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

const TestPage = async () => {

    const res = await sendRequest<IBackendRes<ITrackProps>>({
    url: `http://localhost:3000/api/test`,
    method: "GET",
    nextOption: {
        // cache: 'no-store'
        next: {revalidate: 10}
    }
    });

    return <Container>
        <div>test random: </div>
        <div>{JSON.stringify(res)}</div>
    </Container>
}

export default TestPage;