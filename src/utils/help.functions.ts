import { dialogBoxPropsType } from "../components/utils/DialogBox";
import { instance } from "./functions";

// function to submit the question to the backend
export function submitHelpQuery(
  question: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>,
  setResponse: React.Dispatch<React.SetStateAction<dialogBoxPropsType>>
) {
  setLoading(true);
  instance
    .post("/help/create", { question })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setShowResponse(true);
        setResponse({ type: "success", message: response.data });
      }
    })
    .catch((error) => {
      setLoading(false);
      setShowResponse(true);
      setResponse({ type: "error", message: error.response.data });
    });
}
