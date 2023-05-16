import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import DialogBox, {
  dialogBoxPropsType,
} from "../../components/utils/DialogBox";
import { TailSpin } from "react-loader-spinner";
import { submitHelpQuery } from "../../utils/help.functions";

export default function Help() {
  //loading state
  const [isLoading, setIsLoading] = React.useState(false);
  //form state
  const [question, setQuestion] = React.useState("");
  //response state
  const [showResponse, setShowResponse] = React.useState(false);
  const [response, setResponse] = React.useState<dialogBoxPropsType>({
    type: "info",
    message: "",
  });
  return (
    // This section contains help related stuff and one form to submit query
    <article>
      {/* header for the help section containing heading and description of the page */}
      <header className="flex flex-col gap-5 border-b border-gray-600 p-10">
        <span>
          <h5 className="text-sky-800">The FAQs</h5>
          <h1 className="text-5xl">Help centre</h1>
        </span>
        <h3 className="text-gray-700">
          Everything you need to know about the product and billing.
        </h3>
      </header>
      {/* main section of the help section containing information about the help section  */}
      <main className=" grid grid-cols-[1.5fr,2fr] gap-5 bg-gray-50 px-5 py-14 max-sm:grid-cols-1 max-sm:grid-rows-2 max-sm:gap-0 max-xs:py-10 ">
        <div className="flex flex-col gap-2 p-5 max-sm:pb-0">
          <h6 className="text-sm text-sky-800">Support</h6>
          <h2 className="text-4xl">FAQs</h2>
          <p className="text-sm text-gray-700">
            Everything you need to know about the product and billing. Can't
            find the answer you're looking for? Please Submit your question or
            problem below.
          </p>
        </div>
        {/* this div containing common question with answers */}
        <div className="flex flex-col gap-5 p-5 max-sm:pt-0">
          <details>
            <summary className="cursor-pointer font-medium">
              Is there return policy available?
            </summary>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              voluptatem eaque harum dolorem voluptatibus, nam deserunt
              consectetur dolore iste tempore enim nostrum facere. Aliquam,
              consequatur aut ex quibusdam earum mollitia!
            </p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">
              Can i replace my product?
            </summary>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              voluptatem eaque harum dolorem voluptatibus, nam deserunt
              consectetur dolore iste tempore enim nostrum facere. Aliquam,
              consequatur aut ex quibusdam earum mollitia!
            </p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">
              What is your cancellation policy?
            </summary>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              voluptatem eaque harum dolorem voluptatibus, nam deserunt
              consectetur dolore iste tempore enim nostrum facere. Aliquam,
              consequatur aut ex quibusdam earum mollitia!
            </p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">
              Can other info be added to an invoice?
            </summary>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              voluptatem eaque harum dolorem voluptatibus, nam deserunt
              consectetur dolore iste tempore enim nostrum facere. Aliquam,
              consequatur aut ex quibusdam earum mollitia!
            </p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">
              How does billing work?
            </summary>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              voluptatem eaque harum dolorem voluptatibus, nam deserunt
              consectetur dolore iste tempore enim nostrum facere. Aliquam,
              consequatur aut ex quibusdam earum mollitia!
            </p>
          </details>
          <details>
            <summary className="cursor-pointer font-medium">
              How do I change my account email?
            </summary>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              voluptatem eaque harum dolorem voluptatibus, nam deserunt
              consectetur dolore iste tempore enim nostrum facere. Aliquam,
              consequatur aut ex quibusdam earum mollitia!
            </p>
          </details>
        </div>
      </main>
      {/* footer section of the help section containing form to submit query   */}
      <footer className="flex flex-col gap-5 border-t border-black p-10 text-center ">
        {/* heading  */}
        <h3 className="text-4xl font-semibold">Help Box</h3>
        {/* response from api */}
        {showResponse && (
          <span className="m-auto">
            <DialogBox type={response.type} message={response.message} />
          </span>
        )}
        {/* input field for query  */}
        <input
          type="text"
          name="help_box"
          id="help_box"
          className="m-auto w-3/4 rounded border border-gray-500 p-2 shadow-inner"
          placeholder="Please Enter your question or problem here"
          required
          onChange={(e) => setQuestion(e.target.value)}
        />
        {/* submit button and loading while api is calling */}
        <button
          className="m-auto flex w-44 justify-center rounded bg-sky-800 p-2 text-base text-white"
          onClick={() =>
            submitHelpQuery(
              question,
              setIsLoading,
              setShowResponse,
              setResponse
            )
          }
        >
          {isLoading ? (
            <TailSpin
              height="24"
              width="24"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <>Submit</>
          )}
        </button>
      </footer>
    </article>
  );
}
