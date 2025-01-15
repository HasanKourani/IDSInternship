import axios from "axios";

const getAllPosts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5135/api/postcontroller"
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const addPost = async (post) => {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      "http://localhost:5135/api/postcontroller/create",
      post,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

getAllPosts();
