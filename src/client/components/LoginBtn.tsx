import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function LoginBtn() {
  return (
    <Stack direction="row" spacing={2}>
      <Link to="/login">
        <Button variant="contained">ADMIN</Button>
      </Link>
    </Stack>
  );
}
