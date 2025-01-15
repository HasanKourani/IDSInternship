import axios from "axios";

function SignUp() {
  axios
    .get("https://localhost:7172/api/UserController")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error", error);
    });
}
