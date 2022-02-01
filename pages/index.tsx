import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "./auth";

type Props = {
  messages: any;
};

function Home({ messages }: Props) {
  console.log("rendering? ", messages);

  const [text, setText] = useState("");

  // replaced by useStaticProps for static site generation.
  // Uncomment if you want to enable CSR

  // const [messages, loading, error] = useCollectionOnce(
  //   collection(firestore, "message"),
  //   {
  //     getOptions: {
  //       source: "default",
  //     },
  //   }
  // );

  const addData = async () => {
    console.log("adding data", text);
    await setDoc(doc(firestore, "message", text), {
      message: text,
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></input>
        Add data:
        <button onClick={addData}>Add data</button>
      </div>
      <p>
        {/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {data && (
          <span>
            Collection:{" "}
            {data.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{" "}
              </React.Fragment>
            ))}
          </span>
        )} */}
        <ul>Collection</ul>
        {messages.map((message: string, id: number) => (
          <li key={id + message}>{message}</li>
        ))}
      </p>
    </div>
  );
}

export async function getStaticProps() {
  const messageRef = collection(firestore, "message");
  const querySnapshot = await getDocs(messageRef);

  return {
    props: {
      messages: querySnapshot.docs.map((d) => JSON.stringify(d.data().message)),
    },
  };
}

export default Home;
